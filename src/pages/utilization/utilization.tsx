import React, { useEffect, useState } from "react";
import SummaryGrid from "../../components/summary-grid/summary-grid";
import Calendar from "../../components/calendar/calendar";
import DetailsCard from "../../components/team-card/details-card";
import "./utilization.scss";
import { DetailsData } from "../../components/team-card/details-card";
import { SummaryGridData } from "../../components/summary-grid/summary-grid";
import getDetails from "../../utilities/getDetails";
import { useSelector } from "react-redux";
import { selectCalendarData, selectGridData } from "../../store/ORData/ordata.selector";
import { fetchCalendarDataAsync } from "../../store/ORData/actions/calendar.actions";
import { fetchGridDataAsync } from "../../store/ORData/actions/grid.actions";
import { useAppDispatch } from "../../hooks/hooks";






const Utilization = () => {
  const [detailsData, setDetailsData] = useState<DetailsData[]>([]);
  const [currentDetailData, setCurrentDetailData] = useState<SummaryGridData>({"id":"0","name":"0","property":"0"});
  const [selectedDate, setSelectedDate] = useState('2023-06-01');
  // const [gridData, setGridData] = useState<SummaryGridData[]>([])
  const [popupOpen, setPopupOpen] = useState(false);
  const [unit, setUnit]= useState('MT OR')
  const [month, setMonth] = useState('June')
  

  const hiddenIDs = ["0","1","2","3","4"]
  const UnitMenuItems = ['BH JRI','STM ST OR', 'MT OR']
  const MonthMenuItems = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
                          'August', 'September', 'October', 'November', 'December']

  const dispatch = useAppDispatch();
  
  const calendarData = useSelector(selectCalendarData);
  const gridData = useSelector(selectGridData)

  useEffect(() => {
    dispatch(fetchCalendarDataAsync());
  }, [unit]);

  useEffect(() => {
    dispatch(fetchGridDataAsync())
  }, [unit, selectedDate]);
  


  useEffect(() => {
    const getDetailInfo = async (unit:string, date:string, room:string) => {
      const details = await getDetails(unit,date,room)
      if (details) {
        setDetailsData(details);
      }
    };
    if (currentDetailData.name === '0'){
      return;
    }
    getDetailInfo(unit, selectedDate,currentDetailData.name);
  }, [unit, currentDetailData]);

  useEffect(() => {
    if (!popupOpen) {
      setCurrentDetailData({"id":"0","name":"0","property":"0"});
    }
  }, [popupOpen]);

  useEffect(() => {
    if (detailsData.length) {
      setPopupOpen(true);
    }
  }, [detailsData]);


 

  return (
      <section className="utilization">
        <DetailsCard 
          title={"OR Utilization"} 
          header={{'col1':currentDetailData.name,'col2':selectedDate, 'col3':`Utilization ${currentDetailData.property}`, 'col4': ''}}
          columns={{'col1':'Surgeon', 'col2':'Procedure', 'col3': 'Start Time', 'col4':'End Time', 'col5':'Duration'}}
          data ={detailsData}
          onClosePopup={setPopupOpen} 
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
            onSelectItem={setCurrentDetailData}
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
