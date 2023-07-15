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
import { SummaryGridRowData } from "../../components/summary-grid/summary-grid-row";
import { FacilityRoom } from "../../store/Facility/facitlity.reducer";
import { setSelectedBlockRoom } from "../../store/Block/block.actions";
import { selectBlockRoom } from "../../store/Block/selectors/details.selector";
import { DetailsHeader } from "../../components/team-card/details-card-header";
import { GridNames } from "../../components/team-card/details-grid";
import BlockDetailCards, { BlockDetailCard } from "../../components/blockdetails/blockDetailCards";
import { DetailsSummary, BlockDetailHeader, DetailsSubHeader,BlockProcedure } from "../../store/Block/block.types";
import { DetailsSubHeaderData } from "../../components/team-card/details-subheader";
import { DetailsData } from "../../components/team-card/details-card";
import { setBlockPopUpOpen } from "../../store/Block/block.actions";
import { selectBlockPopUpIsOpen } from "../../store/Block/selectors/details.selector";
import { calendarBlockRoomMenus } from "./block.constants";
import { CalendarDayData } from "../../components/calendar/calendarDay";
import { selectBlockCalendarData, selectBlockCalendarTotals } from "../../store/Block/selectors/calendar.selector";
import { setBlockCalendarData, setBlockCalendarTotals } from "../../store/Block/block.actions";
import { selectPTHours } from "../../store/ORData/selectors/ordata.selector";
import { selectBlockLists } from "../../store/Block/selectors/calendar.selector";
import { selectCalculatedTotals } from "../../store/Block/selectors/calendar.selector";
import { setBlockCards } from "../../store/Block/block.actions";
import { selectBlockCards } from "../../store/Block/selectors/details.selector";
import { selectRoomOption} from "../../store/Block/selectors/calendar.selector";
import { setBlockRoomOption } from "../../store/Block/block.actions";
import { selectActiveSurgeons } from "../../store/ORData/selectors/ordata.selector";





const Block = () => {
    const [surgeonMenu, setSurgeonMenu] = useState<SingleSelector<CalendarMenuItem>>()
    const [roomMenu, setRoomMenu] = useState<SingleSelector<CalendarMenuItem>>()
    // const [roomStatus, setRoomStatus] = useState<CalendarMenuOptions>()




    const dispatch = useAppDispatch();

    const unit = useSelector(selectUnit);
    const blockLists = useSelector(selectBlockLists)
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
    const blockRoom = useSelector(selectBlockRoom);
    const blockPopUpIsOpen = useSelector(selectBlockPopUpIsOpen);
    const blockCalendarData = useSelector(selectBlockCalendarData);
    const blockCalendarTotals = useSelector(selectBlockCalendarTotals)
    const ptHours = useSelector(selectPTHours)
    const calculatedTotals = useSelector(selectCalculatedTotals);
    const blockCards = useSelector(selectBlockCards);
    const roomOption = useSelector(selectRoomOption);
    const activeSurgeons = useSelector(selectActiveSurgeons)

    useEffect(()=> {
        console.log('triggered')
        console.log('unit', unit, 'npis', npis, 'selected', allSurgeonsSelected)
        if (unit && npis) {
            dispatch(fetchBlockDataAsync(unit,allSurgeonsSelected,'2023-7-1',npis))

        }

    },[unit,npis,allSurgeonsSelected]);
    



    useEffect(()=> {
        if (blockCalendarData && blockCalendarData.length >0) {
            dispatch(setBlockCalendarTotals(calculatedTotals))
        }
    },[blockCalendarData])

 

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
        console.log('menu', calendarSurgeonSelector)
        } else {
            const calendarSurgeonSelector: SingleSelector<CalendarMenuItem> = {
                title: 'Surgeons',
                selectedOption: calendarSurgeonMenus['Selected'][0],
                optionList:calendarSurgeonMenus['Selected'],
                onChange:updateCalendarSurgeons 
            }
            console.log('menu', calendarSurgeonSelector)
            setSurgeonMenu(calendarSurgeonSelector)
            dispatch(setCalendarSurgeonOption(CalendarMenuOptions.Selected))
        }
    },[allSurgeonsSelected])


  useEffect (() => {
    // if (allBlockCalendar && allBlockCalendar.length > 0) {
        if (roomOption == CalendarMenuOptions.All) {
            dispatch(setBlockCalendarData(allBlockCalendar))
        }
        if (roomOption == CalendarMenuOptions.In) {
            dispatch(setBlockCalendarData(inBlockCalendar))
        }
        if (roomOption == CalendarMenuOptions.Out) {
            dispatch(setBlockCalendarData(outBlockCalendar))      
        }
    // }
  }, [allBlockCalendar,roomOption ])


  

 


    const updateCalendarRooms = (option: SingleValue<CalendarMenuItem>) => {
        console.log('room menu',roomMenu)
        if (option) {
            dispatch(setBlockRoomOption(option.value as CalendarMenuOptions))
        }
      }

    //   const roomMenu: SingleSelector<CalendarMenuItem> = {
    //     title: 'Rooms',
    //     // isDisabled:true,
    //     selectedOption: calendaBlockRoomMenus['All'][0],
    //     optionList: calendaBlockRoomMenus['All'],
    //     onChange:updateCalendarRooms
    //     }

      
      useEffect(()=> {
        console.log('triggered Menu')
        const calendarRoomSelector: SingleSelector<CalendarMenuItem> = {
            title: 'Rooms',
            isDisabled: false,
            selectedOption: calendarBlockRoomMenus['All'][0],
            optionList: calendarBlockRoomMenus['All'],
            onChange:updateCalendarRooms
            }
            console.log('setting menu', calendarRoomSelector)
            setRoomMenu(calendarRoomSelector);
            dispatch(setBlockRoomOption(CalendarMenuOptions.All))

      },[])








      const onClosePopup = () => {
        // console.log('room menu popup', roomMenu)
        dispatch(setBlockPopUpOpen(false))
        // console.log('room menu popup', roomMenu)
      }

    const detailsColHeader:GridNames = {'col1':'Surgeon', 'col2':'Procedure', 'col3': 'Start Time', 'col4':'End Time', 'col5':'Room'}

    const getDetailCardHeader = (data:BlockDetailHeader):DetailsHeader => {
        return {'col1': data.room, 'col2': data.utilization, 'col3': data.blockDate, 'col4':''}
    }

    const getDetailCardSubHeader = (data:DetailsSubHeader):DetailsSubHeaderData[] => {
        return [{'name':data.name, 'startTime': data.startTime, 'endTime': data.endTime, 'releaseDate': data.releaseDate}]
    }

    const getDetailsProcsArray = (data:BlockProcedure[]):DetailsData[] => {
        return data.map((procedure, idx) => {
            return ({
                'id': idx.toString(),
                'col1': procedure.fullName, 
                'col2': procedure.procedureName, 
                'col3':procedure.local_start_time,
                'col4': procedure.local_end_time,
                'col5': procedure.room
            })
        })
    }

    const getCardDetails = ():DetailsSummary[] => {
        console.log('room', roomOption)
        if (roomOption == CalendarMenuOptions.All) {
            console.log('in 1')
            return allDetails
        }
        if (roomOption == CalendarMenuOptions.In) {
            console.log('in 2')
            return inDetails
        }
        if (roomOption == CalendarMenuOptions.Out) {
            console.log('in 3')
            return outDetails
        }
        return allDetails
      }

      useEffect (() => {
        if (blockPopUpIsOpen) {
            const details = getCardDetails()
            const blockCards:BlockDetailCard[] = details.map((detail) => {
                const header = getDetailCardHeader(detail.header);
                const subHeader = getDetailCardSubHeader(detail.subHeader);
                const procs = getDetailsProcsArray(detail.procs);
                let blockDetailCard:BlockDetailCard;
                return blockDetailCard = {
                    title: 'Block Data',
                    header: header, // 4 col strings
                    columns: detailsColHeader, // 5 col strings
                    highLightItemsGreen:[],
                    data:procs,
                    popUpOpen: true,
                    classIsOpen: 'open',
                    highLightItemsRed: [],
                    subHeaderData:subHeader,
                    pageSize: 6
                  }
            })
            dispatch(setBlockCards(blockCards))
            console.log('after', roomMenu)
        }
    },[roomOption,blockPopUpIsOpen]);



     


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
    },[blockGridData,selectedDate])


    const setBlockDate = (date:string) => {
        dispatch(setSelectedBlockDate(date));
    }





    const setDetailData = (data:SummaryGridRowData) => {
        const room: FacilityRoom = {"name":data.id, "utilization":data.utilization}
        console.log(data.procedures)
        if (data.procedures !== '0H: 0M') {
          dispatch(setSelectedBlockRoom(room.name))
          dispatch(setBlockPopUpOpen(true))
        }
      }


    return (
        <section className="blocks">
            <BlockDetailCards 
                blockCards={blockCards} 
                classIsOpen={`${blockPopUpIsOpen ? "open" : "close"}`}
                onCloseBlockDetails={onClosePopup} 
                cardsPageSize={1} />
            <div className="block__calendar">
            {surgeonMenu && roomMenu && <Calendar
                title='TNNAS BLOCK UTILIZATION DATA'
                subTitle={unit}
                calendarData={blockCalendarData}
                calendarTotals={blockCalendarTotals}
                selectedDate={selectedDate}
                list1={surgeonMenu}
                list2={roomMenu}
                hiddenID={[]}
                onDateChange={setBlockDate}
                pageSize={30}
            />}
            </div>
            <div className="block__info">
            <SummaryGrid
                data={allBlockGrid}
                title={`${unit} Room Block Data: ${selectedDate}`}
                onSelectItem={setDetailData}
                firstColumnName={'Room'}
                secondColumnName={'Utilization'}
                buttonText={'Details'}
                pageSize={18}
            ></SummaryGrid>
            </div>
        </section>
    );
}
export default Block;