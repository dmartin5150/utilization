import React, {useState, useEffect} from 'react';
import DateTimeSetting from '../../components/dateTimeSettings/dateTimeSetting';
import './settings.scss'
import RoomSelector from '../../components/roomSelector/roomSelector';
import ORRooms from '../../components/ORRooms/ORRooms';
import { ORRoom } from '../../components/ORRooms/ORRoomItem';


// export type MutliSelectListItem = {
//     id: number;
//     label: string;
// }

// export type SelectedItems = {
//     items: MutliSelectListItem[];
// }




const Settings = () => {
    const roomList = [
        {id:0, roomName: 'BH JRI 02', selected: true},
        {id:1, roomName:'BH JRI 03', selected: false},
        {id:3, roomName:'BH JRI 04', selected: true},
        {id:4, roomName:'BH JRI 05', selected: true},
        {id:5, roomName:'BH JRI 06', selected: true},
        {id:6, roomName:'BH JRI 07', selected: true},
    ]
    const [rooms, setRooms] = useState<ORRoom[]>(roomList)
    const [allRoomsSelected, setAllRoomsSelected]= useState(true);


   

    const updateAllSelectedRooms = () => {
        console.log('update')
        const unselectedRoom = rooms.findIndex((room) => room.selected === false)
        if (unselectedRoom === -1) {
            setAllRoomsSelected(true)
        } else {
            setAllRoomsSelected(false)
        }
    }

    useEffect(() => {
        updateAllSelectedRooms()
    },[rooms])


    const onAllRoomsSelected = () => {
        const updatedRooms = rooms.map((room)=> {
            room.selected = true;
            return room });
        setRooms([...updatedRooms])
    }

    const onRoomChanged = (id:string):void => {
        const roomIndex = rooms.findIndex((room => room.id.toString() == id));
        if (roomIndex !== -1) {
            rooms[roomIndex].selected=  !rooms[roomIndex].selected
        }
        setRooms([...rooms])
    }


    return(<div>
        <div className='time-setting'>
            <h3>Prime Time</h3>
            <DateTimeSetting />
        </div>
        <div className="room-selectors">
            <ORRooms 
                unitName='JRI' 
                roomList={rooms}
                allRoomsSelected={allRoomsSelected}
                onRoomChanged={onRoomChanged}
                onAllRoomsSelected={onAllRoomsSelected}
                />
        </div>
    </div>);
}
export default Settings