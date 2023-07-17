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
import { setPrimeTime, setDateRange, setUnit, setRoom } from '../../store/Facility/facilty.actions';
import { selectPrimeTime, selectDateRange,selectUnit } from '../../store/Facility/facility.selector';
import { fetchRoomLists,setRoomLists, setActiveRoomList,setAllRoomsSelected} from '../../store/ORData/actions/roomsListActions';
import { setActiveSurgeonList, setSurgeonLists,setAllSurgeonsSelected } from '../../store/ORData/actions/surgeonLists.actions';
import { SurgeonList,SurgeonLists } from '../../store/ORData/ordata.types';
import { Group } from '../../components/groupsContainer/groupItem';
import GroupContainer from '../../components/groupsContainer/groupsContainer';
import { surgeonGroups } from './settings.constants';
import { selectUpdateWithGroup,selectGroupId } from '../../store/ORData/selectors/ordata.selector';
import {  setGroupId, setUpdateWithGroup } from '../../store/ORData/actions/ordata.actions';
import { primeTimeMenuStartItems,primeTimeMenuEndItems } from './settings.constants';
import { fetchSurgeonListsAsync } from '../../store/ORData/actions/surgeonLists.actions';


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
    name: 'Spine'
}

const providerGroups:Group[] = [
    neuroGroup
]





const Settings = () => {
 

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
    const groupId = useSelector(selectGroupId);
    const updateWithGroup = useSelector(selectUpdateWithGroup);
 
    

    const updatePrimeTimeStart = (option:SingleValue<PrimeTimeMenuItem>) => {
        if (option) {
            // console.log('start', option )
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
        selectedOption: primeTimeMenuEndItems[primeTime.end],
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
        dispatch(fetchRoomLists(TNNASRoomLists))
        // dispatch(setActiveRoomList(TNNASRoomLists['MT OR']));
        // dispatch(fetchBlockDataAsync('BH JRI',true,'2023-7-1',['1548430291']))
    },[]);

    useEffect(()=> {
        console.log('setting lists')
        if (selectedUnit  && surgeonLists[selectedUnit]) {
            setSelectedSurgeons(surgeonLists[selectedUnit])
            dispatch(setActiveSurgeonList(surgeonLists[selectedUnit]));
            setFilteredSurgeons(surgeonLists[selectedUnit])
        }
    }, [selectedUnit, surgeonLists])


    useEffect(()=> {
        if (selectedUnit && unitRoomLists[selectedUnit]) {
            dispatch(setActiveRoomList(unitRoomLists[selectedUnit]))
        }
    },[selectedUnit])



    useEffect(() => {
        console.log('updating room')
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




    const setAllRooms = (status:boolean) => {
        const updatedRooms = rooms.map((item) => {
            item.selected = status;
            return item;
        })
        dispatch(setActiveRoomList(updatedRooms))
    }


    const onAllRoomsSelected = () => {
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



    const onRoomChanged = (id:string):void => {
        console.log('room changed')
        const itemIndex = rooms.findIndex((item)=> item.id.toString() === id);
        if (itemIndex !== -1) {
            rooms[itemIndex].selected = !rooms[itemIndex].selected;
        }
        dispatch(setActiveRoomList([...rooms]));
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







    const selectSurgeonGroup = (group:string[]) => {
        let newSurgeonList = activeSurgeons.map((surgeon)=> {
            if (group.includes(surgeon.NPI.toString())) {
                surgeon.selected = true;
            } else {
                surgeon.selected = false;
            }
            return surgeon
        });
        if (newSurgeonList.length > 0) {
            console.log('seeting group surgeons')
            dispatch(setActiveSurgeonList(newSurgeonList));
        }
    }




    const selectRoomGroup = (group:string[]) => {
        console.log('rooms',group )
        let newRoomList = rooms.map((room) => {

            if (group.includes(room['name'].toString())) {
                room.selected = true;
            } else {
                room.selected = false;
            }
            return room;
        })
        if (newRoomList.length > 0) {
            console.log('setting group rooms')
            
            dispatch(setActiveRoomList(newRoomList));
        }
    
    }

    // useEffect(() => {
    //     if (updateWithGroup && selectedUnit) {
    //         if (selectedUnit === surgeonGroups[parseInt(groupId)].unit){
    //             console.log('updating group group update')
    //             selectSurgeonGroup(surgeonGroups[parseInt(groupId)].surgeons);
    //             selectRoomGroup(surgeonGroups[parseInt(groupId)].rooms);
    //             dispatch(setUpdateWithGroup(false));
    //         } 
    //     }
    // },[updateWithGroup,selectedUnit])


    const onSelectGroupItem = (id:string) => {
        console.log('Setting group update')
        dispatch(setGroupId(id))
        if (selectedUnit !== surgeonGroups[parseInt(id)].unit){
            dispatch(setUnit(surgeonGroups[parseInt(id)].unit));
            // dispatch(setUpdateWithGroup(true));
        } else {
            selectSurgeonGroup(surgeonGroups[parseInt(groupId)].surgeons);
            selectRoomGroup(surgeonGroups[parseInt(groupId)].rooms);
        }

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



