import React from "react";
import './stat-card.scss';
import Card from "../card/card";



const StatCard = () => {
    return (
        <Card>
            <div className='statcard'>
                <h2 className='statcard-header'>July</h2>
                <div className='statcards-daily'>
                    <div className='starcard-daily'>
                        <h3 className='statcare-daily--header'>M</h3>
                        <p>Procs: 4</p>
                        <p>Hours: 6</p>
                    </div>
                    <div className='starcard-daily'>
                        <h3 className='statcare-daily--header'>T</h3>
                        <p>Proce: 4</p>
                        <p>Hours: 6</p>
                    </div>
                    <div className='starcard-daily'>
                    <h3 className='statcare-daily--header'>W</h3>
                        <p>Procs: 4</p>
                        <p>Hours: 6</p>
                    </div>
                    <div className='starcard-daily'>
                        <h3 className='statcare-daily--header'>T</h3>
                        <p>Procs: 4</p>
                        <p>Hours: 6</p>
                    </div>
                    <div className='starcard-daily'>
                        <h3 className='statcare-daily--header'>F</h3>
                        <p>Procs: 4</p>
                        <p>Hours: 6</p>
                    </div>
                </div>
            </div>
        </Card>
    )
}
export default StatCard