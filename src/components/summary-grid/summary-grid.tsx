import React, { Fragment, useState,  useEffect } from "react";
import Pagination from "../pagination/pagination";
import "./summary-grid.scss";
import SummaryGridHeader from "./summary-grid-header";
import { SummaryRowHeaderProps } from "./summary-row-header";
import SummaryGridRow from "./summary-grid-row";
import SummaryRowHeader from "./summary-row-header";
import { SummaryGridRowData} from "./summary-grid-row";


export interface SummaryGridData {
  id: string;
  name: string;
  property:string;
}


interface SummaryGridProps {
  data: SummaryGridRowData[];
  title: string;
  firstColumnName: string;
  secondColumnName: string;
  buttonText: string;
  onSelectItem: (data: SummaryGridRowData)=>void;
  onSelectSurgeons: ()=>void;
  pageSize: number;
}


const SummaryGrid: React.FC<SummaryGridProps> = ({data,title, firstColumnName,secondColumnName,buttonText,onSelectSurgeons, onSelectItem, pageSize=11}) => {

      const [currentPage, setCurrentPage] = useState(1);
      const [currentData, setCurrentData]= useState<SummaryGridRowData[]>([]);

      useEffect(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        setCurrentData(data.slice(firstPageIndex, lastPageIndex));
      }, [currentPage,pageSize, data]);
    
      useEffect(() => {
        setCurrentPage(1);
      }, [data]);
    
      return (
        <Fragment>
          <div className="summary-grid">
            <div className="outline">
              <SummaryGridHeader title={title} />
              <SummaryRowHeader firstColumnName={firstColumnName} secondColumnName={secondColumnName} onSelectSurgeon={onSelectSurgeons}/>
              <div className="summary-grid-data">
                {currentData.map((item) => {
                  return(<SummaryGridRow key={item.id} row={item} buttonText={buttonText} onSelectItem={onSelectItem} />)
                })}
              </div>
            </div>
            <Pagination
              currentPage={currentPage}
              totalCount={data.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
            />
          </div>
        </Fragment>
      );
    };

export default SummaryGrid;