from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import crud
import schemas
from database import get_db

router = APIRouter(
    prefix="/dns-records",
    tags=["DNS Records"]
)


# ----------------------------
# Create DNS Record
# ----------------------------
@router.post("/", response_model=schemas.DNSRecordResponse)
def create_dns_record(
    record: schemas.DNSRecordCreate,
    db: Session = Depends(get_db)
):
    return crud.create_dns_record(db, record)


# ----------------------------
# Get All DNS Records
# ----------------------------
@router.get("/", response_model=list[schemas.DNSRecordResponse])
def get_dns_records(
    db: Session = Depends(get_db)
):
    return crud.get_dns_records(db)


# ----------------------------
# Get DNS Records by Hosted Zone
# ----------------------------
@router.get(
    "/hosted-zone/{hosted_zone_id}",
    response_model=list[schemas.DNSRecordResponse]
)
def get_dns_records_by_zone(
    hosted_zone_id: int,
    db: Session = Depends(get_db)
):
    return crud.get_dns_records_by_zone(
        db,
        hosted_zone_id
    )


# ----------------------------
# Get Single DNS Record
# ----------------------------
@router.get(
    "/{record_id}",
    response_model=schemas.DNSRecordResponse
)
def get_dns_record(
    record_id: int,
    db: Session = Depends(get_db)
):
    record = crud.get_dns_record(db, record_id)

    if record is None:
        raise HTTPException(
            status_code=404,
            detail="DNS Record not found"
        )

    return record


# ----------------------------
# Update DNS Record
# ----------------------------
@router.put(
    "/{record_id}",
    response_model=schemas.DNSRecordResponse
)
def update_dns_record(
    record_id: int,
    record: schemas.DNSRecordUpdate,
    db: Session = Depends(get_db)
):
    updated_record = crud.update_dns_record(
        db,
        record_id,
        record
    )

    if updated_record is None:
        raise HTTPException(
            status_code=404,
            detail="DNS Record not found"
        )

    return updated_record


# ----------------------------
# Delete DNS Record
# ----------------------------
@router.delete("/{record_id}")
def delete_dns_record(
    record_id: int,
    db: Session = Depends(get_db)
):
    deleted_record = crud.delete_dns_record(
        db,
        record_id
    )

    if deleted_record is None:
        raise HTTPException(
            status_code=404,
            detail="DNS Record not found"
        )

    return {
        "message": "DNS Record deleted successfully"
    }