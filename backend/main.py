from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import auth
from routers import hosted_zones
from routers import dns_records

app = FastAPI(
    title="AWS Route53 Clone API",
    version="1.0.0"
)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://aws-route53-clone-11.onrender.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(hosted_zones.router)
app.include_router(dns_records.router)


@app.get("/")
def root():
    return {
        "message": "AWS Route53 Clone Backend is running!"
    }