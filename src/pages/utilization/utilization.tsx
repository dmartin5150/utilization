import React, { useEffect, useState } from "react";
import getFinCareTeam from "../../utilities/fin-data";
import getDischargeData from "../../utilities/git-discharge-data";
import getCareTeam from "../../utilities/careteam";
import SummaryGrid from "../../components/summary-grid/summary-grid";
import Calendar from "../../components/calendar/calendar";
import { CalendarData } from "../../components/calendar/calendar";
import DetailsCard from "../../components/team-card/details-card";
import "./utilization.scss";
import {testData} from "../../data/test-admission-data"
import { testGridData } from "../../data/test-grid-data";
import { DetailsData } from "../../components/team-card/details-card";
import sayHello from "../../utilities/sayHello";
import getCalendar from "../../utilities/getCalendar";
import getGridData from "../../utilities/getGridData";
import { SummaryGridData } from "../../components/summary-grid/summary-grid";
import getDetails from "../../utilities/getDetails";




const Utilization = () => {
  const [finCareTeam, setFinCareTeam] = useState([]);
  const [dischargeData, setDischargeData] = useState([]);
  const [detailsData, setDetailsData] = useState<DetailsData[]>([]);
  const [currentDetailDate, setCurrentDetailDate] = useState("0");
  const [selectedDate, setSelectedDate] = useState('2023-06-01');
  const [calendarData, setCalendarData] = useState<CalendarData[]>([])
  const [gridData, setGridData] = useState<SummaryGridData[]>([])
  const [popupOpen, setPopupOpen] = useState(false);
  const [unit, setUnit]= useState('BH JRI')
  



  useEffect(() => {
    const getCalendarData = async(unit:string, date:string) => {
       let data = await getCalendar(unit, date)
       if (data) {
        setCalendarData(data)
       }
    }
    getCalendarData(unit, selectedDate)
  }, [unit]);

  useEffect(() => {
    const getGridInfo = async(unit:string, date:string) => {
       let data = await getGridData(unit, date)
       if (data) {
        setGridData(data)
       }
    }
    getGridInfo(unit, selectedDate)
  }, [selectedDate]);
  


  useEffect(() => {
    const getDetailInfo = async (unit:string, date:string, room:string) => {
      // const careTeam = await getCareTeam(currentFin);
      const details = await getDetails(unit,date,room)
      // const careTeam:DetailsData[] = [{'id': '1', 'col1': 'Kurtz', 'col2': 'Appy', 'col3': '9:00 AM', 'col4': '10:00 AM', 'col5':'60 minutes'}]
      if (details) {
        setDetailsData(details);
      }
    };
    if (currentDetailDate === '0'){
      return;
    }
    getDetailInfo(unit, selectedDate,currentDetailDate);
  }, [unit, currentDetailDate]);

  useEffect(() => {
    if (!popupOpen) {
      setCurrentDetailDate("0");
    }
  }, [popupOpen]);

  useEffect(() => {
    // console.log("care team", careTeamData);
    if (detailsData.length) {
      setPopupOpen(true);
    }
  }, [detailsData]);


  // interface CareTeam {
  //   id: string,
  //   name:string,
  //   fin: string,
  //   size: string
  // }


  // const mappedCareTeam = (data:CareTeam[]) => {
  //   const mappedData = data.map((item: CareTeam) => {
  //     return { id: item.fin, name: item.fin, size: item.size };
  //   });
  //   return mappedData;
  // };

  // useEffect(() => {
  //   const getFinData = async () => {
  //     const finData = await getFinCareTeam(selectedDate);
  //     const mappedFinData = mappedCareTeam(finData);
  //     setFinCareTeam(mappedFinData);
  //   };
  //   getFinData();
  // }, [selectedDate]);

  // useEffect(() => {
  //   const getDischarge = async () => {
  //     const dcData = await getDischargeData();
  //     setDischargeData(dcData);
  //   };
  //   getDischarge();
  // }, []);


  // [{'id': '1', 'col1': 'Kurtz','col2':'Appy', 'col3': '9:00 AM', 'col4': '10:00 AM', 'col5':'60 minutes'}]

  return (
      <section className="utilization">
        <DetailsCard 
          title={"OR Utilization"} 
          header={{'col1':'JRI 1','col2':selectedDate, 'col3':'Utilization 10%', 'col4': ''}}
          columns={{'col1':'Surgeon', 'col2':'Procedure', 'col3': 'Start Time', 'col4':'End Time', 'col5':'Duration'}}
          data ={detailsData}
          onClosePopup={setPopupOpen} 
          classIsOpen={`${popupOpen ? "open" : "close"}`}
          pageSize={4} />
        <div className="patient__calendar">
          <Calendar
            title={"TNNAS OR Utilization Data: JRI"}
            calendarData={calendarData}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            pageSize={15}
          />
        </div>


        <div className="patient__info">
          <SummaryGrid
            data={gridData}
            title={`JRI Room Data: ${selectedDate}`}
            onSelectItem={setCurrentDetailDate}
            firstColumnName={'Room'}
            secondColumnName={'Utilization'}
            buttonText={'Details'}
            pageSize={10}
          ></SummaryGrid>
        </div>
      </section>
  );
};

export default Utilization;
