import SummaryGridRow from "./summary-grid-row";
import "./summary-grid-data.scss";

const SummaryGridData = (props) => {
    const {headings} = props;
    console.log('sdata', props.data)
    return (
      <div className="summary-grid-data">
        <header className="head">
          <h2 className="header-secondary">{headings[0]}</h2>
          <h2 className="header-secondary">{headings[1]}</h2>
          <h2 className="header-secondary">{headings[2]}</h2>
        </header>
        {props.data.map((item) => {
          return(<SummaryGridRow key={item.id}  unit={item.name} stat={item.size} onSelectItem={props.onSelectItem} />)
        })}
      </div>
    );
  };
  
  export default SummaryGridData;