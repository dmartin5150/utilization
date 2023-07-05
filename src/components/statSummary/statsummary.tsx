import React from 'react';
import StatCard from '../stat-card/stat-card';
import './statsummary.scss'
import { StatSummaryResults } from '../../store/Stats/stats.types';



export type StatSummaryProps = {
    statSummary: StatSummaryResults
}



const StatSummaryPage: React.FC<StatSummaryProps> = ({statSummary}) => {
    const {surgeon, mainCard, secondaryCards} = statSummary;

    return (
            <div className='statsummary'>
                <h2 className='statsummary-title'>{surgeon.label}</h2>
                <div className='statsummary-statcard'>
                    <StatCard data={mainCard}/>
                </div>
                <div className='statsummary-statcards'>
                    {secondaryCards.map((card, idx)=> {
                        return <StatCard key={idx} data={card} />
                    } )}
                </div>
            </div>)

}
export default StatSummaryPage;

