import { useEffect, useState, useMemo } from "react";
import getFinCareTeam from "../../utilities/fin-data";
import getDischargeData from "../../utilities/git-discharge-data";
import FinCareTeamSummary from "../../components/fin-careteam/fin-careteam-summary";
import Calendar from "../../components/calendar/calendar-component";
import TeamCard from "../../components/team-card/team-card-component";
import "./patient-page.scss";


const Patient = () => {
  const [finCareTeam, setFinCareTeam] = useState([]);
  const [dischargeData, setDischargeData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("8/4/2022");

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
    <section className="patient">
      <TeamCard />
      <div className="patient__calendar">
        <Calendar
          admissionData={dischargeData}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
      </div>
      <div className="patient__info">
        <FinCareTeamSummary
          finCareTeam={finCareTeam}
          selectedDate={selectedDate}
        />
      </div>
    </section>
  );
};

export default Patient;
