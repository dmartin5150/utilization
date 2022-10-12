import { useEffect, useState } from "react";
import getFinCareTeam from "../../utilities/fin-data";
import getDischargeData from "../../utilities/git-discharge-data";
import getCareTeam from "../../utilities/careteam";
import SummaryGrid from "../../components/summary-grid/summary-grid";
import Calendar from "../../components/calendar/calendar-component";
import TeamCard from "../../components/team-card/team-card-component";
import "./patient-page.scss";

const Patient = () => {
  const [finCareTeam, setFinCareTeam] = useState([]);
  const [dischargeData, setDischargeData] = useState([]);
  const [careTeamData, setCareTeamData] = useState([]);
  const [currentFin, setCurrentFin] = useState("0");
  const [selectedDate, setSelectedDate] = useState("08/01/22");
  const [popupOpen, setPopupOpen] = useState(false);




  useEffect(() => {
    const updateCareTeam = async (currentFin) => {
      const careTeam = await getCareTeam(currentFin);
      setCareTeamData(careTeam);
    };
    updateCareTeam(currentFin);
  }, [currentFin]);

  useEffect(()=> {
    if(!popupOpen) {
      setCurrentFin('0');
    }
  },[popupOpen])

  useEffect(() => {
    if (careTeamData.length) {
      setPopupOpen(true);
    }
  }, [careTeamData]);


  const mappedCareTeam = (data) => {
    const mappedData= data.map((item) => {
      return {id:item.fin, name:item.fin, size:item.size}
    });
    return mappedData;
  }



  useEffect(() => {
    const getFinData = async () => {
      const finData = await getFinCareTeam(selectedDate);
      const mappedFinData = mappedCareTeam(finData)
      setFinCareTeam(mappedFinData);
    };
    getFinData();
  }, [selectedDate]);

  useEffect(() => {
    const getDischarge = async () => {
      const dcData = await getDischargeData();
      setDischargeData(dcData);
    };
    getDischarge();
  }, []);

  return (
    <section className="patient" id="patient">
      <TeamCard teamData={careTeamData} onClosePopup={setPopupOpen} className={`${popupOpen ? "open" : "close"}`} />
      <div className="patient__calendar">
        <Calendar
          heading={"St. Thomas Midtown Admissions"}
          admissionData={dischargeData}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
      </div>
      <div className="patient__info">
        <SummaryGrid
          data={finCareTeam}
          selectedItem={selectedDate}
          onSelectItem={setCurrentFin}
          headings={["Selected Date", "Number of discharges"]}
          subheadings={["FIN", "Care team size", "Show team"]}
        ></SummaryGrid>
      </div>
    </section>
  );
};

export default Patient;
