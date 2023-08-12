import React,{useEffect} from "react";
import "./openTimeRoomList.scss"
import ListSelector from "../ListSelector/ListSelector";
import { useSelector } from 'react-redux';
import { selectUnit } from "../../store/Facility/facility.selector";
import { selectUnitRoomLists } from "../../store/ORData/selectors/ordata.selector";
import { ITEM_DISPLAY_TYPE } from "../ListSelector/ListItem";
import { selectOpenTimeRoomList,selectOpenTimeRoomHours} from "../../store/Facility/facility.selector";
import { selectActiveRoomLists } from "../../store/ORData/selectors/ordata.selector";
import { useAppDispatch } from "../../hooks/hooks";
import { setOpenTimeRoomList } from "../../store/Facility/facilty.actions";




const OpenTimeRoomList = () => {

    const selectedUnit = useSelector(selectUnit);
    const unitRoomLists = useSelector(selectUnitRoomLists);
    const roomData = useSelector(selectOpenTimeRoomHours)
    const openTimeRoomList = useSelector(selectOpenTimeRoomList)
    const activeRoomList = useSelector(selectActiveRoomLists)
    
    const dispatch = useAppDispatch()

    useEffect(() => {
        console.log('opentime changed')
    },[openTimeRoomList])


    const onRoomChanged = (id:string):void => {
        console.log('room changed')
        console.log('id', id)
        console.log('list', openTimeRoomList)
        const itemIndex = openTimeRoomList.findIndex((item)=> item.id.toString() === id);
        if (itemIndex !== -1) {
            openTimeRoomList[itemIndex].selected = !openTimeRoomList[itemIndex].selected;
        }
        dispatch(setOpenTimeRoomList([...openTimeRoomList]))
    }




    useEffect(() => {
        console.log('reseting room list')
        if (activeRoomList && activeRoomList.length !== 0) {
            const newList = activeRoomList.slice(0)
            dispatch(setOpenTimeRoomList(newList))
        }
    },[activeRoomList])


    const newRender = () => {
        console.log('rerendering')
        return (       
        <div className='open-time-room-list'>
            <ListSelector 
                itemList={openTimeRoomList} 
                allItemsSelected={false} 
                displayType={ITEM_DISPLAY_TYPE.checkbox}
                onItemChanged={onRoomChanged}
                onAllItemsSelected={()=>{}}
                onClearAllSelected={()=>{}}
            />
        </div>)
    }



    return (newRender())
    
}
export default OpenTimeRoomList