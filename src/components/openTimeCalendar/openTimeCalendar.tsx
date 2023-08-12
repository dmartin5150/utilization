import React, {useState, useEffect} from "react";
import Calendar from "../calendar/calendar";
import { useSelector } from "react-redux";
import { selectUnit } from "../../store/Facility/facility.selector";
import { selectOpenTimeDate } from "../../store/Facility/facility.selector";
import { CalendarDayData } from "../calendar/calendarDay";
import { selectDataStartDate,selectDataEndDate,selectDataCurrentDate } from "../../store/ORData/selectors/ordata.selector";
import { DataDateRange } from "../../components/calendar/calendar";
import { CalendarMenuItem } from "../../pages/utilization/utilization.constants";
import { SingleSelector } from "../SelectorList/SelectorList";
import { selectOpenTimeRoomList } from "../../store/Facility/facility.selector";
import { selectOpenTimeRoom } from "../../store/Facility/facility.selector";
import {SingleValue} from "react-select";
import { setSelectedOpenTimeRoom } from "../../store/Facility/facilty.actions";
import { useAppDispatch } from "../../hooks/hooks";
import { OpenTimeTypes, } from "../../store/Facility/facility.types";
import { selectOpenTimeType } from "../../store/Facility/facility.selector";
import { setSelectedTimeType } from "../../store/Facility/facilty.actions";
import { getPreviousDate,getNextDate } from "../../utilities/dates/dates";
import { MonthChangeDirection } from "../calendar/calendar";
import { setDataCurrentDate } from "../../store/ORData/actions/calendar.actions";
import { setSelectedOpenTimeDate } from "../../store/Facility/facilty.actions";


export interface OpenTimeCalendarProps {
    calendarData: CalendarDayData[]
}


const OpenTypeOptions:CalendarMenuItem[] = [
    {id:0, label:OpenTimeTypes.all, value:OpenTimeTypes.all},
    {id:1, label:OpenTimeTypes.block, value:OpenTimeTypes.block},
    {id:2, label:OpenTimeTypes.open, value:OpenTimeTypes.open}
]


const OpenTimeCalendar: React.FC<OpenTimeCalendarProps> = ({calendarData}) => {

    const [openRoomMenu, setOpenRoomMenu] = useState<SingleSelector<CalendarMenuItem>>()
    const [openTypeMenu, setOpenTypeMenu] = useState<SingleSelector<CalendarMenuItem>>()
    const [openRoomOptions, setOpenRoomOptions] = useState<CalendarMenuItem[]>([{id:0, label: 'All', value:'All'}])



    const selectedUnit = useSelector(selectUnit)
    const selectedDate = useSelector(selectOpenTimeDate)
    const dataStartDate = useSelector(selectDataStartDate)
    const dataEndDate = useSelector(selectDataEndDate)
    const dataCurrentDate = useSelector(selectDataCurrentDate)
    const openTimeRoomList = useSelector(selectOpenTimeRoomList)
    const selectedRoom = useSelector(selectOpenTimeRoom)
    const selectedType = useSelector(selectOpenTimeType)

    const dispatch = useAppDispatch()


    const currentDateRange:DataDateRange = {
        startDate: dataStartDate,
        endDate: dataEndDate,
        currentDate:dataCurrentDate
      }



      const updateOpenTypeMenu = (option: SingleValue<CalendarMenuItem>) => {
        if (option){
            dispatch(setSelectedTimeType(option.label as OpenTimeTypes))
        }
      }


      useEffect(()=> {

        if (selectedType){
            let curIndex = OpenTypeOptions.findIndex((type) => type.label === selectedType)
            if (curIndex === -1) {
                curIndex = 0
            }
            const calendarOpenTypeSelector: SingleSelector<CalendarMenuItem> = {
                'title': 'Types', 
                isDisabled: false,
                showBorder:false,
                selectedOption: OpenTypeOptions[curIndex],
                optionList: OpenTypeOptions,
                onChange:updateOpenTypeMenu
            }
            setOpenTypeMenu(calendarOpenTypeSelector);
        }
      },[selectedType])



      useEffect(()=> {
        if (openTimeRoomList && openTimeRoomList.length !== 0) {
            const OpenRoomOptions: CalendarMenuItem[] = [{id:0, label: 'All', value:'All'}]
            openTimeRoomList.forEach((item,index) => {
                const curItem = {'id':index+1, 'label':item.name, 'value':item.name }
                OpenRoomOptions.push(curItem)
            })
            setOpenRoomOptions(OpenRoomOptions)
        }
      },[openTimeRoomList])


      const updateOpenRoomMenu = (option: SingleValue<CalendarMenuItem>) => {
        if (option){
            dispatch(setSelectedOpenTimeRoom(option))
        }
      }


      useEffect(()=> {
        if (openRoomOptions && openRoomOptions.length !== 0){
            let selectedIndex = openRoomOptions.findIndex((option) => option.label === selectedRoom)
            if (selectedIndex === -1) {
                selectedIndex = 0
            }
            const calendarOpenRoomSelector: SingleSelector<CalendarMenuItem> = {
                'title': 'Rooms', 
                isDisabled: false,
                showBorder:false,
                selectedOption: openRoomOptions[selectedIndex],
                optionList: openRoomOptions,
                onChange:updateOpenRoomMenu
            }
            setOpenRoomMenu(calendarOpenRoomSelector);
        }

      },[openRoomOptions,selectedRoom])


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


    const setOpenTimeDate = (date:string) => {
        dispatch(setSelectedOpenTimeDate(date));
    } 

    return (
        <div>
            {openRoomMenu && openTypeMenu &&  <Calendar 
                title={'Open Times'} 
                subTitle={selectedUnit} 
                selectedDate={selectedDate}
                calendarData={calendarData}
                dataDateRange={currentDateRange}
                list1={openRoomMenu}
                list2={openTypeMenu}
                onMonthChange={onMonthChange}
                onDateChange={setOpenTimeDate}
                pageSize={30}
            />}
        </div>)
}
        
export default OpenTimeCalendar;