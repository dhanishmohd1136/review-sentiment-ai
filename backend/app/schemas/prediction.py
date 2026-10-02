from pydantic import BaseModel, Field


class PredictionRequest(BaseModel):

    text: str = Field(
        ...,
        min_length=1,
        max_length=5000,
        description="Customer review text"
    )


class PredictionResponse(BaseModel):

    sentiment: str

    confidence: float

    probabilities: dict[str, float]

    clean_text: str