import { Fragment, useState, useMemo } from "react";
import FinCareTeam from "./fin-careteam-component";
import Pagination from "../pagination/pagination-component";

let pageSize = 10;

const FinCareTeamSummary = ({finCareTeam}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const currentFinData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return finCareTeam.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, finCareTeam]);


  return (
    <Fragment>
      <FinCareTeam data={currentFinData} />
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={finCareTeam.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Fragment>
  );
};
export default FinCareTeamSummary;
