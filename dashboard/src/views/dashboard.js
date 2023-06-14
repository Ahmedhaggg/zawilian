import React from "react";
import DashboardItem from "../components/DashboardItem";
import SectionHeader from "../components/SectionHeader";

export default function Dashboard() {
    return <div className="dashboard-section">
        <SectionHeader text="Dashboard" />
        <div className="row">
            <DashboardItem link="/grades" text="grades" iconClass="fa-solid fa-graduation-cap" />
            <DashboardItem link="/courses" text="courses" iconClass="fa-solid fa-microphone-lines" />
            <DashboardItem link="/students" text="students" iconClass="fa-solid fa-user-check" />
            <DashboardItem link="/applying-students" text="applying students" iconClass="fa-solid fa-user-clock" />
        </div>
    </div>;
}
