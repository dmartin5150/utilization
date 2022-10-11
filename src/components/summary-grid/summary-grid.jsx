import { Fragment, useState,  useEffect } from "react";
import SummaryGridData from "./summary-grid-data";
import Pagination from "../pagination/pagination-component";
import "./summary-grid.scss";



const SummaryGrid = ({data, selectedItem,onSelectItem,headings,subheadings,pageSize=11}) => {

      const [currentPage, setCurrentPage] = useState(1);
      const [currentData, setCurrentData]= useState([]);

      useEffect(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        setCurrentData(data.slice(firstPageIndex, lastPageIndex));
      }, [currentPage, data]);
    
      useEffect(() => {
        setCurrentPage(1);
      }, [data]);
    
      return (
        <Fragment>
          <div className="summary-grid">
            <div className="outline">
              <header className="header">
                <h2 className="header--item">
                  {headings[0]} {selectedItem}
                </h2>
                <h2 className="header--item">
                  {headings[1]} {data.length}
                </h2>
              </header>
              <SummaryGridData data={currentData} headings={subheadings} onSelectItem={onSelectItem}/>
            </div>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={data.length}
              pageSize={pageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </Fragment>
      );
    };

export default SummaryGrid;