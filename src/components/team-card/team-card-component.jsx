import React, { useState, useEffect } from "react";
import "./team-card-component.scss";
import Popup from "../popup/popup-component";
import TeamCardHead from "./team-card-head";
import TeamCardGrid from "./team-card-grid";
import Pagination from "../pagination/pagination-component";
import classnames from 'classnames';

let pageSize = 4;

const TeamCard = ({ teamData,className, onClosePopup}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCareTeam, setCurrentCareTeam] = useState([]);

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    setCurrentCareTeam(teamData.slice(firstPageIndex, lastPageIndex));
  }, [currentPage, teamData]);


  const closePopupHandler = () => {
    onClosePopup(false);
  }


  return (
    <Popup className={classnames("teamcard__popup",{open:className== 'open'})}>
    {/* <Popup className={classnames("teamcard__popup")}> */}
      <div className={classnames("teamcard",{open:className== 'open'})}>
        {/* <div className="teamcard__close-container"> */}
          <a href="#" className="teamcard__close" onClick={closePopupHandler}>
            &times;
          </a>
        {/* </div> */}
        <h2 className="teamcard__heading">
          <span className="teamcard__heading--main">Seamless Transitions</span>{" "}
          Care Team
        </h2>
        <TeamCardHead teamData={teamData[0]} />
        <TeamCardGrid teamData={currentCareTeam} />
        <Pagination
          className="teamcard__pagination"
          currentPage={currentPage}
          totalCount={teamData.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </Popup>
  );
};
export default TeamCard;
