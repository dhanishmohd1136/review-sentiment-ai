from pathlib import Path

import joblib

from app.services.preprocessing import clean_text


BASE_DIR = Path(__file__).resolve().parents[2]

ARTIFACT_DIR = BASE_DIR / "artifacts"

MODEL_PATH = ARTIFACT_DIR / "sentiment_model.pkl"

VECTORIZER_PATH = ARTIFACT_DIR / "tfidf_vectorizer.pkl"


model = joblib.load(
    MODEL_PATH
)

vectorizer = joblib.load(
    VECTORIZER_PATH
)


def predict_sentiment(text: str) -> dict:

    cleaned_text = clean_text(text)

    text_vector = vectorizer.transform(
        [cleaned_text]
    )

    prediction = model.predict(
        text_vector
    )[0]

    probabilities = model.predict_proba(
        text_vector
    )[0]

    class_probabilities = dict(
        zip(
            model.classes_,
            probabilities
        )
    )

    confidence = max(
        probabilities
    )

    return {
        "sentiment": prediction,
        "confidence": round(
            float(confidence),
            4
        ),
        "probabilities": {
            key: round(
                float(value),
                4
            )
            for key, value in class_probabilities.items()
        },
        "clean_text": cleaned_text
    }