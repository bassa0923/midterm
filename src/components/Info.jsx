/* eslint-disable react/prop-types */
import setting from "../assets/images/settings.png";
import wheel from "../assets/images/wheel.png";
import speed from "../assets/images/speed.png";
import engine from "../assets/images/engine.png";
import moment from "moment";
import ReactPaginate from "react-paginate";

function Info(props) {
  const renderLocation = (i) => {
    if (props.fetchedLocation[i] == 2) {
      return "თბილისი";
    }
    if (props.fetchedLocation[i] == 3) {
      return "ქუთაისი";
    }
    if (props.fetchedLocation[i] == 4) {
      return "ბათუმი";
    }
    return "სხვა";
  };

  const renderFuel = (i) => {
    if (props.fuelTypeId[i] == 2) {
      return "ბენზინი";
    }
    if (props.fuelTypeId[i] == 3) {
      return "დიზელი";
    }
    if (props.fuelTypeId[i] == 7) {
      return "ელექტრო";
    }
    return "სხვა";
  };

  const renderSettings = (i) => {
    if (props.gearType[i] == 1) {
      return "მექანიკა";
    }
    if (props.gearType[i] == 2) {
      return "აუტომატიკა";
    }
    if (props.gearType[i] == 3) {
      return "ტიპტრონიკი";
    }
    return "ვარიატორი";
  };

  const paginateChange = (value) => {
    props.fetchCars(value + 1);
    window.scrollTo(0, 0);
  };

  if (props.carAmount !== 0)
    return (
      <div className="info">
        {props.carName.map((car, i) => {
          return (
            <div key={i} className="all-info">
              <img
                className="info-photos"
                src={`https://static.my.ge/myauto/photos/${props.photos[i]}/thumbs/${props.carIdPhoto[i]}_1.jpg?v=14`}
              ></img>
              <div className="info-car-details">
                <div className="car-details">
                  <div className="info-carYear">
                    <div className="info-car">{car}</div>
                    <div className="info-year">{`${props.prodYear[i]} წ`}</div>
                  </div>
                  <div className="info-location-customs">
                    <div className="info-location">{renderLocation(i)}</div>
                    <div className="info-customs">
                      {props.customsPassed[i] ? (
                        <div className="customs-green">{"განბაჟებული"}</div>
                      ) : (
                        <div className="customs-red">{"განბაჟება"}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="info-types">
                  <div className="info-fuel-engine">
                    <img className="info-fuel" src={engine}></img>
                    <div className="info-engine">
                      {(props.carEngineVolume[i] / 1000).toFixed(1)}
                    </div>
                    <div className="info-fuel-type">{renderFuel(i)}</div>
                  </div>
                  <div className="info-settings">
                    <img className="setting-image" src={setting}></img>
                    <div className="info-setting">{renderSettings(i)}</div>
                  </div>
                  <div className="info-price">
                    <div>
                      {props.priceValue[i]
                        ? `${props.priceValue[i]
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}  ₾`
                        : "ფასი შეთანხმებით"}
                    </div>
                  </div>
                </div>
                <div className="info-types-speed-wheel">
                  <div className="info-types-speed">
                    <img className="info-speed" src={speed}></img>
                    <div className="info-speed-km">{`${props.carEngineVolume[i]} კმ`}</div>
                  </div>
                  <div className="info-settings">
                    <img className="setting-image" src={wheel}></img>
                    <div className="info-setting">
                      {props.rightWheel[i] ? "მარჯვენა" : "მარცხენა"}
                    </div>
                  </div>
                </div>
                <div className="info-date-view">
                  <div className="info-date">
                    {moment(
                      props.orderDate[i],
                      "YYYY-MM-DD hh:mm:cc"
                    ).fromNow()}
                  </div>
                  <div className="info-space">•</div>
                  <div className="info-view">{`${props.views[i]} ნახვა`}</div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="pagination-container">
          <ReactPaginate
            nextLabel=">"
            onPageChange={(e) => paginateChange(e.selected)}
            pageRangeDisplayed={4}
            marginPagesDisplayed={0}
            pageCount={Math.ceil(props.carAmount / 30)}
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="break"
            className="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    );
  return <div className="not-found">{"No Cars Found"}</div>;
}

export default Info;
