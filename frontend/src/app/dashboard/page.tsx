import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import DashboardContent from "../../components/DashboardContent";
import "../../styles/dashboard.css";

function Dashboard() {

    return (

        <div className="dashboard">

            <Navbar />

            <div className="main">

                <Sidebar />

                <DashboardContent />

            </div>

        </div>

    );

}

export default Dashboard;