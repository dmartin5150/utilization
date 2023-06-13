import React, { Fragment, useState,  useEffect } from "react";
import Pagination from "../pagination/pagination";
import "./summary-grid.scss";
import SummaryGridHeader from "./summary-grid-header";
import { SummaryRowHeaderCols } from "./summary-row-header";
import SummaryGridRow from "./summary-grid-row";
import SummaryRowHeader from "./summary-row-header";


interface SummaryGridData {
  id: string;
  name: string;
  property:string;
  buttonText: string;
}


interface SummaryGridProps {
  data: SummaryGridData[];
  title: string;
  headers:SummaryRowHeaderCols;
  onSelectItem: ()=>void;
  pageSize: number;
}


const SummaryGrid: React.FC<SummaryGridProps> = ({data,title, headers, onSelectItem, pageSize=11}) => {

      const [currentPage, setCurrentPage] = useState(1);
      const [currentData, setCurrentData]= useState<SummaryGridData[]>([]);

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
              <SummaryRowHeader headers={headers}/>
              <div className="summary-grid-data">
                {data.map((item) => {
                  return(<SummaryGridRow key={item.id} id={item.id} name={item.name}  property={item.property} buttonText={item.buttonText} onSelectItem={onSelectItem} />)
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