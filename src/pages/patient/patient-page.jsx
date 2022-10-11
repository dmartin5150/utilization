import { useEffect, useState, useMemo } from "react";
import getFinCareTeam from "../../utilities/fin-data";
import getDischargeData from "../../utilities/git-discharge-data";
import getCareTeam from "../../utilities/careteam";
import FinCareTeamSummary from "../../components/fin-careteam/fin-careteam-summary";
import Calendar from "../../components/calendar/calendar-component";
import TeamCard from "../../components/team-card/team-card-component";
import { testTeamData } from "../../data/test-team-data";
import "./patient-page.scss";


const Patient = () => {
  const [finCareTeam, setFinCareTeam] = useState([]);
  const [dischargeData, setDischargeData] = useState([]);
  const [careTeamData, setCareTeamData] = useState([]);
  const [currentFin, setCurrentFin]= useState('0');
  const [selectedDate, setSelectedDate] = useState("08/01/22");
  const [popupOpen, setPopupOpen] = useState(false);



  useEffect(()=> {
    const updateCareTeam = async (currentFin) => {
      const careTeam = await getCareTeam(currentFin);
      console.log(careTeam);
      setCareTeamData(careTeam);
    }
    updateCareTeam(currentFin);
    console.log('updated fin');

  },[currentFin]);


  useEffect(()=> {
    if (careTeamData.length){
      setPopupOpen(true);
    }
  },[careTeamData])


  useEffect(() => {
    const getFinData = async () => {
      const finData = await getFinCareTeam(selectedDate);
      setFinCareTeam(finData);
    };
    getFinData();
  }, [selectedDate]);

  useEffect(()=> {
    const getDischarge = async () => {
      const dcData = await getDischargeData();
      setDischargeData(dcData);
    }
    getDischarge();
  }, [])

  return (
    <section className="patient" id="patient">
      {popupOpen && <TeamCard teamData={careTeamData} onClosePopup={setPopupOpen} />}
      <div className="patient__calendar">
        <Calendar
          heading={'St. Thomas Midtown Admissions'}
          admissionData={dischargeData}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
      </div>
      <div className="patient__info">
        <FinCareTeamSummary
          finCareTeam={finCareTeam}
          selectedDate={selectedDate}
          onSelectTeam={setCurrentFin}
          headings={['Selected Date', 'Number of discharges']}
          subheadings={['FIN', "Care team size", 'Show team']}
        />
      </div>
    </section>
  );
};

export default Patient;
