import styles from "./App.module.css";
import Middle from "./components/Middle.js";
import RightSide from "./components/RightSide.js";
import Footer from "./components/Footer.js";
import { Helmet } from "react-helmet";
import { useState } from "react";
import HashLoader from "react-spinners/HashLoader";

function App() {
  
  var WeatherObj = {
    "weather": [
      {
        "id": 501,
        "main": "Rain",
        "description": "--",
        "icon": "10d"
      }
    ],
    "main": {
      "temp": "--",
      "feels_like":"---",
      "temp_min": "--",
      "temp_max": "--",
      "pressure": "--",
      "humidity": "--",
      "sea_level": "--",
      "grnd_level": "--"
    },
    "visibility": "--",
    "wind": {
      "speed": "--",
      "deg": 349,
    },
    "rain": {
      "1h": 3.16
    },
    "clouds": {
      "all": "--"
    },
    "dt": 1661870592,
    "sys": {
      "type": 2,
      "id": 2075663,
      "country": "IT",
      "sunrise": 1661834187,
      "sunset": 1661882248
    },
    "timezone": 7200,
    "id": 3163858,
    "name": "Zocca",
    "cod": 200
  }       
  var airPollutionObj = {
    "list":[
      {
        "dt":1605182400,
        "main":{
          "aqi":"--"
        },
        "components":{
          "co":"--",
          "no":"--",
          "no2":"--",
          "o3":"--",
          "so2":"--",
          "pm2_5":"--",
          "pm10":"--",
          "nh3":"--"
        }
      }
    ]
  }

  var locationObj =[
     {
        "name":"Search a City",
        "lat":22.5,
        "lon":88.6,
        "country":"IN",
        "state":"West Bengal"
     }
  ]  
  
  var astronomy = {
    "location": {
      "name": "London",
      "region": "City of London, Greater London",
      "country": "United Kingdom",
      "lat": 51.52,
      "lon": -0.11,
      "tz_id": "Europe/London",
      "localtime_epoch": 1690443988,
      "localtime": "2023-07-27 8:46"
    },
    "astronomy": {
      "astro": {
        "sunrise": "--",
        "sunset": "--",
        "moonrise": "--",
        "moonset": "--",
        "moon_phase": "--",
        "moon_illumination": "--",
        "is_moon_up": 0,
        "is_sun_up": 0
      }
    }
  }    
  
  const apiKey = process.env.REACT_APP_API_KEY_1;
  const apiKey2=process.env.REACT_APP_API_KEY_2;

  const [updateWeather,setUpdateWeather] = useState(WeatherObj);
  const [updateAir,setUpdateAir] = useState(airPollutionObj);
  const [updateUv,setUpdateUv] = useState("---");
  const [updateAstro,setUpdateAstro] = useState(astronomy);
  const [updateLocation,setUpdateLocation] = useState(locationObj);
  const [isLoading,setIsLoading] = useState(false);

  
  const updateWeatherHandler = (weatherFromChild)=>{
    setUpdateWeather(weatherFromChild);
  }
  const updateAirHandler = (airFromChild)=>{
    setUpdateAir(airFromChild);
  }
  const updateUvHandler = (uvFromChild)=>{
    setUpdateUv(uvFromChild);
  }  
  const updateAstroHandler = (astroFromChild)=>{
    setUpdateAstro(astroFromChild);
  }
  const updateLocationHandler = (locationFromChild)=>{
    setUpdateLocation(locationFromChild);
  }

  const loadingStart = (message)=>{
    setTimeout(setIsLoading,4000);
    setIsLoading(message);
}


  return (
    <div>
      <Helmet>
        <title>Weather-Metrix | Soudip</title>
        <meta name="viewport" content="width=device-width"/>
      </Helmet>
      <div className={styles.loader} style={{display:!isLoading?"none":"flex"}}>
      <HashLoader color={"#013d73"}/>
      </div>
      <div className={styles.mainContainer}>
        <Middle apiId={apiKey} apiId2={apiKey2} weatherData={updateWeather} parentLoadingStart={loadingStart} airPollutionData={updateAir} uvData={updateUv} sendWeatherToParent={updateWeatherHandler} sendAirToParent={updateAirHandler} sendUvToParent={updateUvHandler} sendAstroToParent={updateAstroHandler} sendLocationToParent={updateLocationHandler}/>
        <RightSide apiId={apiKey} weatherData={updateWeather} locationData={updateLocation} astroData={updateAstro} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
