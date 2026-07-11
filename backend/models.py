from database import Base
from datetime import datetime
from sqlalchemy import Integer, String, DateTime,Column,ForeignKey
from sqlalchemy.orm import relationship
class HostedZone(Base):
  __tablename__ = "hosted_zones"
  id=Column(Integer,primary_key=True,index=True)
  domain_name=Column(String(100),nullable=False,unique=True)
  description=Column(String(100))
  created_at = Column(DateTime, default=datetime.utcnow)
  updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
  records = relationship(
        "DNSRecord",
        back_populates="hosted_zone",
        cascade="all, delete-orphan"
    )
class DNSRecord(Base):
   __tablename__ = "dns_records"
   id=Column(Integer,primary_key=True,index=True)
   hosted_zone_id=Column(Integer,ForeignKey('hosted_zones.id'))
   name = Column(String, nullable=False)
   type = Column(String, nullable=False)
   value = Column(String, nullable=False)
   ttl = Column(Integer, nullable=False, default=300)
   hosted_zone = relationship(
        "HostedZone",
        back_populates="records"
    )