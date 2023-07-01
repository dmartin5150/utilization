import React, { useEffect, useState } from "react";
import SummaryGrid, { SummaryGridData } from "../../components/summary-grid/summary-grid";
import Calendar from "../../components/calendar/calendar";
import DetailsCard from "../../components/team-card/details-card";
import "./utilization.scss";
import { useSelector } from "react-redux";
import { selectCalendarData, selectCalendarRoomOption, selectDetailData, selectGridData, selectPopUpIsOpen } from "../../store/ORData/ordata.selector";
import { selectDate,selectUnit,selectRoom  } from "../../store/Facility/facility.selector";
import { fetchCalendarDataAsync } from "../../store/ORData/actions/calendar.actions";
import { fetchGridDataAsync } from "../../store/ORData/actions/grid.actions";
import { fetchDetailDataAsync, closePopUp } from "../../store/ORData/actions/details.actions";
import { useAppDispatch } from "../../hooks/hooks";
import { setRoom, setDate, setUnit } from "../../store/Facility/facilty.actions";
import { FacilityRoom } from "../../store/Facility/facitlity.reducer";
import { DropDownBox } from "../../components/dropdown/DropDown";
import { GridNames } from "../../components/team-card/details-grid";
import { DetailsHeader } from "../../components/team-card/details-card-header";
import getPTHours from "../../utilities/fetchData/getPTHours";
import { selectPrimeTime } from "../../store/Facility/facility.selector";
import { fetchSurgeonListsAsync } from "../../store/ORData/actions/surgeonLists.actions";
import { fetchRoomListsSuccess,setActiverRoomListSuccess } from "../../store/ORData/actions/roomsListActions";
import { TNNASRoomLists } from "../settings/settings.constants";
import { selectSurgeonLists } from "../../store/ORData/ordata.selector";
import { TNNASUNIT } from "../../store/Facility/facility.types";
import { setActiveSurgeonList } from "../../store/ORData/actions/surgeonLists.actions";
import { selectPTminutesperroom } from "../../store/Facility/facility.selector";
import { CalendarMenuItem } from "./utilization.constants";
import SelectorList from "../../components/SelectorList/SelectorList";
import { SingleSelector } from "../../components/SelectorList/SelectorList";
import {  CalendarMenuOptions } from "./utilization.constants";
import Select,{SingleValue} from "react-select";
import { setCalendarSurgeonOption, setCalendarRoomOption} from "../../store/ORData/actions/calendar.actions";
import { selectCalendarSurgeonOption } from "../../store/ORData/ordata.selector";
import { calendarSurgeonMenus, calendarRoomMenus} from "./utilization.constants";
import { selectAllRoomsSelected,selectAllSurgeonsSelected } from "../../store/ORData/ordata.selector";
import { selectCalendar } from "../../store/ORData/ordata.selector";
import { selectCalendarPTHoursAll,selectCalendarPTHoursFilterRooms, selectCalendarPTHourFilterSurgeons,
  selectCalendarPTHourFilterBoth, } from "../../store/ORData/ordata.selector";
import {selectPTHoursTotalsAll, selectPTHoursTotalsAllSurgeonsSelected,
  selectPTHoursTotalsAllRoomssSelected,selectPTHoursTotalsMixed,selectPTHoursTotalsBoth,selectPTHoursTotalsAllMixed} from "../../store/ORData/ordata.selector";
import { selectActiveSurgeons } from "../../store/ORData/ordata.selector";
import {selectActiveRoomLists} from "../../store/ORData/ordata.selector";
import { CalendarDayData } from "../../components/calendar/calendarDay";
import { setCalendarData } from "../../store/ORData/actions/calendar.actions";

const Utilization = () => {
  const [month, setMonth] = useState('June')
  const [surgeonMenu, setSurgeonMenu] = useState<SingleSelector<CalendarMenuItem>>()
  const [roomMenu, setRoomMenu] = useState<SingleSelector<CalendarMenuItem>>()



  
  const hiddenIDs = ["-1","-2","-3","-4","-5"]
  const UnitMenuItems = ['BH JRI','STM ST OR', 'MT OR']
  const MonthMenuItems = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
                          'August', 'September', 'October', 'November', 'December']

  const dispatch = useAppDispatch();
  const calendarData = useSelector(selectCalendarData);
  const calendar = useSelector(selectCalendar)
  const gridData = useSelector(selectGridData);
  const detailsData = useSelector(selectDetailData);
  const popupOpen = useSelector(selectPopUpIsOpen);
  const selectedDate = useSelector(selectDate);
  const unit = useSelector(selectUnit);
  const room = useSelector(selectRoom);
  const primeTime = useSelector(selectPrimeTime);
  const surgeonLists = useSelector(selectSurgeonLists);
  const activeSurgeonList = useSelector(selectActiveSurgeons);
  const calendarSurgeonOption = useSelector(selectCalendarSurgeonOption);
  const calendarRoomOption = useSelector(selectCalendarRoomOption)
  const allRoomsSelected = useSelector(selectAllRoomsSelected);
  const allSurgeonsSelected = useSelector(selectAllSurgeonsSelected);
  const allPTHours = useSelector(selectCalendarPTHoursAll);
  const PTHoursFilterRoom = useSelector(selectCalendarPTHoursFilterRooms);
  const PTHoursFilterSurgeon = useSelector(selectCalendarPTHourFilterSurgeons);
  const PTHoursFilterBoth = useSelector(selectCalendarPTHourFilterBoth);
  const PTTotalAll = useSelector(selectPTHoursTotalsAll);
  const PTTotalALlSurgeonSelected = useSelector(selectPTHoursTotalsAllSurgeonsSelected);
  const PTTotalAllRoomsSelected = useSelector (selectPTHoursTotalsAllRoomssSelected);
  const PTTotalMixed = useSelector(selectPTHoursTotalsMixed);
  const PTTotalBoth = useSelector(selectPTHoursTotalsBoth);
  const PTTotalAllMixed = useSelector(selectPTHoursTotalsAllMixed);
  const activeRoomList = useSelector(selectActiveRoomLists)



  useEffect(()=> {
    console.log('active surgeonList', surgeonLists)
     if (surgeonLists && surgeonLists['BH JRI'] && surgeonLists['BH JRI'].length >0 && activeSurgeonList && activeSurgeonList.length == 0 ) {
      console.log('dispatching list')
      dispatch(setActiveSurgeonList(surgeonLists['BH JRI']))
     }
  },[activeSurgeonList, surgeonLists])





  useEffect(() => {
    console.log('triggered')
    if (activeSurgeonList && activeSurgeonList.length > 0 && surgeonLists['BH JRI'] && surgeonLists['BH JRI'].length >0) {
      if (calendarSurgeonOption == CalendarMenuOptions.All && calendarRoomOption == CalendarMenuOptions.All) {
        console.log('in all menu option')
        console.log( 'calendar',  calendar);
        console.log('calendar PTHOurs', allPTHours)
        console.log('total hours', PTTotalAll)
        const calendarData:CalendarDayData[] = PTTotalAll.map((ptTotal) => {
          return { 
            date: ptTotal.curDate,
            display:ptTotal.utilization,
            subHeading1: ptTotal.totalptHours,
            subHeading2: ptTotal.totalnonptHours
          }
        })
        dispatch(setCalendarData(calendarData));
     }
     if (calendarSurgeonOption == CalendarMenuOptions.All && calendarRoomOption == CalendarMenuOptions.Selected) {
        console.log( 'calendar',  calendar);
        console.log('calendar PTHOurs', PTHoursFilterRoom)
        console.log('total hours', PTTotalALlSurgeonSelected)
        const calendarData:CalendarDayData[] = PTTotalALlSurgeonSelected.map((ptTotal) => {
          return { 
            date: ptTotal.curDate,
            display:ptTotal.utilization,
            subHeading1: ptTotal.totalptHours,
            subHeading2: ptTotal.totalnonptHours
          }
        })
        dispatch(setCalendarData(calendarData));
     }
     if (calendarSurgeonOption == CalendarMenuOptions.All && calendarRoomOption == CalendarMenuOptions.Mixed) {
      console.log( 'calendar',  calendar);
      console.log('calendar PTHOurs', PTHoursFilterRoom)
      console.log('total hours', PTTotalAllMixed)
      const calendarData:CalendarDayData[] = PTTotalAllMixed.map((ptTotal) => {
        return { 
          date: ptTotal.curDate,
          display:ptTotal.utilization,
          subHeading1: ptTotal.totalptHours,
          subHeading2: ptTotal.totalnonptHours
        }
      })
      dispatch(setCalendarData(calendarData));
   }
     if (calendarSurgeonOption == CalendarMenuOptions.Selected && calendarRoomOption == CalendarMenuOptions.All) {
      console.log( 'calendar',  calendar);
      console.log('calendar PTHOurs', PTHoursFilterSurgeon);
      console.log('total hours', PTTotalAllRoomsSelected)
      const calendarData:CalendarDayData[] = PTTotalAllRoomsSelected.map((ptTotal) => {
        return { 
          date: ptTotal.curDate,
          display:ptTotal.utilization,
          subHeading1: ptTotal.totalptHours,
          subHeading2: ptTotal.totalnonptHours
        }
      })
      dispatch(setCalendarData(calendarData));
    }
    if (calendarSurgeonOption == CalendarMenuOptions.Selected && calendarRoomOption == CalendarMenuOptions.Selected) {
      console.log( 'calendar',  calendar);
      console.log('calendar PTHOurs', PTHoursFilterBoth);
      console.log('total hours', PTTotalBoth)
      const calendarData:CalendarDayData[] = PTTotalBoth.map((ptTotal) => {
        return { 
          date: ptTotal.curDate,
          display:ptTotal.utilization,
          subHeading1: ptTotal.totalptHours,
          subHeading2: ptTotal.totalnonptHours
        }
      })
      dispatch(setCalendarData(calendarData));
    }
    if (calendarSurgeonOption == CalendarMenuOptions.Selected && calendarRoomOption == CalendarMenuOptions.Mixed) {
      console.log( 'calendar',  calendar);
      console.log('calendar PTHOurs', PTHoursFilterBoth);
      console.log('total hours', PTTotalMixed)
      const calendarData:CalendarDayData[] = PTTotalMixed.map((ptTotal) => {
        return { 
          date: ptTotal.curDate,
          display:ptTotal.utilization,
          subHeading1: ptTotal.totalptHours,
          subHeading2: ptTotal.totalnonptHours
        }
      })
      dispatch(setCalendarData(calendarData));
    }
    }

  },[calendarRoomOption,calendarSurgeonOption,activeSurgeonList, activeRoomList,allPTHours])


  // useEffect(() => {
  //   dispatch(fetchCalendarDataAsync(unit, selectedDate));
  // }, [unit]);


  useEffect(() => {
    dispatch(fetchGridDataAsync(unit, selectedDate))
  }, [unit, selectedDate]);
  
  const setDetailData = (data:SummaryGridData) => {
    const room: FacilityRoom = {"name":data.id, "utilization":data.property}
    if (room.utilization !== '0%') {
      dispatch(setRoom(room))
      dispatch(fetchDetailDataAsync(unit, selectedDate,room))
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


  const calendarDropDownLeft: DropDownBox = {
    title: "Select Month",
    selected: month,
    menuItems: MonthMenuItems,
    disabled: true,
    onSelectItem:setMonth
  }

  const calendarDropDownRight: DropDownBox = {
    title: "Select Unit",
    selected: unit,
    menuItems: UnitMenuItems,
    disabled: false,
    onSelectItem:setSelectedUnit,
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
      selectedOption: calendarSurgeonMenus['None'][0],
      optionList:calendarSurgeonMenus['None'],
      onChange:updateCalendarSurgeons 
    }
    setSurgeonMenu(calendarSurgeonSelector)
    dispatch(setCalendarSurgeonOption(CalendarMenuOptions.All))
  } else {
    const calendarSurgeonSelector: SingleSelector<CalendarMenuItem> = {
      title: 'Surgeons',
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
      selectedOption: calendarRoomMenus['All'][1],
      optionList: calendarRoomMenus['All'],
      onChange:updateCalendarRooms
    }
    setRoomMenu(calendarRoomSelector);
    dispatch(setCalendarRoomOption(CalendarMenuOptions.Selected))
  }
},[allSurgeonsSelected, allRoomsSelected])
 





  return (
      <section className="utilization">
        <DetailsCard 
          title={"OR Utilization"} 
          header={detailsHeader}
          columns={detailsColHeader}
          data ={detailsData}
          onClosePopup={closeDetailsCard} 
          classIsOpen={`${popupOpen ? "open" : "close"}`}
          highlightItems={['Open Time']}
          pageSize={6} />
        <div className="patient__calendar">
          {surgeonMenu && roomMenu && <Calendar
            title={unit}
            calendarData={calendarData}
            selectedDate={selectedDate}
            list1={surgeonMenu}
            list2={roomMenu}
            // dropDownLeft={calendarDropDownLeft}
            // dropDownRight= {calendarDropDownRight}
            hiddenID={hiddenIDs}
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
            buttonText={'Details'}
            pageSize={18}
          ></SummaryGrid>
        </div>
      </section>
  );
};

export default Utilization;
