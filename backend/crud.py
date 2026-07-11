import models
import schemas
from sqlalchemy.orm import Session

def create_hosted_zone(
    db: Session,
    zone: schemas.HostedZoneCreate
):
    db_zone = models.HostedZone(
        domain_name=zone.domain_name,
        description=zone.description
    )

    db.add(db_zone)
    db.commit()
    db.refresh(db_zone)

    return db_zone
def get_hosted_zones(db: Session):
    return db.query(models.HostedZone).all()
def get_hosted_zone(db: Session, zone_id: int):
    return (
        db.query(models.HostedZone)
        .filter(models.HostedZone.id == zone_id)
        .first()
    )
def update_hosted_zone(
    db: Session,
    zone_id: int,
    zone_update: schemas.HostedZoneUpdate
):
    db_zone = (
        db.query(models.HostedZone)
        .filter(models.HostedZone.id == zone_id)
        .first()
    )

    if db_zone is None:
        return None

    db_zone.domain_name = zone_update.domain_name
    db_zone.description = zone_update.description

    db.commit()
    db.refresh(db_zone)

    return db_zone
def delete_hosted_zone(db: Session, zone_id: int):
    db_zone = (
        db.query(models.HostedZone)
        .filter(models.HostedZone.id == zone_id)
        .first()
    )

    if db_zone is None:
        return None

    db.delete(db_zone)
    db.commit()

    return db_zone

#DNS-Record
def create_dns_record(db: Session, record: schemas.DNSRecordCreate):
    db_record = models.DNSRecord(
        hosted_zone_id=record.hosted_zone_id,
        name=record.name,
        type=record.type,
        value=record.value,
        ttl=record.ttl,
    )

    db.add(db_record)
    db.commit()
    db.refresh(db_record)

    return db_record


def get_dns_records(db: Session):
    return db.query(models.DNSRecord).all()

def get_dns_records_by_zone(
    db: Session,
    hosted_zone_id: int
):
    return (
        db.query(models.DNSRecord)
        .filter(
            models.DNSRecord.hosted_zone_id == hosted_zone_id
        )
        .all()
    )
def get_dns_record(db: Session, record_id: int):
    return (
        db.query(models.DNSRecord)
        .filter(models.DNSRecord.id == record_id)
        .first()
    )


def update_dns_record(
    db: Session,
    record_id: int,
    record: schemas.DNSRecordUpdate
):
    db_record = (
        db.query(models.DNSRecord)
        .filter(models.DNSRecord.id == record_id)
        .first()
    )

    if db_record is None:
        return None

    db_record.hosted_zone_id = record.hosted_zone_id
    db_record.name = record.name
    db_record.type = record.type
    db_record.value = record.value
    db_record.ttl = record.ttl

    db.commit()
    db.refresh(db_record)

    return db_record


def delete_dns_record(db: Session, record_id: int):
    db_record = (
        db.query(models.DNSRecord)
        .filter(models.DNSRecord.id == record_id)
        .first()
    )

    if db_record is None:
        return None

    db.delete(db_record)
    db.commit()

    return db_record