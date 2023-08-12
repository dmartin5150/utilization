import React,{useEffect,useState} from "react";
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
import { UnitRoomListItem } from "../../pages/settings/settings.constants";




const OpenTimeRoomList = () => {

    const [allRoomsSelected, setAllRoomsSelected] = useState(true)


    const openTimeRoomList = useSelector(selectOpenTimeRoomList)
    const activeRoomList = useSelector(selectActiveRoomLists)
    
    const dispatch = useAppDispatch()


    const checkAllRoomsSelected = () => {

        const unselectedItem = openTimeRoomList.findIndex((item) => item.selected === false);
        if (unselectedItem === -1)
            return true
        return false;

    }

    const onRoomChanged = (id:string):void => {
        const itemIndex = openTimeRoomList.findIndex((item)=> item.id.toString() === id);
        if (itemIndex !== -1) {
            openTimeRoomList[itemIndex].selected = !openTimeRoomList[itemIndex].selected;
        }
        dispatch(setOpenTimeRoomList([...openTimeRoomList]))
        if (checkAllRoomsSelected()) {
            setAllRoomsSelected(true)
        } else {
            setAllRoomsSelected(false)
        }
    }

    const onAllRoomsSelected = () => {
        openTimeRoomList.forEach((openTime) => openTime.selected = true)
        dispatch(setOpenTimeRoomList([...openTimeRoomList]))
        setAllRoomsSelected(true)
    }

    const onClearAllRooms = () => {
        openTimeRoomList.forEach((openTime) => openTime.selected = false)
        dispatch(setOpenTimeRoomList([...openTimeRoomList]))
        setAllRoomsSelected(false)
    }



    useEffect(() => {
        if (activeRoomList && activeRoomList.length !== 0) {
            let filteredList:UnitRoomListItem[] = []
            activeRoomList.forEach((item) => {
                const curItem = {'id':item.id, 'name':item.name, 'selected':item.selected}
                filteredList.push(curItem)
            })
            filteredList = filteredList.filter((room) => room.selected === true)
            dispatch(setOpenTimeRoomList(filteredList))
        }
    },[])



    return (       
        <div className='open-time-room-list'>
            <ListSelector 
                itemList={openTimeRoomList} 
                allItemsSelected={allRoomsSelected} 
                displayType={ITEM_DISPLAY_TYPE.checkbox}
                onItemChanged={onRoomChanged}
                onAllItemsSelected={onAllRoomsSelected}
                onClearAllSelected={onClearAllRooms}
            />
        </div>)
    
}
export default OpenTimeRoomList