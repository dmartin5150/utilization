import { useEffect, useState, useMemo } from "react";
import getFinCareTeam from "../../utilities/fin-data";
import FinCareTeamSummary from "../../components/fin-careteam/fin-careteam-summary";
import Calendar from "../../components/calendar/calendar-component";
import { testData } from "../../data/test-admission-data";
import "./patient-page.scss";

const Patient = () => {
  const [finCareTeam, setFinCareTeam] = useState([]);

  useEffect(() => {
    const getFinData = async () => {
      const finData = await getFinCareTeam("8/12/2022");
      setFinCareTeam(finData);
    };
    getFinData();
  }, []);


  return (
    <section className="patient">
      <div className="patient__calendar">
        <Calendar admissionData={testData} />
      </div>
      <div className="patient__info">
        <FinCareTeamSummary finCareTeam={finCareTeam} />
      </div>
    </section>
  );
};

export default Patient;
