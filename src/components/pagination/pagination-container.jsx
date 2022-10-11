import {Fragment} from "react";
import Pagination from "./pagination-component";


const PaginationContainer = (props) => {

    const {className, recordCount, currentPage, pageSize, setCurrentPage} = props;
    return (
        <Fragment>
            <div>{props.children}</div>
            <Pagination
            className={className}
            currentPage={currentPage}
            totalCount={recordCount}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
        />
      </Fragment>
    )



}

export default PaginationContainer