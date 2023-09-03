import React, { useEffect, useState } from "react";
import SummaryGrid from "../../components/summary-grid/summary-grid";
import Calendar from "../../components/calendar/calendar";
import DetailsCard from "../../components/team-card/details-card";
import "./utilization.scss";
import { useSelector } from "react-redux";
import { selectCalendarData,  selectDetailData, selectGridData, selectPopUpIsOpen } from "../../store/ORData/selectors/ordata.selector";
import { selectDate,selectUnit,selectRoom, selectCustomDateRange  } from "../../store/Facility/facility.selector";
import { fetchDetailDataAsync, closePopUp } from "../../store/ORData/actions/details.actions";
import { useAppDispatch } from "../../hooks/hooks";
import { setRoom, setDate, setUnit } from "../../store/Facility/facilty.actions";
import { FacilityRoom } from "../../store/Facility/facitlity.reducer";
import { GridNames } from "../../components/team-card/details-grid";
import { DetailsHeader } from "../../components/team-card/details-card-header";
import { selectPrimeTime } from "../../store/Facility/facility.selector";
import { selectSurgeonLists } from "../../store/ORData/selectors/ordata.selector";
import { setActiveSurgeonList } from "../../store/ORData/actions/surgeonLists.actions";
import { CalendarMenuItem } from "./utilization.constants";
import { SingleSelector } from "../../components/SelectorList/SelectorList";
import {  CalendarMenuOptions } from "./utilization.constants";
import {SingleValue} from "react-select";
import { setCalendarSurgeonOption, setCalendarRoomOption} from "../../store/ORData/actions/calendar.actions";
import { calendarSurgeonMenus, calendarRoomMenus} from "./utilization.constants";
import { selectAllRoomsSelected,selectAllSurgeonsSelected } from "../../store/ORData/selectors/ordata.selector";
import { selectCalendarPTHoursAll } from "../../store/ORData/selectors/ordata.ptselectors";
import {selectPTHoursTotalsAll} from "../../store/ORData/selectors/ordata.ptselectors";
import { selectActiveSurgeons } from "../../store/ORData/selectors/ordata.selector";
import { CalendarDayData } from "../../components/calendar/calendarDay";
import { setCalendarData } from "../../store/ORData/actions/calendar.actions";
import { selectGridDataAll} from "../../store/ORData/selectors/ordata.gridselectors";
import { SummaryGridRowData } from "../../components/summary-grid/summary-grid-row";
import { selectActiveSurgeonNPIs } from "../../store/ORData/selectors/ordata.selector";
import { selectDetailBlockData } from "../../store/ORData/selectors/ordata.selector";
import { setCalendarTotals } from "../../store/ORData/actions/calendar.actions";
import { selectCalendarTotals } from "../../store/ORData/selectors/ordata.ptselectors";
import { setGridData } from "../../store/ORData/actions/grid.actions";
import { fetchPTHourSuccessAsync} from '../../store/ORData/actions/pthours.action';
import { selectBlockIsLoading } from "../../store/Block/selectors/calendar.selector";
import { selectORDataIsLoading } from "../../store/ORData/selectors/ordata.selector";
import Spinner from "../../components/spinner/spinner";
import { MonthChangeDirection } from "../../components/calendar/calendar";
import { selectDataStartDate, selectDataEndDate, selectDataCurrentDate } from "../../store/ORData/selectors/ordata.selector";
import { DataDateRange } from "../../components/calendar/calendar";
import { getPreviousDate, getNextDate } from "../../utilities/dates/dates";
import { setDataCurrentDate } from "../../store/ORData/actions/calendar.actions";
import UtilDrawer from '../../components/utilDrawer/utilDrawer'
import { DrawerDirections } from "../../components/utilDrawer/utilDrawer";
import { selectAllSelectedSurgeons } from "../../store/ORData/selectors/ordata.selector";
import { calendarSummaryOptions,CalendarSummaryOptions } from "./utilization.constants";
import { setUtilSummaryOption } from "../../store/ORData/actions/ordata.actions";
import { selectUtilSummaryOption } from "../../store/ORData/selectors/ordata.selector";
import { getFY23Q4Dates,getRunningQuarterDates } from "../../utilities/dates/dates";
import { setSummaryDateRange } from "../../store/ORData/actions/ordata.actions";
import { createDateRange } from "../../utilities/dates/dates";
import {fetchUtilSummaryDataAsync } from "../../store/ORData/actions/pthours.action";
import { SummaryTotalRequest } from "../../store/ORData/ordata.types";
import { selectSummaryTotals } from "../../store/ORData/selectors/ordata.selector";
import { selectActiveRoomNames } from "../../store/ORData/selectors/ordata.selector";
import { selectSummaryDateRange } from "../../store/ORData/selectors/ordata.selector";
import { selectCalendarRoomOption,selectCalendarSurgeonOption } from "../../store/ORData/selectors/ordata.selector";

import { selectUtilError } from "../../store/ORData/selectors/ordata.selector";
import MessagingPage from "../messaging/messagingPage";





const Utilization = () => {
  const [month, setMonth] = useState('June')
  const [surgeonMenu, setSurgeonMenu] = useState<SingleSelector<CalendarMenuItem>>()
  const [roomMenu, setRoomMenu] = useState<SingleSelector<CalendarMenuItem>>()
  const [summaryMenu, setSummaryMenu] = useState<SingleSelector<CalendarMenuItem>>()
  const [activeNPIs, setActiveNPIs] = useState<string[]>([])
  const [isOpen, setIsOpen] = React.useState(false)


  


  const dispatch = useAppDispatch();
  const calendarData = useSelector(selectCalendarData);
  const gridData = useSelector(selectGridData);
  const detailsData = useSelector(selectDetailData);
  const popupOpen = useSelector(selectPopUpIsOpen);
  const selectedDate = useSelector(selectDate);
  const unit = useSelector(selectUnit);
  const room = useSelector(selectRoom);
  const primeTime = useSelector(selectPrimeTime);
  const surgeonLists = useSelector(selectSurgeonLists);
  const activeSurgeonList = useSelector(selectActiveSurgeons);
  const allRoomsSelected = useSelector(selectAllRoomsSelected);
  const allSurgeonsSelected = useSelector(selectAllSurgeonsSelected);
  const allPTHours = useSelector(selectCalendarPTHoursAll);
  const PTTotalAll = useSelector(selectPTHoursTotalsAll);
  const allGridData = useSelector(selectGridDataAll);
  const selectedNPIs = useSelector(selectActiveSurgeonNPIs)
  const selectedRooms = useSelector(selectActiveRoomNames)
  const summaryDateRange = useSelector(selectSummaryDateRange)
  const blockData = useSelector(selectDetailBlockData)
  const calendarTotals = useSelector(selectCalendarTotals)
  const blockIsLoading = useSelector(selectBlockIsLoading)
  const orIsLoading = useSelector(selectORDataIsLoading)
  const dataStartDate = useSelector(selectDataStartDate)
  const dataEndDate = useSelector(selectDataEndDate)
  const dataCurrentDate = useSelector(selectDataCurrentDate)
  const selectedSurgeonNames = useSelector(selectAllSelectedSurgeons)
  const summaryStartDate = useSelector(selectDataStartDate)
  const  summaryEndDate = useSelector(selectDataEndDate)
  const curSummaryOption = useSelector(selectUtilSummaryOption)
  const calendarRoomOption = useSelector(selectCalendarRoomOption)
  const calendarSurgeonOption = useSelector(selectCalendarSurgeonOption)
  const customDateRange = useSelector(selectCustomDateRange)
  const summaryTotals = useSelector(selectSummaryTotals)
  const utilError = useSelector(selectUtilError)

  const currentDateRange:DataDateRange = {
    startDate: dataStartDate,
    endDate: dataEndDate,
    currentDate:dataCurrentDate
  }



useEffect(() => {
if (primeTime && dataCurrentDate) {
  dispatch(fetchPTHourSuccessAsync(primeTime, unit,`${dataCurrentDate.getFullYear()}-${dataCurrentDate.getMonth() +1}-${dataCurrentDate.getDate()}`));
}
},[primeTime,dataCurrentDate])


// useEffect(()=> {
//   console.log('getting total')
//    if(allPTHours) {
//     console.log('getting total')
//     const request:SummaryTotalRequest = {
//       'unit': unit,
//       'startDate': '2023-7-1',
//       'endDate': '2023-7-31',
//       'selectAll':true,
//       'selectedProviders':['1982657276'],
//       'selectedRooms':['BH JRI 04'],
//       'roomSelectionOption': 2,
//       'primeTime':primeTime
//     }
//     console.log('fetching summary')
//     dispatch(fetchUtilSummaryDataAsync(request))
//    }

// },[allPTHours])


useEffect(()=> {
  console.log('summary', summaryTotals)
},[summaryTotals])

  useEffect(()=> {
    // console.log('active surgeonList', surgeonLists)
     if (surgeonLists && surgeonLists['BH JRI'] && surgeonLists['BH JRI'].length >0 && activeSurgeonList && activeSurgeonList.length === 0 ) {
      // console.log('dispatching list')
      dispatch(setActiveSurgeonList(surgeonLists['BH JRI']))
     }
  },[activeSurgeonList, surgeonLists])



useEffect(() => {
  if (calendarData && calendarData.length > 0) {
    dispatch(setCalendarTotals(calendarTotals))
  }
}, [calendarData])



  useEffect(()=> {
    if(allSurgeonsSelected) {
      setActiveNPIs([])
    } else {
      const npis = selectedNPIs.map((npi)=> npi.toString())
      setActiveNPIs(npis)
    }
  },[activeSurgeonList])



  useEffect(()=> {
        const newGridData:SummaryGridRowData[] = allGridData.map((grid) => {
          return ({
            id: grid.room,
            room: grid.room,
            utilization:grid.utilization,
            procedureTitle:'Procedures',
            procedures: grid.numProcedures,
            ptHours: grid.ptHours,
            nptHours: grid.nonptHours,
            block_status:grid.block_status
          })
      }) 
      dispatch(setGridData(newGridData))
    },[selectedDate, calendarData])

    useEffect (() => {
      if (allPTHours && calendarData){
        // console.log('updating Calendar')
        console.log('ptAll',PTTotalAll)
          const newCalendarData:CalendarDayData[] = PTTotalAll.map((ptTotal) => {
            return { 
              date: ptTotal.curDate,
              display:ptTotal.utilization,
              subHeading1: ptTotal.totalptHours,
              subHeading2: ptTotal.totalnonptHours,
              ptMinutes: ptTotal.ptMinutes,
              nonptMinutes: ptTotal.nonptMinutes,
              totalptMinutes: ptTotal.totalptMinutes,
              dayOfWeek: ptTotal.dayOfWeek
            }
          })
          dispatch(setCalendarData(newCalendarData));
      }
    },[selectedDate, allPTHours,activeSurgeonList])


  
  const setDetailData = (data:SummaryGridRowData) => {
    console.log('details')
    const room: FacilityRoom = {"name":data.id, "utilization":data.utilization}
    // if (data.procedures !== '0') {
      dispatch(setRoom(room))
      console.log('dispatching fetch block data')
      dispatch(fetchDetailDataAsync(unit, selectedDate,room, primeTime))
    // }
  }

  const closeDetailsCard = () => {
    dispatch(closePopUp());
  }

  const setSelectedDate = (date:string) => {
    
    dispatch(setDate(date))
  }
   
  const setSelectedUnit = (unit:string) => {
    dispatch(setUnit (unit))
  }



  const detailsHeader:DetailsHeader = {'col1':room.name,'col2':selectedDate, 'col3':`Utilization ${room.utilization}`, 'col4': ''}
  const detailsColHeader:GridNames = {'col1':'Surgeon', 'col2':'Procedure', 'col3': 'Start Time', 'col4':'End Time', 'col5':'Duration'}


const updateCalendarSurgeons = (option: SingleValue<CalendarMenuItem>) => {
  if (option) {
    dispatch(setCalendarSurgeonOption(option.value as CalendarMenuOptions))
  }
}



useEffect(()=> {
  if (allSurgeonsSelected) {
    const calendarSurgeonSelector: SingleSelector<CalendarMenuItem> = {
      title: 'Surgeons',
      showBorder:false,
      selectedOption: calendarSurgeonMenus['None'][0],
      optionList:calendarSurgeonMenus['None'],
      onChange:updateCalendarSurgeons 
    }
    setSurgeonMenu(calendarSurgeonSelector)
    dispatch(setCalendarSurgeonOption(CalendarMenuOptions.All))
  } else {
    const calendarSurgeonSelector: SingleSelector<CalendarMenuItem> = {
      title: 'Surgeons',
      showBorder:false,
      selectedOption: calendarSurgeonMenus['All'][1],
      optionList:calendarSurgeonMenus['All'],
      onChange:updateCalendarSurgeons 
    }
    setSurgeonMenu(calendarSurgeonSelector)
    dispatch(setCalendarSurgeonOption(CalendarMenuOptions.Selected))
  }
},[allSurgeonsSelected])




const updateCalendarRooms = (option: SingleValue<CalendarMenuItem>) => {
  if (option) {
    dispatch(setCalendarRoomOption(option.value as CalendarMenuOptions))
  }
}

useEffect(()=> {
  if (allSurgeonsSelected) {
    const calendarRoomSelector: SingleSelector<CalendarMenuItem> = {
      title: 'Rooms',
      isDisabled:true,
      showBorder:false,
      selectedOption: calendarRoomMenus['Selected'][0],
      optionList: calendarRoomMenus['Selected'],
      onChange:updateCalendarRooms
    }
    setRoomMenu(calendarRoomSelector);
    dispatch(setCalendarRoomOption(CalendarMenuOptions.All))
  } else if (!allSurgeonsSelected && allRoomsSelected){
    const calendarRoomSelector: SingleSelector<CalendarMenuItem> = {
      title: 'Rooms',
      isDisabled: false,
      showBorder: false,
      selectedOption: calendarRoomMenus['Mixed'][0],
      optionList: calendarRoomMenus['Mixed'],
      onChange:updateCalendarRooms
    }
    setRoomMenu(calendarRoomSelector);
    dispatch(setCalendarRoomOption(CalendarMenuOptions.All))
  } else {
    const calendarRoomSelector: SingleSelector<CalendarMenuItem> = {
      title: 'Rooms',
      isDisabled: false,
      showBorder:false,
      selectedOption: calendarRoomMenus['All'][1],
      optionList: calendarRoomMenus['All'],
      onChange:updateCalendarRooms
    }
    setRoomMenu(calendarRoomSelector);
    dispatch(setCalendarRoomOption(CalendarMenuOptions.Selected))
  }
},[allSurgeonsSelected, allRoomsSelected])
 

useEffect(()=> {
  
  if (curSummaryOption && dataCurrentDate && customDateRange) {
    if (curSummaryOption === CalendarSummaryOptions.Q4) {
      const newRange = getFY23Q4Dates()
      dispatch(setSummaryDateRange(newRange))
      console.log(newRange)
    }
    if (curSummaryOption === CalendarSummaryOptions.RunQ) {
      const newRange = getRunningQuarterDates(dataCurrentDate)
      dispatch(setSummaryDateRange(newRange))
      // console.log(newRange)
    }
    if (curSummaryOption === CalendarSummaryOptions.Custom) {
      dispatch(setSummaryDateRange(customDateRange))
    }
  }
},[curSummaryOption,dataCurrentDate,customDateRange])

// const selectedNPIs = useSelector(selectActiveSurgeonNPIs)
// const selectedRooms = useSelector(selectActiveRoomNames)
// const summaryDateRange = useSelector(selectSummaryDateRange)

useEffect(()=> {

    console.log('daterange', summaryDateRange)
    const startDate = `${summaryDateRange.startDate.getFullYear()}-${summaryDateRange.startDate.getMonth() + 1}-${summaryDateRange.startDate.getDate()}`
    const endDate = `${summaryDateRange.endDate.getFullYear()}-${summaryDateRange.endDate.getMonth() + 1}-${summaryDateRange.endDate.getDate()}`
    // console.log('calendar surgeon option', calendarSurgeonOption.valueOf())
    // console.log('startdate', startDate)
    // console.log('enddate', endDate)
    let allSurgeonsSelected = false
    if (calendarSurgeonOption === CalendarMenuOptions.All) {
      allSurgeonsSelected = true
    } 
    // console.log('calendar surgeon option',allSurgeonsSelected)
    const request:SummaryTotalRequest = {
      'unit': unit,
      'startDate': startDate,
      'endDate': endDate,
      'selectAll':allSurgeonsSelected,
      'selectedProviders':selectedNPIs,
      'selectedRooms':selectedRooms,
      'roomSelectionOption': parseInt(calendarRoomOption.valueOf()),
      'primeTime':primeTime
    }
    dispatch(fetchUtilSummaryDataAsync(request))

},[summaryDateRange,calendarSurgeonOption,calendarRoomOption])



const updateCalendarSummary = (option: SingleValue<CalendarMenuItem>) => {
  if (option) {
    dispatch(setUtilSummaryOption(option.value as CalendarSummaryOptions))
  }
}


useEffect (() => {
  if (curSummaryOption) {
    const curOption = parseInt(curSummaryOption)
    const calendarSummarySelector: SingleSelector<CalendarMenuItem> = {
      title: 'Summary',
      isDisabled: false,
      showBorder:false,
      selectedOption: calendarSummaryOptions[curOption],
      optionList: calendarSummaryOptions,
      onChange:updateCalendarSummary
    }
    setSummaryMenu(calendarSummarySelector)
  }
},[summaryStartDate, summaryEndDate,curSummaryOption ])



const onMonthChange = (direction:MonthChangeDirection) => {
  let newDate;
  if (direction === MonthChangeDirection.BACKWARD) {
    newDate =getPreviousDate(dataStartDate,dataCurrentDate)
  } else {
    newDate =getNextDate(dataEndDate,dataCurrentDate)
  }
  dispatch(setDataCurrentDate(newDate))
  console.log(newDate)
}

const toggleDrawer = () => {
  setIsOpen((prevState) => !prevState)
}


  return (
    <div className='utilization-container'>
      {(blockIsLoading || orIsLoading || utilError)  ? <MessagingPage isLoading={(blockIsLoading || orIsLoading)} errorMessage={'Unable to get utilization data'} /> :
      <section className="utilization">
        <UtilDrawer 
          isOpen={isOpen} 
          title='Selected Surgeons' 
          direction={DrawerDirections.right} 
          list={selectedSurgeonNames}
          toggleDrawer={toggleDrawer}
          />
         <DetailsCard 
          title={"OR Utilization"} 
          header={detailsHeader}
          columns={detailsColHeader}
          highLightItemsGreen={activeNPIs}
          data ={detailsData}
          usePopUp={true}
          onClosePopup={closeDetailsCard} 
          classIsOpen={`${popupOpen ? "open" : "close"}`}
          highLightItemsRed={['Open Time']}
          subHeaderData={blockData}
          pageSize={6} />
        <div className="patient__calendar">
          {surgeonMenu && roomMenu && <Calendar
            title='TNNAS UTILIZATION DATA'
            subTitle={unit}
            calendarData={calendarData}
            calendarTotals={calendarTotals}
            calendarSummary={summaryTotals}
            selectedDate={selectedDate}
            summaryDateRange={summaryDateRange}
            useDropDown={true}
            list1={surgeonMenu}
            list2={roomMenu}
            list3={summaryMenu}
            onMonthChange={onMonthChange}
            dataDateRange={currentDateRange}
            // dropDownLeft={calendarDropDownLeft}
            // dropDownRight= {calendarDropDownRight}
            onDateChange={setSelectedDate}
            pageSize={30}
          />}
        </div>
        <div className="patient__info">
          <SummaryGrid
            data={gridData}
            title={`${unit} Room Data: ${selectedDate}`}
            onSelectItem={setDetailData}
            firstColumnName={'Room'}
            secondColumnName={'Utilization'}
            onSelectSurgeons={toggleDrawer}
            buttonText={'Details'}
            pageSize={18}
          ></SummaryGrid>
        </div>
      </section>}
    </div>
  );
};

export default Utilization;
