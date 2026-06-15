from pyspark.sql import SparkSession
from pyspark.sql.functions import from_json, col, row_number, desc
from pyspark.sql.types import StructType, StructField, IntegerType
from pyspark.sql.window import Window

KAFKA_BOOTSTRAP = "kafka:29092"
KAFKA_TOPIC = "RatingEvents"

RATING_DB_URL = "jdbc:postgresql://lms_rating_db_server:5432/lms_rating_service"
RECOMMEND_DB_URL = "jdbc:postgresql://lms_recommendation_db_server:5432/lms_recommendation_service"

RATING_DB_PROPERTIES = {
    "user": "lms_rating_db",
    "password": "lms_rating_db_password",
    "driver": "org.postgresql.Driver"
}

RECOMMEND_DB_PROPERTIES = {
    "user": "lms_recommendation_db",
    "password": "lms_recommendation_db_password",
    "driver": "org.postgresql.Driver"
}


def process_batch(batch_df, batch_id):
    if batch_df.limit(1).count() == 0:
        return

    spark = batch_df.sparkSession

    ratings_df = spark.read.jdbc(
        url=RATING_DB_URL,
        table="ratings",
        properties=RATING_DB_PROPERTIES
    )

    affected_users = batch_df.select("userId").distinct()

    user_ratings = ratings_df.alias("r").join(
        affected_users.alias("a"),
        col("r.user_id") == col("a.userId"),
        "inner"
    ).select(
        col("r.user_id").alias("target_user_id"),
        col("r.book_id").alias("rated_book_id"),
        col("r.rating")
    )

    similar_candidates = ratings_df.alias("r1").join(
        user_ratings.alias("u"),
        col("r1.book_id") == col("u.rated_book_id"),
        "inner"
    ).where(
        col("r1.user_id") != col("u.target_user_id")
    )

    candidate_books = similar_candidates.alias("sc").join(
        ratings_df.alias("r2"),
        col("sc.user_id") == col("r2.user_id"),
        "inner"
    ).select(
        col("sc.target_user_id").alias("target_user_id"),
        col("r2.book_id").alias("recommended_book_id"),
        col("r2.rating").alias("score")
    )

    already_rated = ratings_df.select(
        col("user_id").alias("target_user_id"),
        col("book_id").alias("rated_book_id")
    )

    filtered_candidates = candidate_books.join(
        already_rated,
        (candidate_books.target_user_id == already_rated.target_user_id) &
        (candidate_books.recommended_book_id == already_rated.rated_book_id),
        "left_anti"
    )

    aggregated = filtered_candidates.groupBy(
        "target_user_id", "recommended_book_id"
    ).sum("score").withColumnRenamed("sum(score)", "score")

    window_spec = Window.partitionBy("target_user_id").orderBy(
        desc("score"),
        desc("recommended_book_id")
    )

    top3 = aggregated.withColumn(
        "rank_position",
        row_number().over(window_spec)
    ).where(
        col("rank_position") <= 3
    ).select(
        col("target_user_id").alias("user_id"),
        col("recommended_book_id"),
        col("score"),
        col("rank_position")
    )

    affected_user_ids = [row["userId"] for row in affected_users.collect()]
    if not affected_user_ids:
        return

    import psycopg2
    conn = psycopg2.connect(
        host="lms_recommendation_db_server",
        port=5432,
        dbname="lms_recommendation_service",
        user="lms_recommendation_db",
        password="lms_recommendation_db_password"
    )
    conn.autocommit = True

    try:
        with conn.cursor() as cur:
            cur.execute(
                "DELETE FROM user_recommendations WHERE user_id = ANY(%s)",
                (affected_user_ids,)
            )
    finally:
        conn.close()

    top3.write.jdbc(
        url=RECOMMEND_DB_URL,
        table="user_recommendations",
        mode="append",
        properties=RECOMMEND_DB_PROPERTIES
    )

    print(f"Batch {batch_id} processed successfully")


if __name__ == "__main__":
    spark = SparkSession.builder \
        .appName("LibraryRecommendationStream") \
        .config("spark.jars", "/opt/spark/jars-extra/postgresql-42.7.3.jar") \
        .getOrCreate()

    schema = StructType([
        StructField("userId", IntegerType(), True),
        StructField("bookId", IntegerType(), True),
        StructField("rating", IntegerType(), True)
    ])

    kafka_df = spark.readStream \
        .format("kafka") \
        .option("kafka.bootstrap.servers", KAFKA_BOOTSTRAP) \
        .option("subscribe", KAFKA_TOPIC) \
        .option("startingOffsets", "latest") \
        .load()

    parsed_df = kafka_df.selectExpr("CAST(value AS STRING) as json_str") \
        .select(from_json(col("json_str"), schema).alias("data")) \
        .select("data.*") \
        .where(col("userId").isNotNull())

    query = parsed_df.writeStream \
        .foreachBatch(process_batch) \
        .outputMode("append") \
        .start()

    query.awaitTermination()