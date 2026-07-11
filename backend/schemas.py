from pydantic import BaseModel
from datetime import datetime


class HostedZoneCreate(BaseModel):
    domain_name: str
    description: str | None = None


class HostedZoneResponse(BaseModel):
    id: int
    domain_name: str
    description: str | None = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True



class DNSRecordCreate(BaseModel):
    hosted_zone_id: int
    name: str
    type: str
    value: str
    ttl: int
  


class DNSRecordResponse(BaseModel):
    id: int
    hosted_zone_id: int
    name: str
    type: str
    value: str
    ttl: int
    priority: int | None = None

    class Config:
        from_attributes = True



class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    success: bool
    message: str

class HostedZoneUpdate(BaseModel):
    domain_name: str
    description: str | None = None

class DNSRecordUpdate(BaseModel):
    hosted_zone_id: int
    name: str
    type: str
    value: str
    ttl: int
