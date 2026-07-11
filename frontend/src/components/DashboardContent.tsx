"use client";

import { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/dashboard.css";

interface HostedZone {
    id: number;
    domain_name: string;
    description: string;
    created_at: string;
}

function DashboardContent() {

    const [hostedZoneCount, setHostedZoneCount] = useState<number>(0);
    const [dnsRecordCount, setDnsRecordCount] = useState<number>(0);

    const fetchDashboardData = async (): Promise<void> => {

        try {

            // Fetch hosted zones
            const hostedZoneResponse = await api.get("/hosted-zones");

            const hostedZones: HostedZone[] = hostedZoneResponse.data;

            setHostedZoneCount(hostedZones.length);

            // Count total DNS records
            let totalRecords = 0;

            for (const zone of hostedZones) {

                const dnsResponse = await api.get(
                    `/dns-records/hosted-zone/${zone.id}`
                );

                totalRecords += dnsResponse.data.length;
            }

            setDnsRecordCount(totalRecords);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchDashboardData();

    }, []);

    return (

        <div className="dashboard-content">

            <h1>Welcome Admin</h1>

            <div className="cards">

                <div className="card">

                    <h2>Total Hosted Zones</h2>

                    <p>{hostedZoneCount}</p>

                </div>

                <div className="card">

                    <h2>Total DNS Records</h2>

                    <p>{dnsRecordCount}</p>

                </div>

            </div>

        </div>

    );

}

export default DashboardContent;