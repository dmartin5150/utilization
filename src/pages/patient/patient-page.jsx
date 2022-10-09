import { useEffect, useState, useMemo } from "react";
import getFinCareTeam from "../../utilities/fin-data";
import FinCareTeamSummary from "../../components/fin-careteam/fin-careteam-summary";
import Calendar from "../../components/calendar/calendar-component";
import { testData } from "../../data/test-admission-data";
import "./patient-page.scss";

const Patient = () => {
  const [finCareTeam, setFinCareTeam] = useState([]);
  const [selectedDate, setSelectedDate] = useState("8/4/2022");

  useEffect(() => {
    const getFinData = async () => {
      const finData = await getFinCareTeam(selectedDate);
      setFinCareTeam(finData);
    };
    getFinData();
  }, [selectedDate]);

  return (
    <section className="patient">
      <div className="patient__calendar">
        <Calendar
          admissionData={testData}
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
