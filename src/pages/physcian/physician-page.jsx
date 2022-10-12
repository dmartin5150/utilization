import { useEffect, useState } from "react";
import SummaryGrid from "../../components/summary-grid/summary-grid";
import Directory from "../../components/directory/directory";
import { directoryData } from "../../data/directory-data";
import getProviderList from "../../utilities/provider-list";
import ProviderCard from "../../components/provider-card/provider-card";
import getPatientList from "../../utilities/patient-list";
import "./physician-page.scss";

const Physician = () => {
  const [providerList, setProviderList] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [currentNPI, setCurrentNPI] = useState("0");
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
      setCurrentNPI('0');
    }
  }, [popupOpen]);

  useEffect(() => {
    if (patientList.length) {
      setPopupOpen(true);
    }
  }, [patientList]);



  useEffect(() => {
    const getPatientData = async (npi) => {
      const patients = await getPatientList(npi);
      console.log(patients);
      setPatientList(patients);
    };
    getPatientData(currentNPI);
  }, [currentNPI]);







  return (
    <section className="provider" >
      {popupOpen && <ProviderCard
        patientData={patientList}
        onOpenPopup={setPopupOpen}
        className={`${popupOpen ? "open" : "close"}`}
      />}
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
          onSelectItem={setCurrentNPI}
          headings={["Lastname: ", "Number of Providers: "]}
          subheadings={["Name", "Number of Patients", "Show List"]}
        ></SummaryGrid>
      </div>
    </section>
  );
};

export default Physician;
