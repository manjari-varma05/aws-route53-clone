from fastapi import APIRouter,HTTPException
import schemas

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/login", response_model=schemas.LoginResponse)
def login(request: schemas.LoginRequest):

    if (
        request.username == "admin"
        and request.password == "Route53Demo@2026"
    ):
        return schemas.LoginResponse(
            success=True,
            message="Login successful"
        )

    raise HTTPException(
        status_code=401,
        detail="Invalid username or password"
    )