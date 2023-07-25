import React, { useEffect, useState } from "react";
import SummaryGrid from "../../components/summary-grid/summary-grid";
import Calendar from "../../components/calendar/calendar";
import DetailsCard from "../../components/team-card/details-card";
import "./utilization.scss";
import { useSelector } from "react-redux";
import { selectCalendarData,  selectDetailData, selectGridData, selectPopUpIsOpen } from "../../store/ORData/selectors/ordata.selector";
import { selectDate,selectUnit,selectRoom  } from "../../store/Facility/facility.selector";
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





const Utilization = () => {
  const [month, setMonth] = useState('June')
  const [surgeonMenu, setSurgeonMenu] = useState<SingleSelector<CalendarMenuItem>>()
  const [roomMenu, setRoomMenu] = useState<SingleSelector<CalendarMenuItem>>()
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
  const blockData = useSelector(selectDetailBlockData)
  const calendarTotals = useSelector(selectCalendarTotals)
  const blockIsLoading = useSelector(selectBlockIsLoading)
  const orIsLoading = useSelector(selectORDataIsLoading)
  const dataStartDate = useSelector(selectDataStartDate)
  const dataEndDate = useSelector(selectDataEndDate)
  const dataCurrentDate = useSelector(selectDataCurrentDate)

  const currentDateRange:DataDateRange = {
    startDate: dataStartDate,
    endDate: dataEndDate,
    currentDate:dataCurrentDate
  }

  // useEffect(()=> {
  //   dispatch(fetchSurgeonListsAsync())
    // dispatch(fetchRoomLists(TNNASRoomLists))
    // dispatch(setActiveRoomList(TNNASRoomLists['BH JRI']));
    // dispatch(fetchBlockDataAsync('BH JRI',true,'2023-7-1',['1548430291']))
// },[]);

useEffect(() => {
if (primeTime && dataCurrentDate) {
  dispatch(fetchPTHourSuccessAsync(primeTime, unit,`${dataCurrentDate.getFullYear()}-${dataCurrentDate.getMonth() +1}-${dataCurrentDate.getDate()}`));
}
},[primeTime,dataCurrentDate])




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
        console.log('updating Calendar')
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
    const room: FacilityRoom = {"name":data.id, "utilization":data.utilization}
    if (data.procedures !== '0') {
      dispatch(setRoom(room))
      dispatch(fetchDetailDataAsync(unit, selectedDate,room, primeTime))
    }
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
 

const onMonthChange = (direction:MonthChangeDirection) => {
  let newDate;
  if (direction == MonthChangeDirection.BACKWARD) {
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
      {(blockIsLoading || orIsLoading)  ? <Spinner /> :
      <section className="utilization">
        <UtilDrawer 
          isOpen={isOpen} 
          title='Selected Surgeons' 
          direction={DrawerDirections.right} 
          list={activeSurgeonList}
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
            selectedDate={selectedDate}
            list1={surgeonMenu}
            list2={roomMenu}
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
