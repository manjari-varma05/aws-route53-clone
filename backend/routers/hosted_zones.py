from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import crud
import schemas
from database import get_db


router = APIRouter()
@router.post(
    "/hosted-zones",
    response_model=schemas.HostedZoneResponse
)
def create_hosted_zone(
    zone: schemas.HostedZoneCreate,
    db: Session = Depends(get_db)
):
    return crud.create_hosted_zone(db, zone)
@router.get(
    "/hosted-zones",
    response_model=list[schemas.HostedZoneResponse]
)
def get_hosted_zones(db: Session = Depends(get_db)):
    return crud.get_hosted_zones(db)


@router.get(
    "/hosted-zones/{zone_id}",
    response_model=schemas.HostedZoneResponse
)
def get_hosted_zone(
    zone_id: int,
    db: Session = Depends(get_db)
):
    zone = crud.get_hosted_zone(db, zone_id)

    if zone is None:
        raise HTTPException(
            status_code=404,
            detail="Hosted Zone not found"
        )

    return zone

@router.put(
    "/hosted-zones/{zone_id}",
    response_model=schemas.HostedZoneResponse
)
def update_hosted_zone(
    zone_id: int,
    zone: schemas.HostedZoneUpdate,
    db: Session = Depends(get_db)
):
    updated_zone = crud.update_hosted_zone(
        db,
        zone_id,
        zone
    )

    if updated_zone is None:
        raise HTTPException(
            status_code=404,
            detail="Hosted Zone not found"
        )

    return updated_zone

@router.delete("/hosted-zones/{zone_id}")
def delete_hosted_zone(
    zone_id: int,
    db: Session = Depends(get_db)
):
    deleted_zone = crud.delete_hosted_zone(
        db,
        zone_id
    )

    if deleted_zone is None:
        raise HTTPException(
            status_code=404,
            detail="Hosted Zone not found"
        )

    return {
        "message": "Hosted Zone deleted successfully"
    }
