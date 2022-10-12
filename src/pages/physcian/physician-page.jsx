import { useEffect, useState } from "react";
import SummaryGrid from "../../components/summary-grid/summary-grid";
import Directory from "../../components/directory/directory";
import { directoryData } from "../../data/directory-data";
import getProviderList from "../../utilities/pateint-list";
import ProviderCard from "../../components/provider-card/provider-card";
import "./physician-page.scss";

const Physician = () => {
  const [providerList, setProviderList] = useState([]);
  // const [patientList, setPatientList] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [currentLetter, setCurrentLetter] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const updateProviderList = async (selectedLetter) => {
      const providers = await getProviderList(selectedLetter);
      setProviderList(providers);
    };
    updateProviderList(selectedLetter);
  }, [selectedLetter]);

  useEffect(() => {
    if (!popupOpen) {
      setCurrentLetter("");
    }
  }, [popupOpen]);

  // useEffect(() => {
  //   if (patientList.length) {
  //     setPopupOpen(true);
  //   }
  // }, [patientList]);



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


  const patientList = [
      {
        id: "1",
        fname: "David",
        lname: "Martin",
        specialty:'Internal Medicine',
        fin: "5555555",
        discharge: "8/4/2022",
        disp: "To Home",
        prev: '8/2/2020',
        next: '9/3/2020'
      },
    ];


  return (
    <section className="provider" >
      <ProviderCard
        patientData={patientList}
        onClosePopup={setPopupOpen}
        className={`${popupOpen ? "open" : "close"}`}
      />
      <div className="provider__directory">
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
          headings={["Lastname: ", "Number of Providers: "]}
          subheadings={["Name", "Number of Patients", "Show List"]}
        ></SummaryGrid>
      </div>
    </section>
  );
};

export default Physician;
