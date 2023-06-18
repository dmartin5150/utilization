import React, {useState, useEffect} from 'react';
import DateTimeSetting from '../../components/dateTimeSettings/dateTimeSetting';
import './settings.scss'

import { item } from '../../components/ListSelector/ListItem';
import ListSelector from '../../components/ListSelector/ListSelector';






const Settings = () => {
    const roomList = [
        {id:0, name: 'BH JRI 02', selected: true},
        {id:1, name:'BH JRI 03', selected: false},
        {id:3, name:'BH JRI 04', selected: true},
        {id:4, name:'BH JRI 05', selected: true},
        {id:5, name:'BH JRI 06', selected: true},
        {id:6, name:'BH JRI 07', selected: true},
    ]


    const surgeonList = [
        {id:0, name: 'Martin', selected: true},
        {id:1, name: 'Mister', selected: false},
        {id:3, name:'marian', selected: true},
        {id:4, name:'Dr. 4', selected: true},
        {id:5, name:'Dr. 5', selected: true},
        {id:6, name:'Dr 6', selected: true},
    ]


    const [rooms, setRooms] = useState<item[]>(roomList)
    const [allRoomsSelected, setAllRoomsSelected]= useState(true);
    const [surgeons, setSurgeons] = useState<item[]>(surgeonList);
    const [allSurgeonsSelected, setAllSurgeonsSelected] = useState(true);


   
    const updateAllSelectedItems = (items:item[], setItem: (itemStatus: boolean)=>void) => {
        const unselectedItem = items.findIndex((item) => item.selected === false)
        if (unselectedItem === -1) {
            setItem(true)
        } else {
            setItem(false)
        }
    }

    useEffect(() => {
        updateAllSelectedItems(rooms, setAllRoomsSelected);
    },[rooms])

    useEffect(() => {
        updateAllSelectedItems(surgeons, setAllSurgeonsSelected);
    },[surgeons])

    const setAllItems = (items:item[],setItems:(items:item[])=>void,itemSelected:boolean ) => {
        const updatedItems = items.map((item) => {
            item.selected = itemSelected;
            return item;
        })
        setItems([...updatedItems])
    }




    const onAllRoomsSelected = () => {
        setAllItems(rooms, setRooms,true)
    }

    const onAllSurgeonsSelected = () => {
        setAllItems(surgeons, setSurgeons, true)
    }

    const onClearAllRooms = () => {
        setAllItems(rooms, setRooms, false)
    }

    const onClearAllSurgeons = () => {
        setAllItems(surgeons, setSurgeons, false)
    }

    const onItemChanged = (id:string, items:item[], setItems:(items:item[])=>void) => {
        const itemIndex = items.findIndex((item) => item.id.toString() == id);
        console.log(id, itemIndex)
        if (itemIndex !== -1) {
            items[itemIndex].selected=  !items[itemIndex].selected
        }
        setItems([...items]);
    }

    const onRoomChanged = (id:string):void => {
        onItemChanged(id, rooms, setRooms)
    }

    const onSurgeonChanged = (id:string):void => {
        onItemChanged(id, surgeons, setSurgeons)
    }

    const onSurgeonSearchTextChanged = (text:string):void => {

        if (text.length === 0) {
            setSurgeons([...surgeonList])
            return;
        }
        const filteredSurgeons = surgeons.filter((surgeon)=> {
            return surgeon.name.toLowerCase().includes(text.toLowerCase());
        });
        console.log('filtered', filteredSurgeons)
        setSurgeons([...filteredSurgeons])
    }

    return(<div>
        <div className='time-setting'>
            <h3>Prime Time</h3>
            <DateTimeSetting />
        </div>
        <div className="list-selectors">
            <div className="list-selector rooms">
                <ListSelector
                    title='JRI' 
                    itemList={rooms}
                    showTitle={true}
                    allItemsSelected={allRoomsSelected}
                    onItemChanged={onRoomChanged}
                    onAllItemssSelected={onAllRoomsSelected}
                    onClearAllSelected={onClearAllRooms}
                    />
            </div>
            <div className="list-selector searchbox">
                <ListSelector
                    title='Select Surgeon' 
                    itemList={surgeons}
                    allItemsSelected={allSurgeonsSelected}
                    gridSize="small"
                    searchBox={true}
                    onItemChanged={onSurgeonChanged}
                    onAllItemssSelected={onAllSurgeonsSelected}
                    onClearAllSelected={onClearAllSurgeons}
                    onSearchTextChanged={onSurgeonSearchTextChanged}
                    />
            </div>
        </div>
    </div>);
}
export default Settings