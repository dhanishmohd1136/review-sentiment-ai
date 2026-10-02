from fastapi import APIRouter, HTTPException

from app.schemas.prediction import (
    PredictionRequest,
    PredictionResponse
)

from app.services.prediction import (
    predict_sentiment
)


router = APIRouter(
    prefix="/api/v1",
    tags=["Prediction"]
)


@router.post(
    "/predict",
    response_model=PredictionResponse
)
def predict(
    request: PredictionRequest
):

    text = request.text.strip()

    if not text:

        raise HTTPException(
            status_code=400,
            detail="Text cannot be empty."
        )

    try:

        result = predict_sentiment(
            text
        )

        return result

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )