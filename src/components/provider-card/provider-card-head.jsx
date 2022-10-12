import "./provider-card-head.scss";

const ProviderCardHead = ({providerData}) => {

    if(!providerData) {
      return null;
    }
    
    return (
        <div className="providercardhead">
          <div className="row">
            <h2 className="item">
              <span className="item--name">Provider:</span>
              {providerData.fname} {providerData.lname}
            </h2>
            <h2 className="item">
              <span className="item--name">Specialty:</span>
              {providerData.specialty}
            </h2>
          </div>
        </div>
    )




}
export default ProviderCardHead;