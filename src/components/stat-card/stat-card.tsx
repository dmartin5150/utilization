import React from "react";
import './stat-card.scss';
import { StatDataSet } from "../../store/Stats/stats.types";
import Card from "../card/card";
import { StatCardResults } from "../../store/Stats/stats.types";
import StatCardData from "./stat-card-data";

export type StatCardProps = {
    data: StatCardResults
}

const StatCard: React.FC<StatCardProps> = ({data}) => {
     return (
        <Card>
            <div className='statcard'>
                <h2 className='statcard-header'>{data.title}</h2>
                <div className='statcards-daily'>
                    <div className='starcard-daily'>
                    {data.data.map((card,idx) => {
                        return <StatCardData key={idx} card={card} />
                    })}
                    </div>
                </div>
            </div>
        </Card>
     )
}   
export default StatCard