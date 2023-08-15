import React from 'react';
import { OpenTimeDisplayInfo } from '../../store/Facility/facility.types';
import classnames from 'classnames';
import "./openTimePanel.scss"

export interface OpenTimePanelProps {
    data: OpenTimeDisplayInfo[]
    room:string;
}





const OpenTimePanel:React.FC<OpenTimePanelProps> = ({room, data}) => {
    return(
        data.map((item,idx) => {
            let roomName;
            if (idx === 0){
                roomName = room
             } else {
                roomName = " "
             }
             if (item.release_date === 'nan') {
                item.release_date = 'N/A'
             }
            //  console.log(idx, data.length)
            return (
            <div key={idx} className='open-time-panel'>
                <div className={classnames('open-time-display--room-container',
                        {notopborders: idx !== 0},
                        {addbottomborder: idx === (data.length-1)})}>
                    <h3 className={classnames('column-heading',
                    {notopborders: roomName === " "},
                    {addbottomborder: idx === (data.length)})}>{roomName}</h3>
                </div>
                <div className='open-time-panel--container'>
                    <h3 className={classnames('column-heading',{notopborders: idx !== 0})}>{item.name}</h3>
                    <h3 className={classnames('column-heading',{notopborders: idx !== 0})}>{item.local_start_time}</h3>
                    <h3 className={classnames('column-heading',{notopborders: idx !== 0})}>{item.local_end_time}</h3>
                    <h3 className={classnames('column-heading',{notopborders: idx !== 0})}>{item.formatted_minutes}</h3>
                    <h3 className={classnames('column-heading',{notopborders: idx !== 0})}>{item.release_date}</h3>
                </div>
            </div>)
        })
    )
}
export default OpenTimePanel;