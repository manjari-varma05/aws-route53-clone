"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import api from "../../../services/api";
import { AxiosError } from "axios";
import "../../../styles/dashboard.css";
import "../../../styles/dnsrecords.css";

interface DNSRecord {
    id: number;
    hosted_zone_id: number;
    name: string;
    type: string;
    value: string;
    ttl: number;
}

function DNSRecords() {

    const params = useParams();
    const hostedZoneId = params.hostedZoneId as string;

    const [records, setRecords] = useState<DNSRecord[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [type, setType] = useState<string>("A");
    const [value, setValue] = useState<string>("");
    const [ttl, setTTL] = useState<number>(300);
    const [editingRecordId, setEditingRecordId] = useState<number | null>(null);
    const [selectedType, setSelectedType] = useState<string>("ALL");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const fetchRecords = async () => {
        try {
            const response = await api.get(
                `/dns-records/hosted-zone/${hostedZoneId}`
            );

            setRecords(response.data);
        } catch (error: unknown) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (hostedZoneId) {
            fetchRecords();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hostedZoneId]);

    const createRecord = async () => {

        if (!name.trim()) {
            alert("Record name is required");
            return;
        }

        try {
            await api.post("/dns-records", {
                hosted_zone_id: Number(hostedZoneId),
                name,
                type,
                value,
                ttl
            });

            fetchRecords();

            setShowForm(false);
            setEditingRecordId(null);

            setName("");
            setType("A");
            setValue("");
            setTTL(300);

        } catch (error) {
            console.log(error);

            const axiosError = error as AxiosError<{ detail: string }>;

            alert(
                axiosError.response?.data?.detail ??
                "Unable to create record."
            );
        }
    };

    const deleteRecord = async (id: number) => {

        const confirmDelete = window.confirm(
            "Delete this DNS Record?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/dns-records/${id}`);
            fetchRecords();
        } catch (error) {
            console.log(error);
            alert("Unable to delete DNS Record.");
        }
    };

    const handleEdit = (record: DNSRecord) => {
        setEditingRecordId(record.id);
        setName(record.name);
        setType(record.type);
        setValue(record.value);
        setTTL(record.ttl);
        setShowForm(true);
    };

    const updateRecord = async () => {

        if (!name.trim()) {
            alert("Record name is required");
            return;
        }

        try {
            await api.put(`/dns-records/${editingRecordId}`, {
                hosted_zone_id: Number(hostedZoneId),
                name,
                type,
                value,
                ttl
            });

            fetchRecords();

            setEditingRecordId(null);
            setShowForm(false);

            setName("");
            setType("A");
            setValue("");
            setTTL(300);

        } catch (error) {
            console.log(error);

            const axiosError = error as AxiosError<{ detail: string }>;

            alert(
                axiosError.response?.data?.detail ??
                "Unable to create record."
            );
        }
    };

    const filteredRecords = records.filter((record) => {
        const matchesSearch = record.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesType =
            selectedType === "ALL" || record.type === selectedType;

        return matchesSearch && matchesType;
    });

    return (

        <div className="dashboard">

            <Navbar />

            <div className="main">

                <Sidebar />

                <div className="hosted-content">

                    <div className="header">

                        <h1>DNS Records</h1>

                        <button
                            className="create-btn"
                            onClick={() => {
                                setEditingRecordId(null);
                                setShowForm(true);
                                setName("");
                                setType("A");
                                setValue("");
                                setTTL(300);
                            }}
                        >
                            + Create Record
                        </button>

                    </div>
                    {showForm && (

                        <div className="modal-overlay">

                            <div className="modal">

                                <h2>
                                    {editingRecordId ? "Edit DNS Record" : "Create DNS Record"}
                                </h2>

                                <label>Name</label>

                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="www"
                                />

                                <label>Type</label>

                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option>A</option>
                                    <option>AAAA</option>
                                    <option>CNAME</option>
                                    <option>MX</option>
                                    <option>TXT</option>
                                    <option>NS</option>
                                </select>

                                <label>Value</label>

                                <input
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="192.168.1.1"
                                />

                                <label>TTL</label>

                                <input
                                    type="number"
                                    value={ttl}
                                    onChange={(e) => setTTL(Number(e.target.value))}
                                />

                                <div className="modal-buttons">

                                    <button
                                        className="cancel-btn"
                                        onClick={() => {
                                            setShowForm(false);
                                            setEditingRecordId(null);
                                            setName("");
                                            setType("A");
                                            setValue("");
                                            setTTL(300);
                                        }}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        className="save-btn"
                                        onClick={
                                            editingRecordId
                                                ? updateRecord
                                                : createRecord
                                        }
                                    >
                                        {editingRecordId ? "Update" : "Create"}
                                    </button>

                                </div>

                            </div>

                        </div>

                    )}

                    <div className="filters">
                        <input
                            className="search-input"
                            type="text"
                            placeholder="Search by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="filter-select"
                        >
                            <option value="ALL">All Types</option>
                            <option value="A">A</option>
                            <option value="AAAA">AAAA</option>
                            <option value="CNAME">CNAME</option>
                            <option value="MX">MX</option>
                            <option value="TXT">TXT</option>
                            <option value="NS">NS</option>
                        </select>
                    </div>

                    <div className="table-container">

                        <table>

                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Value</th>
                                    <th>TTL</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredRecords.length === 0 ? (
                                    <tr>
                                        <td
                                            className="empty"
                                            colSpan={5}
                                        >
                                            No DNS Records Found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredRecords.map((record) => (
                                        <tr key={record.id}>
                                            <td>{record.name}</td>
                                            <td>{record.type}</td>
                                            <td>{record.value}</td>
                                            <td>{record.ttl}</td>
                                            <td>
                                                <button
                                                    className="action-btn edit"
                                                    onClick={() => handleEdit(record)}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="action-btn delete"
                                                    onClick={() => deleteRecord(record.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DNSRecords;