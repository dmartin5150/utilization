
import "./directory.scss";
import PlacardBox from "../placard-box/placard-box-component";
import "./directory.scss";


const Directory = ({ directoryData, selectedLetter, onLetterChange, heading,pageSize=12 }) => {
    
  return (
    <PlacardBox
      placardData={directoryData}
      subtitle={'Lastname'}
      heading={heading}
      placardClass={"calendar-day"}
      selectedPlacard={selectedLetter}
      onPlacardChange={onLetterChange}
      pageSize={pageSize}
    />
  );
};
export default Directory;