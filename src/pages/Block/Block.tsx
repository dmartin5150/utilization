import React, {useEffect,useState} from "react";
import "./Block.scss"
import { useAppDispatch } from "../../hooks/hooks";
import { useSelector } from "react-redux";
import { fetchBlockDataAsync } from "../../store/Block/block.actions";
import DetailsCard from "../../components/team-card/details-card";
import SummaryGrid from "../../components/summary-grid/summary-grid";
import Calendar from "../../components/calendar/calendar";
import { selectUnit } from "../../store/Facility/facility.selector";
import { selectDate } from "../../store/Facility/facility.selector";
import { SingleSelector } from "../../components/SelectorList/SelectorList";
import { CalendarMenuItem } from "../utilization/utilization.constants";
import { BlockList } from "net";
import { selectActiveSurgeonNPIs } from "../../store/ORData/selectors/ordata.selector";
import { selectBlockGrid } from "../../store/Block/selectors/calendar.selector";
import { selectAllBlockforCalendar,selectInBlockforCalendar,selectOutBlockforCalendar } from "../../store/Block/selectors/calendar.selector";
import { selectAllBlockforGrid, selectInBlockforGrid,selectOutBlockforGrid } from "../../store/Block/selectors/grid.selector";
import { selectAllBlockDetailsDay, selectInBlockDetailsDay, selectOutBlockDetailsDay } from "../../store/Block/selectors/details.selector";
import { setSelectedBlockDate } from "../../store/Block/block.actions";
import { selectAllSurgeonsSelected } from "../../store/ORData/selectors/ordata.selector";
import { calendarSurgeonMenus } from "../utilization/utilization.constants";
import Select,{SingleValue} from "react-select";
import { CalendarMenuOptions } from "../utilization/utilization.constants";
import { setCalendarSurgeonOption,setCalendarRoomOption } from "../../store/ORData/actions/calendar.actions";
import { calendarRoomMenus } from "../utilization/utilization.constants";
import { selectAllRoomsSelected } from "../../store/ORData/selectors/ordata.selector";
import { selectBlockDate } from "../../store/Block/selectors/details.selector";

const Block = () => {
    const [surgeonMenu, setSurgeonMenu] = useState<SingleSelector<CalendarMenuItem>>()
    const [roomMenu, setRoomMenu] = useState<SingleSelector<CalendarMenuItem>>()


    const dispatch = useAppDispatch();
    const unit = useSelector(selectUnit);
    const selectedDate = useSelector(selectBlockDate);
    const npis = useSelector(selectActiveSurgeonNPIs);
    const blockGridData = useSelector(selectBlockGrid);
    const allBlockCalendar = useSelector(selectAllBlockforCalendar);
    const inBlockCalendar = useSelector(selectInBlockforCalendar);
    const outBlockCalendar = useSelector(selectOutBlockforCalendar)
    const allBlockGrid = useSelector(selectAllBlockforGrid);
    const inBlockGrid = useSelector(selectInBlockforGrid);
    const outBlockGrid = useSelector(selectOutBlockforGrid);
    const allDetails = useSelector(selectAllBlockDetailsDay);
    const inDetails = useSelector(selectInBlockDetailsDay);
    const outDetails = useSelector(selectOutBlockDetailsDay);
    const allSurgeonsSelected = useSelector(selectAllSurgeonsSelected);
    const allRoomsSelected = useSelector(selectAllRoomsSelected);

    


    useEffect(()=> {
        dispatch(fetchBlockDataAsync('BH JRI',true,'2023-7-1',['1548430291']))
    },[])

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








    useEffect(() => {
        if (blockGridData && blockGridData.length > 0 ){
            // console.log('all block calendar', allBlockCalendar)
            // console.log('in block calendar', inBlockCalendar)
            // console.log('out block calendar', outBlockCalendar)
            // console.log('all grid', allBlockGrid);
            // console.log('in block grid', inBlockGrid);
            // console.log('out block grid', outBlockGrid)
            // console.log('all details', allDetails )
            // console.log('in details', inDetails);
            // console.log('out details', outDetails)
        }
    },[blockGridData])


    const setBlockDate = (date:string) => {
        dispatch(setSelectedBlockDate(date));
    }

    return (
        <section className="blocks">
            {/* <DetailsCard 
            title={"OR Utilization"} 
            header={detailsHeader}
            columns={detailsColHeader}
            highLightItemsGreen={activeNPIs}
            data ={detailsData}
            onClosePopup={closeDetailsCard} 
            classIsOpen={`${popupOpen ? "open" : "close"}`}
            highLightItemsRed={['Open Time']}
            subHeaderData={blockData}
            pageSize={6} /> */}
            <div className="block__calendar">
            {surgeonMenu && roomMenu && <Calendar
                title={unit}
                calendarData={allBlockCalendar}
                calendarTotals={[]}
                selectedDate={selectedDate}
                list1={surgeonMenu}
                list2={roomMenu}
                hiddenID={[]}
                onDateChange={setBlockDate}
                pageSize={30}
            />}
            </div>
            <div className="block__info">
            {/* <SummaryGrid
                data={gridData}
                title={`${unit} Room Data: ${selectedDate}`}
                onSelectItem={setDetailData}
                firstColumnName={'Room'}
                secondColumnName={'Utilization'}
                buttonText={'Details'}
                pageSize={18}
            ></SummaryGrid> */}
            </div>
        </section>
    );
}
export default Block;