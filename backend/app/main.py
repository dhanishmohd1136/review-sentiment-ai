from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import (
    APP_NAME,
    APP_VERSION,
    APP_DESCRIPTION
)

from app.api.routes.health import (
    router as health_router
)

from app.api.routes.prediction import (
    router as prediction_router
)


app = FastAPI(
    title=APP_NAME,
    description=APP_DESCRIPTION,
    version=APP_VERSION
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():

    return {
        "message": APP_NAME,
        "status": "running"
    }


app.include_router(
    health_router
)

app.include_router(
    prediction_router
)