import React, { useEffect, useState } from "react";
import getFinCareTeam from "../../utilities/fin-data";
import getDischargeData from "../../utilities/git-discharge-data";
import getCareTeam from "../../utilities/careteam";
import SummaryGrid from "../../components/summary-grid/summary-grid";
import Calendar from "../../components/calendar/calendar";
// import TeamCard from "../../components/team-card/team-card-component";
import "./utilization.scss";
import {testData} from "../../data/test-admission-data"
import { testGridData } from "../../data/test-grid-data";





const Utilization = () => {
  const [finCareTeam, setFinCareTeam] = useState([]);
  const [dischargeData, setDischargeData] = useState([]);
  const [careTeamData, setCareTeamData] = useState<CareTeam[]>([]);
  const [currentFin, setCurrentFin] = useState("0");
  const [selectedDate, setSelectedDate] = useState('8/1/2022');
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const updateCareTeam = async (currentFin:string) => {
      const careTeam = await getCareTeam(currentFin);
      setCareTeamData(careTeam);
    };
    if (currentFin === '0'){
      return;
    }
    updateCareTeam(currentFin);
  }, [currentFin]);

  useEffect(() => {
    if (!popupOpen) {
      setCurrentFin("0");
    }
  }, [popupOpen]);

  useEffect(() => {
    console.log("care team", careTeamData);
    if (careTeamData.length) {
      setPopupOpen(true);
    }
  }, [careTeamData]);


  interface CareTeam {
    id: string,
    name:string,
    fin: string,
    size: string
  }


  const mappedCareTeam = (data:CareTeam[]) => {
    const mappedData = data.map((item: CareTeam) => {
      return { id: item.fin, name: item.fin, size: item.size };
    });
    return mappedData;
  };

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
        {/* <TeamCard teamData={careTeamData} onClosePopup={setPopupOpen} className={`${popupOpen ? "open" : "close"}`} /> */}
        {/* {popupOpen && (
          <TeamCard teamData={careTeamData} onClosePopup={setPopupOpen} />
        )} */}
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
            title={`JRI Room Data ${selectedDate}`}
            onSelectItem={setCurrentFin}
            firstColumnName={'Room'}
            secondColumnName={'Utilization'}
            pageSize={10}
          ></SummaryGrid>
        </div>
      </section>
  );
};

export default Utilization;
