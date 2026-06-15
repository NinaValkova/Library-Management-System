from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pipeline.prediction_pipeline import recommendation

app = FastAPI(
    title="Library Recommendation API",
    description="Spark-based recommender system",
    version="3.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Library Recommender API is running 🚀"}


@app.get("/recommend/{user_id}")
def recommend_books(user_id: int):
    try:
        book_ids = recommendation(user_id)

        if not book_ids:
            return {
                "user_id": user_id,
                "recommendations": [],
                "message": "No recommendations available"
            }

        return {
            "user_id": user_id,
            "recommendations": book_ids
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))