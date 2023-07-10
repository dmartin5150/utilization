import React, {useEffect,useState} from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { useSelector } from "react-redux";
import { fetchBlockDataAsync } from "../../store/Block/block.actions";
import DetailsCard from "../../components/team-card/details-card";
import SummaryGrid from "../../components/summary-grid/summary-grid";
import Calendar from "../../components/calendar/calendar";
import selectUnit from "../../components/selectUnits/SelectUnit";
import { selectDate } from "../../store/Facility/facility.selector";
import { SingleSelector } from "../../components/SelectorList/SelectorList";
import { CalendarMenuItem } from "./utilization.constants";


const Rooms = () => {
    const [surgeonMenu, setSurgeonMenu] = useState<SingleSelector<CalendarMenuItem>>()


    const dispatch = useAppDispatch();
    const unit = useSelector(selectUnit);
    const selectedDate = useSelector(selectDate);


    useEffect(()=> {
        dispatch(fetchBlockDataAsync('BH JRI',true,'2023-7-1',['1548430291']))
    })

    return (
        <section className="utilization">
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
            <div className="patient__calendar">
            <Calendar
                title={unit}
                calendarData={calendarData}
                calendarTotals={calendarTotals}
                selectedDate={selectedDate}
                list1={surgeonMenu}
                list2={roomMenu}
                hiddenID={hiddenIDs}
                onDateChange={setSelectedDate}
                pageSize={30}
            />
            </div>
            <div className="patient__info">
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
export default Rooms;