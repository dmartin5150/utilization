import React,{useEffect} from "react";
import "./openTimeRoomList.scss"
import ListItem from "../ListSelector/ListItem";
import { useSelector } from 'react-redux';
import { selectUnit } from "../../store/Facility/facility.selector";
import { selectUnitRoomLists } from "../../store/ORData/selectors/ordata.selector";
import { ITEM_DISPLAY_TYPE } from "../ListSelector/ListItem";
import { selectOpenTimeCalendar,selectOpenTimeRoomHours} from "../../store/Facility/facility.selector";

// interface ListItemProps {
//     item:item;
//     displayType: ITEM_DISPLAY_TYPE;
//     onItemChanged: (id:string)=>void;
// }


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
        <div>
            <div>Room List</div>
        </div>
    )
    
}
export default OpenTimeRoomList