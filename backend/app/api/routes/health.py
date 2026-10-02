from fastapi import APIRouter


router = APIRouter(
    tags=["Health"]
)


@router.get("/health")
@router.get("/api/v1/health")
def health_check():

    return {
        "status": "healthy"
    }