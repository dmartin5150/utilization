import React, {useState, useEffect} from 'react';
import './settings.scss'
import { item } from '../../store/ORData/ordata.types';
import {SingleValue} from "react-select";
import DualSelectors from '../../components/dualSelectors/DualSelectors';
import { SingleSelector } from '../../components/SelectorList/SelectorList';
import RangeSelectors from '../../components/dateRange/RangeSelector';
import { UnitSelector, UnitListSelector } from '../../components/selectUnits/SelectUnit';
import SelectUnit from '../../components/selectUnits/SelectUnit';
import SearchList from '../../components/SearchList/SearchList';
import { SearchListItems } from '../../components/SearchList/SearchList';
import { PRIME_TIME_START,PRIME_TIME_END } from '../../store/Facility/facility.types';
import { Unit, TNNASRoomLists, unitList,UnitRoomListItem, UnitRoomLists,
        primeTimeStartOptions,primeTimeEndOptions} from './settings.constants';
import { useAppDispatch } from '../../hooks/hooks';
import { useSelector } from 'react-redux';
import { selectSurgeonLists, selectUnitRoomLists, selectActiveRoomLists, selectActiveSurgeons, selectAllRoomsSelected,selectAllSurgeonsSelected } from '../../store/ORData/selectors/ordata.selector';
import { setPrimeTime, setDateRange, setUnit } from '../../store/Facility/facilty.actions';
import { selectPrimeTime, selectDateRange,selectUnit } from '../../store/Facility/facility.selector';
import { fetchRoomListsSuccess,setRoomListsSuccess, setActiverRoomListSuccess,setAllRoomsSelected} from '../../store/ORData/actions/roomsListActions';
import { setActiveSurgeonList, setSurgeonLists,setAllSurgeonsSelected } from '../../store/ORData/actions/surgeonLists.actions';
import { SurgeonList,SurgeonLists } from '../../store/ORData/ordata.types';
import { Group } from '../../components/groupsContainer/groupItem';
import GroupContainer from '../../components/groupsContainer/groupsContainer';
import { surgeonGroups } from './settings.constants';


import { unitLists } from './settings.constants';

export type PrimeTimeMenuItem = {
    id: number;
    value:PRIME_TIME_START | PRIME_TIME_END;
    label:string;
}

type PrimeTimeMenuItems = {
    [key:string] : PrimeTimeMenuItem
}


const neuroGroup:Group = {
    id:'0',
    name: 'Neuro'
}

const providerGroups:Group[] = [
    neuroGroup
]




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
        console.log('setting lists')
        if (selectedUnit  && surgeonLists[selectedUnit]) {
            setSelectedSurgeons(surgeonLists[selectedUnit])
            console.log('setting surgeons', selectedUnit, surgeonLists[selectedUnit])
            dispatch(setActiveSurgeonList(surgeonLists[selectedUnit]));
            setFilteredSurgeons(surgeonLists[selectedUnit])
        }
    }, [selectedUnit, surgeonLists])


    useEffect(()=> {
        console.log('in room update selected unit', selectedUnit, unitRoomLists[selectedUnit])
        if (selectedUnit && unitRoomLists[selectedUnit]) {
            setActiverRoomListSuccess(unitRoomLists[selectedUnit])
        }
    },[selectedUnit])


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
        setAllSurgeons(true)
    }

    const onClearAllRooms = () => {
        setAllRooms(false)
    }

    const onClearAllSurgeons = () => {
        setAllSurgeons(false)
    }


    const setRoomChanged = (id:string) => {
        const itemIndex = rooms.findIndex((item)=> item.id.toString() === id);
        if (itemIndex !== -1) {
            rooms[itemIndex].selected = !rooms[itemIndex].selected;
        }
        dispatch(setActiverRoomListSuccess([...rooms]));
    }

    const onRoomChanged = (id:string):void => {
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

    const selectGroup = (group:string[]) => {
        let newSurgeonList = activeSurgeons.map((surgeon)=> {
            console.log(group)
            console.log(surgeon.NPI.toString())
            if (group.includes(surgeon.NPI.toString())) {
                surgeon.selected = true;
            } else {
                surgeon.selected = false;
            }
            return surgeon
        });
        dispatch(setActiveSurgeonList(newSurgeonList));

    }


    const onSelectGroupItem = (id:string) => {
        console.log('group id:', id)
        selectGroup(surgeonGroups[parseInt(id)])
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
                <div className='physician-group'>
                    <GroupContainer 
                        title={'Provider Groups'} 
                        groups={providerGroups} 
                        onSelectItem={onSelectGroupItem}
                        />
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



