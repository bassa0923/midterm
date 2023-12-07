import './App.css'
import { useState } from 'react';
import { useEffect } from 'react';
import Cars from './cars';
import car from './assets/images/car.png'
import moto from './assets/images/moto.png'
import spec from './assets/images/spec.png'
import trash from './assets/images/trash.png'
import Location from './location';
import Fuel from './fuel';

    
    // https://api2.myauto.ge/ka/products/count?TypeID=0&ForRent=0&Mans=41-473&CurrencyID=3&MileageType=1&Customs=1&Page=1&undefined=1
   // https://api2.myauto.ge/ka/products/count?TypeID=0&ForRent=0&Mans=&CurrencyID=3&MileageType=1&Page=1&undefined=1

    //https://api2.myauto.ge/ka/products/count?TypeID=0&ForRent=0&Mans=41.1077&CurrencyID=3&MileageType=1&Page=1&undefined=1


function App() {

  // CAR INFO
  const [carName, setCarsName] = useState([]);
  const [selectedCarOptions, setSelectedCarOptions] = useState([]);
  const [carAmount, setCarAmount] = useState([]);
  const [carId, setCarId] = useState([]);
  const [locationId, setLocationId] = useState([]);
  const [fuelId, setFuelId] = useState([]);
  const [clearance, setClearance] = useState('');

  const location=[{value: 2, label: 'თბილისი'}, {value:3, label: 'ქუთაისი'},{ value:4, label: 'ბათუმი'}]
  const fuel=[{value: 2, label: 'ბენზინი'}, {value: 3, label: 'დიზელი'}, {value: 7, label: 'ელექტრო'}]

  useEffect(() => {

    const fetchData = async () => {
      try{
        // Get all car data
        const response = await fetch(
          'https://api2.myauto.ge/ka/services/quick-main-data/all/get'
        );
        const dataJson = await response.json();

        // Converting JSON to Array
        const carInfo =  JSON.parse(dataJson.data.manufactors);

        // Creating Array and pushing carnames 
        let carName = [];
        carInfo.map(car => {
          carName.push({value: car.man_id, label: car.man_name})
        });
        setCarsName(carName);
      } catch(err) {
      console.log(err.message);
      }
    } 

  // Calling fetchData to get API
  fetchData();

}, []);


  useEffect(() => {
    const fetchData = async () => {
      try{
        // Get Amount of cars
          const response = await fetch(`https://api2.myauto.ge/ka/products/count?TypeID=0&ForRent=0&Mans=${carId}&ProdYearFrom=&ProdYearTo=&PriceFrom=&PriceTo=&CurrencyID=3&MileageType=1&FuelTypes=${fuelId}&Locs=${locationId}&Customs=${clearance}&Page=1&undefined=1`);
          const dataJson = await response.json();
          setCarAmount(dataJson.data[0].count)
      } catch(err){
        console.log(err.message)
      }
  }

  // Calling fetchData to get API
  fetchData();

}, [carId, locationId, fuelId, clearance]);


  const handleChange = (selectedOptions) => {
    // Update user input for cars
    setSelectedCarOptions(selectedOptions);

    // Get car IDs, and update state
    let carId = [];
    selectedOptions.map((car) => {
        carId.push(car.value);
    })
    setCarId(carId.join('-'));
  }

  const locationChange = (selectedLocation) => {
      let locationId = [];
      selectedLocation.map((location) => {
        locationId.push(location.value);
    });
    setLocationId(locationId.join('.'));

  }

  const clearanceChange = (customer) => {
    if(customer === 'clearance' && clearance !== 1){
      setClearance(1);
    } 
    if(customer === 'clearance' && clearance === 1){
      setClearance('');
    }
    if(customer === 'duty' && clearance !== 0){
      setClearance(0);
    }
    if(customer === 'duty' && clearance === 0){
      setClearance('');
    }
  }

  const fuelChange = (selectedFuel) => {
    let fuelId = [];
    selectedFuel.map((fuel) => {
      fuelId.push(fuel.value);
    });
    setFuelId(fuelId.join('.'));

  }
  
  console.log(clearance)

return (
    <div className='home-page'>
      <div className='car-options'>
        <div className='actions-car'>
          <div className='buy-car'>
            <p>იყიდება</p>
          </div>
        </div>
        <div className='clear-filter'>
          <p>ფილტრის გასუფთავება</p>
        </div>
      </div>
      <hr className='hr'></hr>
      <div className='search-engine'>
      <div className='options'>
        <div className='options-option'>
        <div className='options-car'>
          <img className='car-image'src={car}></img>
          <div className='cars'>ავტომობილები</div>
        </div>
        <div className='options-spectech'>
          <img className='spec-image' src={spec}></img>
          <div className='spectech'>სპეცტექნიკა</div>
        </div>
        <div className='options-moto'>
          <img className='moto-image' src={moto}></img>
          <div className='motos'>მოტოტექნიკა</div>
        </div>
        </div>
      </div>
      <div className='filters-container'>
        <div className='first-container'>
          <Cars 
            carName={carName}
            handleChange={handleChange}
            selectedCarOptions={selectedCarOptions}
          />
          <Location 
            locationChange={locationChange}
            location={location}
          />
          <div className='customer-clearance'>
          <div className={clearance === 1? 'clearance-selected' : 'clearance'} id='clearance' onClick={(e) => clearanceChange(e.target.id)}>განბაჟებული</div>
          <div className={clearance === 0? 'duty-selected' : 'duty-free'} id='duty'  onClick={(e) => clearanceChange(e.target.id)}>განუბაჟებელი</div>
          </div>
        </div>
        <Fuel
          fuelChange={fuelChange}
          fuel={fuel}
        />
      <button className='search'>ძებნა ({carAmount})</button>
      </div>
      </div>
    </div>
  )
}

export default App




// #E8F8F0