import React, { useEffect, useState } from "react";
import SummaryGrid from "../../components/summary-grid/summary-grid";
import Calendar from "../../components/calendar/calendar";
import DetailsCard from "../../components/team-card/details-card";
import "./utilization.scss";
import { useSelector } from "react-redux";
import { selectCalendarData, selectDetailData, selectGridData, selectPopUpIsOpen } from "../../store/ORData/ordata.selector";
import { fetchCalendarDataAsync } from "../../store/ORData/actions/calendar.actions";
import { fetchGridDataAsync } from "../../store/ORData/actions/grid.actions";
import { fetchDetailDataAsync, closePopUp } from "../../store/ORData/actions/details.actions";
import { useAppDispatch } from "../../hooks/hooks";




const Utilization = () => {
  const [selectedDate, setSelectedDate] = useState('2023-06-01');
  const [unit, setUnit]= useState('MT OR')
  const [month, setMonth] = useState('June')
  

  const hiddenIDs = ["0","1","2","3","4"]
  const UnitMenuItems = ['BH JRI','STM ST OR', 'MT OR']
  const MonthMenuItems = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
                          'August', 'September', 'October', 'November', 'December']

  const dispatch = useAppDispatch();


  const calendarData = useSelector(selectCalendarData);
  const gridData = useSelector(selectGridData)
  const detailsData = useSelector(selectDetailData)
  const popupOpen = useSelector(selectPopUpIsOpen);

  useEffect(() => {
    dispatch(fetchCalendarDataAsync());
  }, [unit]);

  useEffect(() => {
    dispatch(fetchGridDataAsync())
  }, [unit, selectedDate]);
  
  const setDetailData = () => {
    dispatch(fetchDetailDataAsync())
  }

  const closeDetailsCard = () => {
    dispatch(closePopUp());
  }

  return (
      <section className="utilization">
        <DetailsCard 
          title={"OR Utilization"} 
          header={{'col1':'BH JRI','col2':selectedDate, 'col3':`Utilization 10%`, 'col4': ''}}
          columns={{'col1':'Surgeon', 'col2':'Procedure', 'col3': 'Start Time', 'col4':'End Time', 'col5':'Duration'}}
          data ={detailsData}
          onClosePopup={closeDetailsCard} 
          classIsOpen={`${popupOpen ? "open" : "close"}`}
          highlightItems={['Open Time']}
          pageSize={6} />
        <div className="patient__calendar">
          <Calendar
            title={unit}
            calendarData={calendarData}
            selectedDate={selectedDate}
            menuItemsLeft={MonthMenuItems}
            menuItemsRight={UnitMenuItems}
            dropDownLeftTitle="Select Month"
            dropDownRightTitle="Select Unit"
            selectedItemLeft={month}
            selectedItemRight={unit}
            onDateChange={setSelectedDate}
            onSelectItemLeft={setMonth}
            onSelectItemRight={setUnit}
            disableLeft={true}
            disableRight={false}
            hiddenID={hiddenIDs}
            pageSize={30}
          />
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
