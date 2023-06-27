import React, {useState, useEffect, useCallback} from 'react';
import './settings.scss'
import { item } from '../../store/ORData/ordata.types';
import {SingleValue} from "react-select";
import DualSelectors from '../../components/dualSelectors/DualSelectors';
import { SingleSelector } from '../../components/dualSelectors/DualSelectors';
import RangeSelectors from '../../components/dateRange/RangeSelector';
import { UnitSelector, UnitListSelector } from '../../components/selectUnits/SelectUnit';
import SelectUnit from '../../components/selectUnits/SelectUnit';
import SearchList from '../../components/SearchList/SearchList';
import { SearchListItems } from '../../components/SearchList/SearchList';
import { PRIME_TIME_START,PRIME_TIME_END } from '../../store/Facility/facility.types';
import { Unit, TNNASRoomLists, unitList,UnitRoomList, UnitRoomLists,
        primeTimeStartOptions,primeTimeEndOptions} from './settings.constants';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchSurgeonListsAsync } from '../../store/ORData/actions/surgeonLists.actions';
import { useSelector } from 'react-redux';
import { selectSurgeonLists, selectUnitRoomLists, selectActiveRoomLists, selectActiveSurgeons, selectAllRoomsSelected,selectAllSurgeonsSelected } from '../../store/ORData/ordata.selector';
import { setPrimeTime, setDateRange, setUnit } from '../../store/Facility/facilty.actions';
import { PrimeTime } from '../../store/Facility/facility.types';
import { selectPrimeTime, selectDateRange,selectUnit } from '../../store/Facility/facility.selector';
import { fetchRoomListsSuccess,setRoomListsSuccess, setActiverRoomListSuccess,setAllRoomsSelected} from '../../store/ORData/actions/roomsListActions';
import { setActiveSurgeonList, setSurgeonLists,setAllSurgeonsSelected } from '../../store/ORData/actions/surgeonLists.actions';



import { unitLists } from './settings.constants';

export type PrimeTimeMenuItem = {
    id: number;
    value:PRIME_TIME_START | PRIME_TIME_END;
    label:string;
}

type PrimeTimeMenuItems = {
    [key:string] : PrimeTimeMenuItem
}


const primeTimeMenuStartItems = {
    '6:30': primeTimeStartOptions[0],
    '7:00': primeTimeStartOptions[1],
    '7:30': primeTimeStartOptions[2],
    '8:00': primeTimeStartOptions[3],
    '8:30': primeTimeStartOptions[4],
    '9:00': primeTimeStartOptions[5],
    '9:30': primeTimeStartOptions[6],
}

const primeTimeMentEndItems = {
    '15:00': primeTimeEndOptions[0],
    '15:30': primeTimeEndOptions[1],
    '16:00': primeTimeEndOptions[2],
    '16:30': primeTimeEndOptions[3],
    '17:00': primeTimeEndOptions[4],
    '17:30': primeTimeEndOptions[5],
    '18:00': primeTimeEndOptions[6],
}


const Settings = () => {
 
    const [surgeons, setSurgeons] = useState<item[]>([]);
    // const [allRoomsSelected, setAllRoomsSelected]= useState(true);
    // const [allSurgeonsSelected, setAllSurgeonsSelected] = useState(true);
    const [filteredSurgeons, setFilteredSurgeons] = useState<item[]>([])
    const [selectedSurgeons, setSelectedSurgeons] = useState<item[]>([])
    


    const dispatch = useAppDispatch();
    const activeSurgeons = useSelector(selectActiveSurgeons);
    const surgeonLists = useSelector(selectSurgeonLists);
    const primeTime = useSelector(selectPrimeTime);
    const dateRange = useSelector(selectDateRange);
    const selectedUnit = useSelector(selectUnit);
    const unitRoomLists = useSelector(selectUnitRoomLists);
    const rooms = useSelector(selectActiveRoomLists);
    const allSurgeonsSelected = useSelector(selectAllSurgeonsSelected);
    const allRoomsSelected = useSelector(selectAllRoomsSelected);
 
    

    const updatePrimeTimeStart = (option:SingleValue<PrimeTimeMenuItem>) => {
        if (option) {
            console.log('start', option )
            dispatch(setPrimeTime({...primeTime, start: option.value as PRIME_TIME_START}))
        }
      
    }

    const updatePrimeTimeEnd = (option: SingleValue<PrimeTimeMenuItem>) => {
        if (option) {
            dispatch(setPrimeTime({...primeTime, end: option.value as PRIME_TIME_END}))
        }
    }


    const primeTimeStartSelector: SingleSelector<PrimeTimeMenuItem> = {
        title: 'Prime Time Start',
        selectedOption: primeTimeMenuStartItems[primeTime.start],
        optionList: primeTimeStartOptions,
        onChange: updatePrimeTimeStart,
    }

    const primeTimeEndSelector: SingleSelector<PrimeTimeMenuItem> = {
        title: 'Prime Time End',
        selectedOption: primeTimeMentEndItems[primeTime.end],
        optionList:primeTimeEndOptions,
        onChange: updatePrimeTimeEnd
    }
   
    const updateAllSelectedItems = (items:item[], setItem: (itemStatus: boolean)=>void) => {
        if (items) {
            const unselectedItem = items.findIndex((item) => item.selected === false)
            if (unselectedItem === -1) {
                setItem(true);
            } else {
                setItem(false);
            }
        }
    }

    const allItemsSelected = (items:item[]) => {
        if (items) {
            const unselectedItem = items.findIndex((item) => item.selected === false);
            if (unselectedItem === -1)
                return true
            return false;
        }
        return false;
    }


    useEffect(()=> {
        dispatch(fetchSurgeonListsAsync())
        dispatch(fetchRoomListsSuccess(TNNASRoomLists))
        dispatch(setActiverRoomListSuccess(TNNASRoomLists['BH JRI']));
    },[]);

    useEffect(()=> {
        if (surgeonLists) {
            dispatch(setActiveSurgeonList(surgeonLists['BH JRI']));
        }
    }, [surgeonLists])

    useEffect (() => {
        if (selectedUnit && activeSurgeons && surgeonLists && surgeonLists[selectedUnit]) {
            surgeonLists[selectedUnit] = activeSurgeons;
            dispatch(setSurgeonLists(surgeonLists));
        }
    },[activeSurgeons])

    useEffect(()=> {
        console.log('setting lists')
        if (selectedUnit  && surgeonLists[selectedUnit]) {
            setSurgeons(surgeonLists[selectedUnit]);
            setSelectedSurgeons(surgeonLists[selectedUnit])
            console.log('setting surgeons', selectedUnit, surgeonLists[selectedUnit])
            dispatch(setActiveSurgeonList(surgeonLists[selectedUnit]));
            setFilteredSurgeons(surgeonLists[selectedUnit])
        }
    }, [selectedUnit, surgeonLists])


    useEffect(()=> {
        if (selectedUnit && unitRoomLists[selectedUnit]) {
            console.log('updating callback', rooms)
            console.log('unit rooms', unitRoomLists['BH JRI'])
            unitRoomLists[selectedUnit] = rooms;
            dispatch(setRoomListsSuccess(unitRoomLists))
        }
    },[rooms])


    useEffect(()=> {
        if (unitRoomLists && selectedUnit && unitRoomLists[selectedUnit]) {
            // setRooms(unitRoomLists[selectedUnit])
            dispatch(setActiverRoomListSuccess(unitRoomLists[selectedUnit]))
        }
    },[selectedUnit,unitRoomLists])

    useEffect(() => {
        if (rooms) {
            updateAllSelectedItems(rooms, setAllRoomsSelected);
            const selected = allItemsSelected(rooms);
            dispatch(setAllRoomsSelected(selected));
        }
    },[rooms])

    useEffect(() => {
        if (activeSurgeons) {
            updateAllSelectedItems(activeSurgeons, setAllSurgeonsSelected);
            const allSelected = allItemsSelected(activeSurgeons)
            dispatch(setAllSurgeonsSelected(allSelected))
        }
    },[activeSurgeons])

    useEffect(()=>{
        if (activeSurgeons) {
            const selected = activeSurgeons.filter((activeSurgeon)=> activeSurgeon.selected === true)
            setSelectedSurgeons(selected)
            // dispatch(setActiveSurgeonList(selected))
        }

    },[activeSurgeons])



    const setAllItems = (items:item[],setItems:(items:item[])=>void,itemSelected:boolean ) => {
        const updatedItems = items.map((item) => {
            item.selected = itemSelected;
            return item;
        })
        setItems([...updatedItems]);
    }


    const setAllRooms = (status:boolean) => {
        const updatedRooms = rooms.map((item) => {
            item.selected = status;
            return item;
        })
        dispatch(setActiverRoomListSuccess(updatedRooms))
    }


    const onAllRoomsSelected = () => {
        // setAllItems(rooms, setRooms,true);
        setAllRooms(true)
    }

    const setAllSurgeons = (status:boolean) => {
        const updatedSurgeons = activeSurgeons.map((item) => {
            item.selected = status;
            return item;
        })
        dispatch(setActiveSurgeonList(updatedSurgeons));
        setSelectedSurgeons([...updatedSurgeons])
    }


    const onAllSurgeonsSelected = () => {
        // setAllItems(surgeons, setSurgeons, true);
        setAllSurgeons(true)
    }

    const onClearAllRooms = () => {
        // setAllItems(rooms, setRooms, false);
        setAllRooms(false)
    }

    const onClearAllSurgeons = () => {
        // setAllItems(surgeons, setSurgeons, false);
        setAllSurgeons(false)
    }

    const onItemChanged = (id:string, items:item[], setItems:(items:item[])=>void) => {
        const itemIndex = items.findIndex((item) => item.id.toString() === id);
        if (itemIndex !== -1) {
            items[itemIndex].selected=  !items[itemIndex].selected
        }
        setItems([...items]);
    }

    const setRoomChanged = (id:string) => {
        const itemIndex = rooms.findIndex((item)=> item.id.toString() === id);
        if (itemIndex !== -1) {
            rooms[itemIndex].selected = !rooms[itemIndex].selected;
        }
        dispatch(setActiverRoomListSuccess([...rooms]));
    }

    const onRoomChanged = (id:string):void => {
        // onItemChanged(id, rooms, setRooms)
        setRoomChanged(id);
    }

    const setSurgeonChanged = (id:string) => {
        const itemIndex = activeSurgeons.findIndex((item) => item.id.toString() === id);
        if (itemIndex !== -1) {
            activeSurgeons[itemIndex].selected = !activeSurgeons[itemIndex].selected;
        }
        dispatch(setActiveSurgeonList([...activeSurgeons]))
        setSelectedSurgeons([...activeSurgeons])
    }

    const onSurgeonChanged = (id:string):void => {
        console.log('surgeon changed', id)
        // onItemChanged(id, surgeons, setSurgeons)
        setSurgeonChanged(id)
    }

    const onSurgeonSearchTextChanged = (text:string):void => {
        if (text.length === 0) {
            setFilteredSurgeons([...activeSurgeons])
            return;
        }
        const filteredList = activeSurgeons.filter((surgeon)=> {
            return surgeon.name.toLowerCase().includes(text.toLowerCase());
        });
        setFilteredSurgeons([...filteredList])
    }

    const handleUnitChange = (option: SingleValue<Unit>) => {
        const unitName = (option as Unit).name.toString();
        // setSelectedUnit(option)
        dispatch(setUnit(unitName))
    }

    const onStartDateChange = (date:Date) => {
        dispatch(setDateRange({...dateRange, start:date}))
    }

    const onEndDateChange = (date:Date) => {
        dispatch(setDateRange({...dateRange, end:date}))
    }

    const unitSelector:UnitSelector = {
        value:unitLists[selectedUnit],
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
                        startDate={dateRange.start} 
                        stopDate={dateRange.end} 
                        onSelectDate1={onStartDateChange}
                        onSelectDate2={onEndDateChange} />
                </div>
                <div className='prime-time'>
                    <DualSelectors<PrimeTimeMenuItem, PrimeTimeMenuItem> 
                        title='Prime Time' 
                        selector1={primeTimeStartSelector} 
                        selector2={primeTimeEndSelector}/>
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



