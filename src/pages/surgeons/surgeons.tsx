import React from "react";
import StatCard from "../../components/stat-card/stat-card";
import "./surgeons.scss"

const Surgeons = () => {
    return (
    <div className='surgeons'>
        <h2 className='surgeons-title'> Dr. Smith</h2>
        <div className='surgeons-statcards'>
            <StatCard />
        </div>
            <div className='surgeons-statcard'>
                <StatCard />
                <StatCard />
                <StatCard />
            </div>

    </div>)
}

export default Surgeons;