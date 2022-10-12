import { useEffect, useState } from "react";
import getFinCareTeam from "../../utilities/fin-data";
import getDischargeData from "../../utilities/git-discharge-data";
import getCareTeam from "../../utilities/careteam";
import SummaryGrid from "../../components/summary-grid/summary-grid";
import Calendar from "../../components/calendar/calendar-component";
import Directory from "../../components/directory/directory";
import TeamCard from "../../components/team-card/team-card-component";
import { directoryData } from "../../data/directory-data";
import "./physician-page.scss";

const Physician = () => {

  const [providerList, setProviderList] = useState([]);
  const [finCareTeam, setFinCareTeam] = useState([]);
  const [dischargeData, setDischargeData] = useState([]);
  const [careTeamData, setCareTeamData] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [currentLetter, setCurrentLetter] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    // const updateProviderList = async (currentLetter) => {
    //   const careTeam = await getCareTeam(currentFin);
    //   console.log(careTeam);
    //   setProviderList([{name: "David Martin", patients:"6"}]);
    // };

    const updateCareTeam = (currentLetter) => {
            setProviderList([{name: "David Martin", size:"6"}]);
    }
    updateCareTeam(currentLetter);
  }, [currentLetter]);

  useEffect(()=> {
    if(!popupOpen) {
      setCurrentLetter('');
    }
  },[popupOpen])

  useEffect(() => {
    if (careTeamData.length) {
      setPopupOpen(true);
    }
  }, [careTeamData]);

  // useEffect(() => {
  //   const getFinData = async () => {
  //     const finData = await getFinCareTeam(selectedDate);
  //     setFinCareTeam(finData);
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

  return (
    <section className="patient" id="patient">
      {/* <TeamCard teamData={careTeamData} onClosePopup={setPopupOpen} className={`${popupOpen ? "open" : "close"}`} /> */}
      <div className="patient__calendar">
        <Directory
          heading={"St. Thomas Midtown Clinicians"}
          directoryData={directoryData}
          selectedLetter={selectedLetter}
          onLetterChange={setSelectedLetter}
        />
      </div>
      <div className="provider__info">
        <SummaryGrid
          data={providerList}
          selectedItem={selectedLetter}
          onSelectItem={setCurrentLetter}
          headings={["Lastname: ",'Number of Providers: ']}
          subheadings={["Name", "Number of Patients", "Show List"]}
        ></SummaryGrid>
      </div>
    </section>
  );
};

export default Physician;
