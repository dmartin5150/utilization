import React from 'react';
import DateTimeSetting from '../../components/dateTimeSettings/dateTimeSetting';
import './settings.scss'
import RoomSelector from '../../components/roomSelector/roomSelector';
import ORRooms from '../../components/ORRooms/ORRooms';


const Settings = () => {
    return(<div>
        <div className='time-setting'>
            <h3>Prime Time</h3>
            <DateTimeSetting />
        </div>
        <div className="room-selectors">
            <div className="room-selector">
                <RoomSelector
                 units={['BH JRI', 'STM ST OR', 'MT OR']}
                 rooms={['BH JRI 02','BH JRI 03','BH JRI 04','BH JRI 05']} 
                 selectedRooms={['BH JRI 02','BH JRI 03']} 
                 selectedSurgeons={['Kurtz', 'Martin', 'Raab']}
                 />
            </div>
            <ORRooms />
            {/* <div className="room-selector">
                <RoomSelector
                 unit={'BH JRI'}
                 rooms={['BH JRI 02','BH JRI 03','BH JRI 04','BH JRI 05']} 
                 selectedRooms={['BH JRI 02','BH JRI 03']} 
                 selectedSurgeons={['Kurtz', 'Martin', 'Raab']}
                 />
            </div> */}
            {/* <div className="room-selector">
                <RoomSelector
                 unit={'BH JRI'}
                 rooms={['BH JRI 02','BH JRI 03','BH JRI 04','BH JRI 05']} 
                 selectedRooms={['BH JRI 02','BH JRI 03']} 
                 selectedSurgeons={['Kurtz', 'Martin', 'Raab']}
                 />
            </div> */}

        </div>
    </div>);
}
export default Settings