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
import { selectAllBlockforCalendar } from "../../store/Block/selectors/calendar.selector";


const Block = () => {
    const [surgeonMenu, setSurgeonMenu] = useState<SingleSelector<CalendarMenuItem>>()


    const dispatch = useAppDispatch();
    const unit = useSelector(selectUnit);
    const selectedDate = useSelector(selectDate);
    const npis = useSelector(selectActiveSurgeonNPIs)
    const blockGridData = useSelector(selectBlockGrid)
    const allBlockCalendar = useSelector(selectAllBlockforCalendar)


    useEffect(()=> {
        dispatch(fetchBlockDataAsync('BH JRI',true,'2023-7-1',['1548430291']))
    },[])


    useEffect(() => {
        if (blockGridData && blockGridData.length > 0 ){
            console.log('all block calendar', allBlockCalendar)
        }
    },[blockGridData])



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
            {/* <Calendar
                title={unit}
                calendarData={calendarData}
                calendarTotals={calendarTotals}
                selectedDate={selectedDate}
                list1={surgeonMenu}
                list2={roomMenu}
                hiddenID={hiddenIDs}
                onDateChange={setSelectedDate}
                pageSize={30}
            /> */}
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