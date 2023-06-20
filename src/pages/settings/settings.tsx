import React, {useState, useEffect, Component} from 'react';
import DateTimeSetting from '../../components/dateTimeSettings/dateTimeSetting';
import './settings.scss'

import { item } from '../../components/ListSelector/ListItem';
import ListSelector from '../../components/ListSelector/ListSelector';
import { ITEM_DISPLAY_TYPE } from '../../components/ListSelector/ListItem';
import Select,{SingleValue} from "react-select";
import DualSelectors from '../../components/dualSelectors/DualSelectors';
import { SingleSelector } from '../../components/dualSelectors/DualSelectors';
import TestSelector from '../../components/testSelector/testSelector';


export enum TNNASUNIT  {
    BHJRI = 'BH JRI',
    STMSTOR = 'STM ST OR',
    STOR = 'ST OR' 
}

export enum PRIME_TIME_END {
    T300 = '3:00 PM', 
    T330 = '3:30 PM', 
    T400 = '4:00 PM', 
    T430 = '4:30 PM', 
    T500 = '5:00 PM', 
    T530 = '5:30 PM', 
    T600  ='6:00 PM'
}
export enum PRIME_TIME_START {
    T630 = '6:30 AM', 
    T700 = '7:00 AM', 
    T730 = '7:30 AM', 
    T800 = '8:00 AM', 
    T830 = '8:30 AM', 
    T900 = '9:00 AM', 
    T930  ='9:30 AM'
}


export type Unit = {
    id: number,
    name: TNNASUNIT;
    value: TNNASUNIT;
    label: TNNASUNIT;
}

type PrimeTimeMenuItem = {
    id: number;
    value:PRIME_TIME_START | PRIME_TIME_END;
    label:PRIME_TIME_START | PRIME_TIME_END;
}




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

    const unitList: Unit[] = [
        {id:0, name:TNNASUNIT.BHJRI, label:TNNASUNIT.BHJRI, value:TNNASUNIT.BHJRI},
        {id:1, name:TNNASUNIT.STOR, label:TNNASUNIT.STOR, value:TNNASUNIT.STOR},
        {id:2, name:TNNASUNIT.STMSTOR, label:TNNASUNIT.STMSTOR, value:TNNASUNIT.STMSTOR}
    ]

    const primeTimeStartOptions: PrimeTimeMenuItem[] = [
        {id:0, label: PRIME_TIME_START.T630, value:PRIME_TIME_START.T630},
        {id:1, label: PRIME_TIME_START.T700, value:PRIME_TIME_START.T700},
        {id:2, label: PRIME_TIME_START.T730, value:PRIME_TIME_START.T730},
        {id:3, label: PRIME_TIME_START.T800, value:PRIME_TIME_START.T800},
        {id:4, label: PRIME_TIME_START.T830, value:PRIME_TIME_START.T830},
        {id:5, label: PRIME_TIME_START.T900, value:PRIME_TIME_START.T900}
    ]

    const primeTimeEndOptions: PrimeTimeMenuItem[] =  [
        {id:0, label: PRIME_TIME_END.T300, value:PRIME_TIME_END.T300},
        {id:1, label: PRIME_TIME_END.T330, value:PRIME_TIME_END.T330},
        {id:2, label: PRIME_TIME_END.T400, value:PRIME_TIME_END.T400},
        {id:3, label: PRIME_TIME_END.T430, value:PRIME_TIME_END.T430},
        {id:4, label: PRIME_TIME_END.T500, value:PRIME_TIME_END.T500},
        {id:5, label: PRIME_TIME_END.T530, value:PRIME_TIME_END.T530},
    ]

    

    
    const [startTime, setStartTime] = useState<SingleValue<PrimeTimeMenuItem>>(primeTimeStartOptions[0])
    const [endTime, setEndTime] = useState<SingleValue<PrimeTimeMenuItem>>(primeTimeEndOptions[0])
    const [rooms, setRooms] = useState<item[]>(roomList)
    const [allRoomsSelected, setAllRoomsSelected]= useState(true);
    const [surgeons, setSurgeons] = useState<item[]>(surgeonList);
    const [allSurgeonsSelected, setAllSurgeonsSelected] = useState(true);
    const [filteredSurgeons, setFilteredSurgeons] = useState<item[]>(surgeonList)
    const [selectedSurgeons, setSelectedSurgeons] = useState<item[]>(surgeonList)
    const [selectedUnit, setSelectedUnit] = useState<SingleValue<Unit>>(unitList[0])


   
    const updateAllSelectedItems = (items:item[], setItem: (itemStatus: boolean)=>void) => {
        const unselectedItem = items.findIndex((item) => item.selected === false)
        if (unselectedItem === -1) {
            setItem(true);
        } else {
            setItem(false);
        }
    }

    useEffect(() => {
        updateAllSelectedItems(rooms, setAllRoomsSelected);
    },[rooms])

    useEffect(() => {
        updateAllSelectedItems(surgeons, setAllSurgeonsSelected);

    },[surgeons])

    useEffect(()=>{
        const selected = surgeons.filter((surgeon)=> surgeon.selected === true)
        setSelectedSurgeons([...selected])
    },[surgeons])


    const setAllItems = (items:item[],setItems:(items:item[])=>void,itemSelected:boolean ) => {
        const updatedItems = items.map((item) => {
            item.selected = itemSelected;
            return item;
        })
        setItems([...updatedItems]);
    }

    const onAllRoomsSelected = () => {
        setAllItems(rooms, setRooms,true);
    }

    const onAllSurgeonsSelected = () => {
        setAllItems(surgeons, setSurgeons, true);
    }

    const onClearAllRooms = () => {
        setAllItems(rooms, setRooms, false);
    }

    const onClearAllSurgeons = () => {
        setAllItems(surgeons, setSurgeons, false);
    }

    const onItemChanged = (id:string, items:item[], setItems:(items:item[])=>void) => {
        const itemIndex = items.findIndex((item) => item.id.toString() == id);
        if (itemIndex !== -1) {
            items[itemIndex].selected=  !items[itemIndex].selected
        }
        setItems([...items]);
    }

    const onRoomChanged = (id:string):void => {
        onItemChanged(id, rooms, setRooms)
    }

    const onSurgeonChanged = (id:string):void => {
        console.log('surgeon changed', id)
        onItemChanged(id, surgeons, setSurgeons)
    }



    const onSurgeonSearchTextChanged = (text:string):void => {
        if (text.length === 0) {
            setFilteredSurgeons([...surgeons])
            return;
        }
        const filteredList = surgeons.filter((surgeon)=> {
            return surgeon.name.toLowerCase().includes(text.toLowerCase());
        });
        setFilteredSurgeons([...filteredList])
    }


    const handleUnitChange = (option: SingleValue<Unit>) => {
        setSelectedUnit(option)
    }

    return(<div className='settings'>
        {/* <div className='time-setting'>
            <h3>Prime Time</h3>
            <DateTimeSetting />
        </div> */}

        <div className='units'>
            <h3>Select Unit</h3>
          <Select value={selectedUnit} onChange={handleUnitChange}  options={unitList} />
        </div>
        <div className='prime-time'>
            <TestSelector<PrimeTimeMenuItem> selectedOption={startTime} optionList={primeTimeStartOptions}  />
        </div>
        <div className="list-selectors">
            <ListSelector
                title='JRI' 
                className='OR-Rooms'
                itemList={rooms}
                allItemsSelected={allRoomsSelected}
                displayType={ITEM_DISPLAY_TYPE.checkbox}
                onItemChanged={onRoomChanged}
                onAllItemsSelected={onAllRoomsSelected}
                onClearAllSelected={onClearAllRooms}
            />
            <div className="list-selector searchbox">
                <ListSelector
                    title='Select Surgeon' 
                    className='select-surgeon'
                    itemList={filteredSurgeons}
                    allItemsSelected={allSurgeonsSelected}
                    emptySearchMessage='No Surgeon Found'
                    displayType={ITEM_DISPLAY_TYPE.checkbox}
                    searchBox={true}
                    onItemChanged={onSurgeonChanged}
                    onAllItemsSelected={onAllSurgeonsSelected}
                    onClearAllSelected={onClearAllSurgeons}
                    onSearchTextChanged={onSurgeonSearchTextChanged}
                />
            </div>
            <div className="list-selector searchbox">
                <ListSelector
                    title='Selected Surgeons' 
                    className='selected'
                    itemList={selectedSurgeons}
                    allItemsSelected={allSurgeonsSelected}
                    emptySearchMessage='No Surgeon Selected'
                    displayType={ITEM_DISPLAY_TYPE.list}
                    searchBox={false}
                    hideAllHeading={true}
                    onItemChanged={onSurgeonChanged}
                    onAllItemsSelected={onAllSurgeonsSelected}
                    onClearAllSelected={onClearAllSurgeons}
                    onSearchTextChanged={onSurgeonSearchTextChanged}
                />
            </div>
        </div>
    </div>);
}
export default Settings