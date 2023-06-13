import React, { useEffect, useState } from "react";
import getFinCareTeam from "../../utilities/fin-data";
import getDischargeData from "../../utilities/git-discharge-data";
import getCareTeam from "../../utilities/careteam";
import SummaryGrid from "../../components/summary-grid/summary-grid";
import Calendar from "../../components/calendar/calendar";
import DetailsCard from "../../components/team-card/details-card";
import "./utilization.scss";
import {testData} from "../../data/test-admission-data"
import { testGridData } from "../../data/test-grid-data";
import { DetailsData } from "../../components/team-card/details-card";





const Utilization = () => {
  const [finCareTeam, setFinCareTeam] = useState([]);
  const [dischargeData, setDischargeData] = useState([]);
  const [careTeamData, setCareTeamData] = useState<DetailsData[]>([]);
  const [currentDetailID, setCurrentDetailID] = useState("0");
  const [selectedDate, setSelectedDate] = useState('8/1/2022');
  const [popupOpen, setPopupOpen] = useState(true);

  useEffect(() => {
    const updateCareTeam = async (currentFin:string) => {
      // const careTeam = await getCareTeam(currentFin);
      const careTeam:DetailsData[] = [{'id': '1', 'col1': 'Kurtz', 'col2': '9:00 AM', 'col3': '10:00 AM', 'col4':'60 minutes'}]
      setCareTeamData(careTeam);
    };
    if (currentDetailID === '0'){
      return;
    }
    updateCareTeam(currentDetailID);
  }, [currentDetailID]);

  useEffect(() => {
    if (!popupOpen) {
      setCurrentDetailID("0");
    }
  }, [popupOpen]);

  useEffect(() => {
    console.log("care team", careTeamData);
    if (careTeamData.length) {
      setPopupOpen(true);
    }
  }, [careTeamData]);


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

  useEffect(() => {
    const getDischarge = async () => {
      const dcData = await getDischargeData();
      setDischargeData(dcData);
    };
    getDischarge();
  }, []);




  return (
      <section className="utilization">
        <DetailsCard 
          title={"OR Utilization"} 
          header={{'col1':'JRI 1','col2':selectedDate, 'col3':'Utilization 10%', 'col4': ''}}
          columns={{'col1':'Surgeon', 'col2': 'Start Time', 'col3':'End Time', 'col4':'Duration'}}
          data ={[{'id': '1', 'col1': 'Kurtz', 'col2': '9:00 AM', 'col3': '10:00 AM', 'col4':'60 minutes'}]}
          onClosePopup={setPopupOpen} 
          classIsOpen={`${popupOpen ? "open" : "close"}`}
          pageSize={4} />
        <div className="patient__calendar">
          <Calendar
            title={"TNNAS OR Utilization Data: JRI"}
            calendarData={testData}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            pageSize={15}
          />
        </div>


        <div className="patient__info">
          <SummaryGrid
            data={testGridData}
            title={`JRI Room Data: ${selectedDate}`}
            onSelectItem={setCurrentDetailID}
            firstColumnName={'Room'}
            secondColumnName={'Utilization'}
            pageSize={10}
          ></SummaryGrid>
        </div>
      </section>
  );
};

export default Utilization;
