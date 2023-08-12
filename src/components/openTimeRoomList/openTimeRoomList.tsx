import React,{useEffect} from "react";
import "./openTimeRoomList.scss"
import ListSelector from "../ListSelector/ListSelector";
import { useSelector } from 'react-redux';
import { selectUnit } from "../../store/Facility/facility.selector";
import { selectUnitRoomLists } from "../../store/ORData/selectors/ordata.selector";
import { ITEM_DISPLAY_TYPE } from "../ListSelector/ListItem";
import { selectOpenTimeCalendar,selectOpenTimeRoomHours} from "../../store/Facility/facility.selector";




const OpenTimeRoomList = () => {

    const selectedUnit = useSelector(selectUnit);
    const unitRoomLists = useSelector(selectUnitRoomLists);
    const roomData = useSelector(selectOpenTimeRoomHours)


    useEffect(() => {
        if (roomData) {
            console.log('open time room data')
            console.log( roomData)
        }
    },[roomData])


    return (
        <div className='open-time-room-list'>
            <ListSelector 
                itemList={roomData} 
                allItemsSelected={true} 
                displayType={ITEM_DISPLAY_TYPE.checkbox}
                onItemChanged={()=>{}}
                onAllItemsSelected={()=>{}}
                onClearAllSelected={()=>{}}
            />
        </div>
    )
    
}
export default OpenTimeRoomList