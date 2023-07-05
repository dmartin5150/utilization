import React from 'react';
import StatCard from '../stat-card/stat-card';
import './statsummary.scss'
import { StatSummary } from '../../store/Stats/stats.types';



export type StatSummaryProps = {
    statSummary: StatSummary
}



const StatSummaryPage: React.FC<StatSummaryProps> = ({statSummary}) => {
    const {surgeon, mainCard, secondaryCards} = statSummary;

    return (
        <div className='statsummary'>
            <h2 className='statsummary-title'>{surgeon.label}</h2>
            <div className='statsummary-statcards'>
                <StatCard data={mainCard}/>
            </div>
            <div className='statsummary-statcard'>
                {secondaryCards.map((card, idx)=> {
                    return <StatCard key={idx} data={card} />
                } )}
            </div>
        </div>)
}
export default StatSummaryPage;

