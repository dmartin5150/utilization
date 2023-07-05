import React, {Fragment} from 'react';
import { StatDataSet } from '../../store/Stats/stats.types';
import './stat-card.scss'



export type StatCardDataProps = {
    card: StatDataSet
}

const StatCardData: React.FC<StatCardDataProps> = ({card}) => {
    return (
            <div className='statscard-bundle'>
                <h3 className='statcare-daily--header'>{card.day}</h3>
                <p><span>Procs:</span> {card.procedure}</p>
                <p><span>Time: </span></p>
                <p>{card.hour}</p>
            </div>
    )
}

export default StatCardData;