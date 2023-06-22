import React, {useState, useEffect} from 'react';
import './settings.scss'
import { item } from '../../components/ListSelector/ListItem';
import {SingleValue} from "react-select";
import DualSelectors from '../../components/dualSelectors/DualSelectors';
import { SingleSelector } from '../../components/dualSelectors/DualSelectors';
import RangeSelectors from '../../components/dateRange/RangeSelector';
import { UnitSelector, UnitListSelector } from '../../components/selectUnits/SelectUnit';
import SelectUnit from '../../components/selectUnits/SelectUnit';
import SearchList from '../../components/SearchList/SearchList';
import { SearchListItems } from '../../components/SearchList/SearchList';
import { PRIME_TIME_END, PRIME_TIME_START, Unit, TNNASRoomList, surgeonList, unitList,UnitRoomList, UnitRoomLists,
        primeTimeStartOptions,primeTimeEndOptions, TNNASUNIT } from './settings.constants';
import getSurgeonLists from '../../utilities/fetchData/getSurgeonLists';



export type PrimeTimeMenuItem = {
    id: number;
    value:PRIME_TIME_START | PRIME_TIME_END;
    label:PRIME_TIME_START | PRIME_TIME_END;
}


const Settings = () => {
 
    const [startTime, setStartTime] = useState<SingleValue<PrimeTimeMenuItem>>(primeTimeStartOptions[0])
    const [endTime, setEndTime] = useState<SingleValue<PrimeTimeMenuItem>>(primeTimeEndOptions[0])
    const [rooms, setRooms] = useState<UnitRoomList[]>([])
    const [allRoomsSelected, setAllRoomsSelected]= useState(true);
    const [surgeons, setSurgeons] = useState<item[]>([]);
    const [allSurgeonsSelected, setAllSurgeonsSelected] = useState(true);
    const [filteredSurgeons, setFilteredSurgeons] = useState<item[]>([])
    const [selectedSurgeons, setSelectedSurgeons] = useState<item[]>([])
    const [selectedUnit, setSelectedUnit] = useState<SingleValue<Unit>>(unitList[0])
    const [startDate, setStartDate] = useState<Date>(new Date('6/1/2023'));
    const [stopDate, setStopDate] = useState<Date>(new Date('6/30/2023'));


    const primeTimeStartSelector: SingleSelector<PrimeTimeMenuItem> = {
        title: 'Prime Time Start',
        selectedOption: startTime,
        optionList: primeTimeStartOptions,
        onChange: setStartTime,
    }

    const primeTimeEndSelector: SingleSelector<PrimeTimeMenuItem> = {
        title: 'Prime Time End',
        selectedOption: endTime,
        optionList:primeTimeEndOptions,
        onChange: setEndTime
    }
   
    const updateAllSelectedItems = (items:item[], setItem: (itemStatus: boolean)=>void) => {
        const unselectedItem = items.findIndex((item) => item.selected === false)
        if (unselectedItem === -1) {
            setItem(true);
        } else {
            setItem(false);
        }
    }


    useEffect(()=> {
        const getLists = async() => {
            const newList = await getSurgeonLists();      
            console.log('list', newList[TNNASUNIT.BHJRI])
            setSurgeons(newList[TNNASUNIT.BHJRI]);
            setSelectedSurgeons(newList[TNNASUNIT.BHJRI])
            setFilteredSurgeons(newList[TNNASUNIT.BHJRI])
        }
        getLists();
 
  
    },[]);


    useEffect(()=> {
        if (selectedUnit) {
            setRooms(TNNASRoomList[selectedUnit.name])
        }
    },[selectedUnit])

    useEffect(() => {
        updateAllSelectedItems(rooms, setAllRoomsSelected);
    },[rooms])

    useEffect(() => {
        updateAllSelectedItems(surgeons, setAllSurgeonsSelected);

    },[surgeons])

    useEffect(()=>{
        console.log('udating selected')
        console.log(surgeons)
        const selected = surgeons.filter((surgeon)=> surgeon.selected === true)
        console.log('udating selected', selected)
        setSelectedSurgeons(selected)
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
        console.log(option)
        setSelectedUnit(option)
    }

    const onStartDateChange = (date:Date) => {
        console.log(date)
    }

    const unitSelector:UnitSelector = {
        value:selectedUnit,
        handleUnitChange:handleUnitChange,
        options: unitList
     }


    const unitListSelector: UnitListSelector = {
        rooms:rooms,
        allRoomsSelected:allRoomsSelected,
        onRoomChanged: onRoomChanged,
        onAllRoomsSelected:onAllRoomsSelected,
        onClearAllRooms:onClearAllRooms
    }
    const searchCheckboxList: SearchListItems = {
        itemList: filteredSurgeons,
        emptySearchMessage:'No Surgeon Selected',
        allItemsSelected:allSurgeonsSelected,
        onItemChanged: onSurgeonChanged,
        onAllItemsSelected:onAllSurgeonsSelected,
        onClearAllSelected:onClearAllSurgeons,
        onSearchTextChanged:onSurgeonSearchTextChanged
    }

    const searchListBox: SearchListItems = {
        itemList: selectedSurgeons,
        allItemsSelected:allSurgeonsSelected,
        emptySearchMessage:'No Surgeon Selected',
        onItemChanged:onSurgeonChanged,
        onAllItemsSelected:onAllSurgeonsSelected,
        onClearAllSelected:onClearAllSurgeons,
        onSearchTextChanged:onSurgeonSearchTextChanged
    }


    return(<div className='settings'>
        <div className='set-all'>
            <div className='set-selector'>
                <div className='date-range'>
                    <RangeSelectors 
                        title='Date Range' 
                        startDate={startDate} 
                        stopDate={stopDate} 
                        onSelectDate1={onStartDateChange}
                        onSelectDate2={setStopDate} />
                </div>
                <div className='prime-time'>
                    <DualSelectors<PrimeTimeMenuItem, PrimeTimeMenuItem> title='Prime Time' selector1={primeTimeStartSelector} selector2={primeTimeEndSelector}/>
                </div>
            </div>
            <div className='sel-unit'>
                <SelectUnit title='Select Unit' unitSelector={unitSelector} unitListSelector={unitListSelector} />
            </div>
            <div className='provider-search-list'>
                <SearchList
                    title='Surgeons'
                    checkboxList={searchCheckboxList}
                    selectedList={searchListBox} />
            </div>
        </div>
    </div>)
}
export default Settings



