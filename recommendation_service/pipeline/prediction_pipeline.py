import psycopg2


def get_recommendations_from_db(user_id: int, top_n: int = 4):
    conn = psycopg2.connect(
        host="localhost",
        port=5454,
        dbname="lms_recommendation_service",
        user="lms_recommendation_db",
        password="lms_recommendation_db_password"
    )

    try:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT recommended_book_id
                FROM user_recommendations
                WHERE user_id = %s
                ORDER BY rank_position ASC
                LIMIT %s
            """, (user_id, top_n))

            rows = cur.fetchall()

        return [row[0] for row in rows]

    finally:
        conn.close()



def recommendation(user_id: int, top_n: int = 4):

    book_ids = get_recommendations_from_db(user_id, top_n)

    return book_ids if book_ids else []