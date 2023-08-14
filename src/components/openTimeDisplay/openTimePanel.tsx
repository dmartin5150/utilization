import React from 'react';
import { OpenTimeDisplayInfo } from '../../store/Facility/facility.types';

export interface OpenTimePanelProps {
    data: OpenTimeDisplayInfo[]
}

const OpenTimePanel:React.FC<OpenTimePanelProps> = ({data}) => {
    return(
        data.map((item,idx) => {
            return (
            <div key={idx}>
                <h3 className='column-heading'>{item.name}</h3>
                <h3 className='column-heading'>{item.local_start_time}</h3>
                <h3 className='column-heading'>{item.local_end_time}</h3>
                <h3 className='column-heading'>{item.formatted_minutes}</h3>
                <h3 className='column-heading'>{item.release_date}</h3>
            </div>)
        })
    )
}
export default OpenTimePanel;