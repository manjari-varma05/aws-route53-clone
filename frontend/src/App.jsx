import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HostedZones from "./pages/HostedZones";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DNSRecords from "./pages/DNSRecords";

function App() {

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/login" />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={
                        isLoggedIn
                            ? <Dashboard />
                            : <Navigate to="/login" />
                    }
                />
            <Route
    path="/hosted-zones"
    element={<HostedZones />}
/>
                    <Route
    path="/dns-records/:hostedZoneId"
    element={<DNSRecords />}
/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;