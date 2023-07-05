import React from "react";
import './stat-card.scss';
import { StatDataSet } from "../../store/Stats/stats.types";
import StatCardData from "./stat-card-data";
import Card from "../card/card";

export type StatCardProps = {
    data: StatDataSet[]
}

const StatCard: React.FC<StatCardProps> = ({data}) => {
     return (
        <Card>
            <div className='statcards-daily'>
                <div className='starcard-daily'>
                {data.map((card,idx) => {
                    return <StatCardData key={idx} card={card} />
                })}
                </div>
            </div>
        </Card>
     )
}   
export default StatCard