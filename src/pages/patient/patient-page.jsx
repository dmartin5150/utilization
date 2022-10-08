import { useEffect, useState, useMemo } from "react";
import getFinCareTeam from "../../utilities/fin-data";
import FinCareTeam from "../../components/fin-careteam/fin-careteam-component";
import Pagination from "../../components/pagination/pagination-component";
import Calendar from "../../components/calendar/calendar-component";
import "./patient-page.scss";

let pageSize = 10;

const Patient = () => {
  const [finCareTeam, setFinCareTeam] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const currentFinData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return finCareTeam.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, finCareTeam]);

  useEffect(() => {
    const getFinData = async () => {
      const finData = await getFinCareTeam("8/12/2022");
      setFinCareTeam(finData);
    };
    getFinData();
  }, []);

  return (
    <section className="patient">
      <div className= "patient__calendar">
        <h2 className="patient__calendar--heading">St. Thomas Midtown Admissions</h2>
        <Calendar />
      </div>
      <div className="patient__info">
        <FinCareTeam data={currentFinData} />
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={finCareTeam.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </section>
  );
};

export default Patient;
