import React from "react";
import './stat-card.scss';
import Card from "../card/card";
import { StatDataSet } from "../../store/Stats/stats.types";

export type StatCardProps = {
    data: StatDataSet;
}

const StatCard: React.FC<StatCardProps> = ({data}) => {
    return (
            <div className='statcards-daily'>
                <div className='starcard-daily'>
                    <h3 className='statcare-daily--header'>{data.day}</h3>
                    <p>Procs: {data.procedure}</p>
                    <p>Hours: {data.hour}</p>
                </div>
            </div>
        )
}
export default StatCard