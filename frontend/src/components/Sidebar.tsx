"use client";

import { useRouter } from "next/navigation";
import "../styles/sidebar.css";

function Sidebar() {
    const router = useRouter();

    return (
        <aside className="sidebar">

            <button
                onClick={() => router.push("/dashboard")}
            >
                Dashboard
            </button>

            <button
                onClick={() => router.push("/hosted-zones")}
            >
                Hosted Zones
            </button>

        </aside>
    );
}

export default Sidebar;