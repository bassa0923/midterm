import "../App.css";
import { useState } from "react";
import { useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Cars from "./cars";
import car from "../assets/images/car.png";
import moto from "../assets/images/moto.png";
import spec from "../assets/images/spec.png";
import Location from "./Location";
import Fuel from "./Fuel";
import Year from "./year";

import Info from "./Info";

function App() {
  // CAR INFO
  const [cars, setCars] = useState([]);
  const [selectedCarOptions, setSelectedCarOptions] = useState([]);
  const [carAmount, setCarAmount] = useState([]);
  const [carId, setCarId] = useState([]);
  const [locationId, setLocationId] = useState([]);
  const [fuelId, setFuelId] = useState([]);
  const [clearance, setClearance] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  const [carName, setCarName] = useState([]);
  const [carRunKm, setCarRunKm] = useState([]);
  const [carEngineVolume, setCarEngineVolume] = useState([]);
  const [gearType, setGearType] = useState([]);
  const [fuelTypeId, setFuelTypeId] = useState([]);
  const [prodYear, setProdYear] = useState([]);
  const [rightWheel, setRightWheel] = useState([]);
  const [priceValue, setPriceValue] = useState([]);
  const [fetchedLocation, setFetchedLocation] = useState([]);
  const [customsPassed, setCustomsPassed] = useState([]);
  const [orderDate, setOrderDate] = useState([]);
  const [views, setViews] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [carIdPhoto, setCarIdPhoto] = useState([]);

  const location = [
    { value: 2, label: "თბილისი" },
    { value: 3, label: "ქუთაისი" },
    { value: 4, label: "ბათუმი" },
  ];
  const fuel = [
    { value: 2, label: "ბენზინი" },
    { value: 3, label: "დიზელი" },
    { value: 7, label: "ელექტრო" },
  ];

  const fetchData = async () => {
    try {
      // Get all cars data
      const response = await fetch(
        "https://api2.myauto.ge/ka/services/quick-main-data/all/get"
      );
      const dataJson = await response.json();

      // Converting JSON to Array
      const carInfo = JSON.parse(dataJson.data.manufactors);
      // Creating Array and pushing carnames
      let cars = [];
      carInfo.map((car) => {
        cars.push({ value: car.man_id, label: car.man_name });
      });
      setCars(cars);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    // Calling fetchData to get API
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        // Get Amount of cars
        const response = await fetch(
          `https://api2.myauto.ge/ka/products/count?TypeID=0&ForRent=0&Mans=${carId}&ProdYearFrom=${startYear}&ProdYearTo=${endYear}&PriceFrom=&PriceTo=&CurrencyID=3&MileageType=1&FuelTypes=${fuelId}&Locs=${locationId}&Customs=${clearance}&Page=1&undefined=1`
        );
        const dataJson = await response.json();
        setCarAmount(dataJson.data[0].count);
      } catch (err) {
        console.log(err.message);
      }
    };

    // Calling fetchCount to get API
    fetchCount();
  }, [carId, locationId, fuelId, clearance, startYear, endYear]);

  const handleChange = (selectedOptions) => {
    // Update user input for cars
    setSelectedCarOptions(selectedOptions);

    // Get car IDs, and update state
    let carId = [];
    selectedOptions.map((car) => {
      carId.push(car.value);
    });
    setCarId(carId.join("-"));
  };

  const locationChange = (selectedLocation) => {
    let locationId = [];
    selectedLocation.map((location) => {
      locationId.push(location.value);
    });
    setLocationId(locationId.join("."));
  };

  const clearanceChange = (customer) => {
    if (customer === "clearance" && clearance !== 1) {
      setClearance(1);
    }
    if (customer === "clearance" && clearance === 1) {
      setClearance("");
    }
    if (customer === "duty" && clearance !== 0) {
      setClearance(0);
    }
    if (customer === "duty" && clearance === 0) {
      setClearance("");
    }
  };

  const yearChange = (startYear, endYear) => {
    setStartYear(startYear);
    setEndYear(endYear);
  };

  const fuelChange = (selectedFuel) => {
    let fuelId = [];
    selectedFuel.map((fuel) => {
      fuelId.push(fuel.value);
    });
    setFuelId(fuelId.join("."));
  };

  const styles = {
    valueContainer: (css) => ({
      ...css,
      flexWrap: "nowrap",
      role: "menuitemcheckbox",
    }),
    multiValueRemove: () => {
      return {
        display: "none",
      };
    },
    multiValue: () => {
      return {
        backgroundColor: "white",
      };
    },
  };

  const fetchCars = async (page) => {
    const response = await fetch(
      `https://api2.myauto.ge/ka/products?TypeID=0&ForRent=0&Mans=${carId}&ProdYearFrom=${startYear}&ProdYearTo=${endYear}&PriceFrom=&PriceTo=&CurrencyID=3&MileageType=1&FuelTypes=${fuelId}&Locs=${locationId}&Customs=${clearance}&Page=${
        page ? page : 1
      }&undefined=1`
    );
    const dataJson = await response.json();

    let carNames = [];
    let prodYear = [];
    let carRunKm = [];
    let carEngineVolume = [];
    let gearType = [];
    let fuelTypeId = [];
    let rightWheel = [];
    let priceValue = [];
    let fetchedLocation = [];
    let customsPassed = [];
    let orderDate = [];
    let views = [];
    let photos = [];
    let carIdPhoto = [];
    dataJson.data.items.map((data) => {
      carRunKm.push(data.car_run);
      carEngineVolume.push(data.engine_volume);
      gearType.push(data.gear_type_id);
      prodYear.push(data.prod_year);
      fuelTypeId.push(data.fuel_type_id);
      rightWheel.push(data.right_wheel);
      priceValue.push(data.price_value);
      fetchedLocation.push(data.location_id);
      customsPassed.push(data.customs_passed);
      orderDate.push(data.order_date);
      views.push(data.views);
      photos.push(data.photo);
      carIdPhoto.push(data.car_id);
      cars.map((car) => {
        if (car.value == data.man_id) {
          carNames.push(car.label);
        }
      });

      setCarName(carNames);
      setProdYear(prodYear);
      setCarRunKm(carRunKm);
      setCarEngineVolume(carEngineVolume);
      setGearType(gearType);
      setFuelTypeId(fuelTypeId);
      setRightWheel(rightWheel);
      setPriceValue(priceValue);
      setFetchedLocation(fetchedLocation);
      setCustomsPassed(customsPassed);
      setOrderDate(orderDate);
      setViews(views);
      setPhotos(photos);
      setCarIdPhoto(carIdPhoto);
    });
  };

  fetchCars();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="home-page">
            <div className="car-options">
              <div className="actions-car">
                <div className="buy-car">
                  <div className="car-selling">იყიდება</div>
                </div>
              </div>
            </div>
            <hr className="hr"></hr>
            <div className="search-engine">
              <div className="options">
                <div className="options-option">
                  <div className="options-car">
                    <img className="car-image" src={car}></img>
                    <div className="cars">ავტომობილები</div>
                  </div>
                  <div className="options-spectech">
                    <img className="spec-image" src={spec}></img>
                    <div className="spectech">სპეცტექნიკა</div>
                  </div>
                  <div className="options-moto">
                    <img className="moto-image" src={moto}></img>
                    <div className="motos">მოტოტექნიკა</div>
                  </div>
                </div>
              </div>
              <div className="filters-container">
                <div className="first-container">
                  <Cars
                    cars={cars}
                    handleChange={handleChange}
                    selectedCarOptions={selectedCarOptions}
                    styles={styles}
                  />
                  <Location
                    locationChange={locationChange}
                    location={location}
                    locationId={locationId}
                    styles={styles}
                  />
                  <div className="customer-clearance">
                    <div
                      className={
                        clearance === 1 ? "clearance-selected" : "clearance"
                      }
                      id="clearance"
                      onClick={(e) => clearanceChange(e.target.id)}
                    >
                      განბაჟებული
                    </div>
                    <div
                      className={
                        clearance === 0 ? "duty-selected" : "duty-free"
                      }
                      id="duty"
                      onClick={(e) => clearanceChange(e.target.id)}
                    >
                      განუბაჟებელი
                    </div>
                  </div>
                </div>
                <div className="second-container">
                  <Year
                    startYear={startYear}
                    endYear={endYear}
                    yearChange={yearChange}
                  />
                  <Fuel fuelChange={fuelChange} fuel={fuel} styles={styles} />
                </div>
                <Link to="/info" className="link">
                  <button className="search" onClick={fetchCars}>
                    ძებნა ({carAmount})
                  </button>
                </Link>
              </div>
            </div>
          </div>
        }
      />
      <Route
        path="/info"
        element={
          <Info
            carName={carName}
            prodYear={prodYear}
            carRunKm={carRunKm}
            carEngineVolume={carEngineVolume}
            gearType={gearType}
            fuelTypeId={fuelTypeId}
            rightWheel={rightWheel}
            priceValue={priceValue}
            fetchedLocation={fetchedLocation}
            customsPassed={customsPassed}
            orderDate={orderDate}
            views={views}
            photos={photos}
            carIdPhoto={carIdPhoto}
            carAmount={carAmount}
            fetchCars={fetchCars}
          />
        }
      />
    </Routes>
  );
}

export default App;

// #E8F8F0
