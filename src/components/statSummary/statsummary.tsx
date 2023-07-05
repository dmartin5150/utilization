import React from 'react';
import StatCard from '../stat-card/stat-card';
import './statsummary.scss'




const StatSummary = () => {
    return (
        <div className='statsummary'>
            <h2 className='statsummary-title'> Dr. Smith</h2>
            <div className='statsummary-statcards'>
                <StatCard />
            </div>
                <div className='statsummary-statcard'>
                    <StatCard />
                    <StatCard />
                    <StatCard />
                </div>
    
        </div>)
}
export default StatSummary;

