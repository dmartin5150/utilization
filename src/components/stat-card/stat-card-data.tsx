import React, {Fragment} from 'react';
import { StatDataSet } from '../../store/Stats/stats.types';
import './stat-card.scss'

export type StatCardDataProps = {
    card: StatDataSet
}

const StatCardData: React.FC<StatCardDataProps> = ({card}) => {
    return (
            <Fragment>
                <h3 className='statcare-daily--header'>{card.day}</h3>
                <p>Procs: {card.procedure}</p>
                <p>Hours: {card.hour}</p>
            </Fragment>
    )
}

export default StatCardData;