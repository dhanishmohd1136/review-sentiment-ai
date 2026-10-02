from pathlib import Path


# ============================================================
# BASE DIRECTORIES
# ============================================================

BASE_DIR = Path(__file__).resolve().parents[2]

ARTIFACTS_DIR = BASE_DIR / "artifacts"


# ============================================================
# MODEL ARTIFACTS
# ============================================================

MODEL_PATH = ARTIFACTS_DIR / "sentiment_model.pkl"

VECTORIZER_PATH = ARTIFACTS_DIR / "tfidf_vectorizer.pkl"


#

APP_NAME = "Customer Review Sentiment API"

APP_VERSION = "1.0.0"

APP_DESCRIPTION = (
    "Sentiment analysis API using "
    "TF-IDF and Logistic Regression"
)



HOST = "0.0.0.0"

PORT = 8000



if not MODEL_PATH.exists():

    raise FileNotFoundError(
        f"Model file not found: {MODEL_PATH}"
    )


if not VECTORIZER_PATH.exists():

    raise FileNotFoundError(
        f"Vectorizer file not found: {VECTORIZER_PATH}"
    )