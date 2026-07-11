"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";

import "../../styles/dashboard.css";
import "../../styles/hostedzones.css";

interface HostedZone {
    id: number;
    domain_name: string;
    description: string;
    created_at: string;
}

function HostedZones() {

    const [hostedZones, setHostedZones] = useState<HostedZone[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [domainName, setDomainName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [editingZoneId, setEditingZoneId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
const recordsPerPage = 5;
    const router = useRouter();

    // ---------------- GET ----------------

    const fetchHostedZones = async (): Promise<void> => {

        try {

            const response = await api.get("/hosted-zones");

            setHostedZones(response.data);

        }

        catch (error) {

            console.log(error);

            alert("Failed to fetch hosted zones.");

        }

    };

    useEffect(() => {

        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchHostedZones();

    }, []);

    // ---------------- CREATE ----------------

    const createHostedZone = async (): Promise<void> => {

        if (!domainName.trim()) {

            alert("Domain Name is required");

            return;

        }

        try {

            await api.post("/hosted-zones", {

                domain_name: domainName,

                description: description

            });

            fetchHostedZones();

            setShowForm(false);

            setDomainName("");

            setDescription("");

            setEditingZoneId(null);

        }

        catch (error) {

            console.log(error);

            const axiosError = error as AxiosError<{ detail?: string }>;

            alert(axiosError.response?.data?.detail || "Unable to create hosted zone.");

        }

    };

    // ---------------- UPDATE ----------------

    const updateHostedZone = async (): Promise<void> => {

        if (!domainName.trim()) {

            alert("Domain Name is required");

            return;

        }

        try {

            await api.put(`/hosted-zones/${editingZoneId}`, {

                domain_name: domainName,

                description: description

            });

            await fetchHostedZones();

            setShowForm(false);

            setDomainName("");

            setDescription("");

            setEditingZoneId(null);

        }

        catch (error) {

            console.log(error);

            const axiosError = error as AxiosError<{ detail?: string }>;

            alert(axiosError.response?.data?.detail || "Unable to update hosted zone.");

        }

    };

    // ---------------- DELETE ----------------

    const deleteHostedZone = async (id: number): Promise<void> => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this hosted zone?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/hosted-zones/${id}`);

            fetchHostedZones();

        }

        catch (error) {

            console.log(error);

            alert("Unable to delete hosted zone.");

        }

    };

    // ---------------- EDIT ----------------

    const handleEdit = (zone: HostedZone): void => {

        setEditingZoneId(zone.id);

        setDomainName(zone.domain_name);

        setDescription(zone.description);

        setShowForm(true);

    };
    const filteredHostedZones = hostedZones.filter((zone) =>
    zone.domain_name.toLowerCase().includes(searchTerm.toLowerCase())
);
const indexOfLastRecord = currentPage * recordsPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

const currentHostedZones = filteredHostedZones.slice(
    indexOfFirstRecord,
    indexOfLastRecord
);

const totalPages = Math.ceil(
    filteredHostedZones.length / recordsPerPage
);

    return (

        <div className="dashboard">

            <Navbar />

            <div className="main">

                <Sidebar />

                <div className="hosted-content">

                    <div className="header">

                        <h1>Hosted Zones</h1>
                        <input
    type="text"
    placeholder="Search hosted zones..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="search-input"
/>

                        <button
                            className="create-btn"
                            onClick={() => {

                                setEditingZoneId(null);

                                setDomainName("");

                                setDescription("");

                                setShowForm(true);

                            }}
                        >
                            + Create Hosted Zone
                        </button>

                    </div>

                    {/* Modal */}

                    {showForm && (

                        <div className="modal-overlay">

                            <div className="modal">

                                <h2>

                                    {editingZoneId
                                        ? "Edit Hosted Zone"
                                        : "Create Hosted Zone"}

                                </h2>

                                <label>Domain Name *</label>

                                <input
                                    type="text"
                                    placeholder="example.com"
                                    value={domainName}
                                    onChange={(e) =>
                                        setDomainName(e.target.value)
                                    }
                                />

                                <label>Description</label>

                                <input
                                    type="text"
                                    placeholder="Testing zone"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />

                                <div className="modal-buttons">

                                    <button
                                        className="cancel-btn"
                                        onClick={() => {

                                            setShowForm(false);

                                            setEditingZoneId(null);

                                            setDomainName("");

                                            setDescription("");

                                        }}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        className="save-btn"
                                        onClick={
                                            editingZoneId
                                                ? updateHostedZone
                                                : createHostedZone
                                        }
                                    >
                                        {editingZoneId
                                            ? "Update"
                                            : "Create"}
                                    </button>

                                </div>

                            </div>

                        </div>

                    )}

                    {/* Table */}

                    <div className="table-container">

                        <table>

                            <thead>

                                <tr>

                                    <th>Domain Name</th>

                                    <th>Description</th>

                                    <th>Created</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {currentHostedZones.length === 0 ? (

                                    <tr>

                                        <td
                                            className="empty"
                                            colSpan={4}
                                        >
                                            No Hosted Zones Found
                                        </td>

                                    </tr>

                                ) : (

                                   currentHostedZones.map((zone) => (

                                      <tr key={zone.id}>

    <td>
        <span
            className="domain-link"
            onClick={() => router.push(`/dns-records/${zone.id}`)}
        >
            {zone.domain_name}
        </span>
    </td>

    <td>{zone.description}</td>

    <td>
        {new Date(zone.created_at).toLocaleDateString()}
    </td>

    <td>

        <button
            className="action-btn edit"
            onClick={() => handleEdit(zone)}
        >
            Edit
        </button>

        <button
            className="action-btn delete"
            onClick={() => deleteHostedZone(zone.id)}
        >
            Delete
        </button>

    </td>

</tr>

                                    ))

                                )}

                            </tbody>

                        </table>
                        <div className="pagination">

    <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
    >
        Previous
    </button>

    <span>
        Page {currentPage} of {totalPages || 1}
    </span>

    <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
    >
        Next
    </button>

</div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default HostedZones;