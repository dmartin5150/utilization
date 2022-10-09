import { Fragment, useState, useMemo, useEffect } from "react";
import FinCareTeam from "./fin-careteam-component";
import Pagination from "../pagination/pagination-component";
import "./fin-careteam-summary.scss";

let pageSize = 11;

const FinCareTeamSummary = ({ finCareTeam, selectedDate }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const currentFinData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return finCareTeam.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, finCareTeam]);

  useEffect(() => {
    setCurrentPage(1);
  }, [finCareTeam]);

  return (
    <Fragment>
      <div className="fincareteam">
        <div className="fincareteam__table-outline">
          <header className="fincareteam__header">
            <h2 className="fincareteam__header--item">
              Selected Date: {selectedDate}
            </h2>
            <h2 className="fincareteam__header--item">
              Number of Discharges: {finCareTeam.length}
            </h2>
          </header>
          <FinCareTeam data={currentFinData} />
        </div>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={finCareTeam.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </Fragment>
  );
};
export default FinCareTeamSummary;
