import styles from "./RightSide.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleDown,
  faCloud,
  faMoon,
  faStar,
  faSun,
  faCloudShowersHeavy,
  faCloudMeatball,
  faSmog,
  faLocationArrow,
  faQuestion,
  faCloudSun,
  faCloudRain,
  faCloudShowersWater,
  faSnowflake,
  faCloudMoon
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState,useEffect } from "react";

const RightSide = (props) => {
  
  const [fullName, setFullName] = useState(' ');
  if(props.astroData.astronomy.astro.sunrise==='--'){ 
    var sunrise24 = props.astroData.astronomy.astro.sunrise;
    var sunset24= props.astroData.astronomy.astro.sunset;
    var moonrise24 = props.astroData.astronomy.astro.moonrise;
    var moonset = props.astroData.astronomy.astro.moonset;
    var city = props.locationData[0].name;
    var temp = props.weatherData.main.temp;
    var desc = props.weatherData.weather[0].description;
  }
  else{
    var sunrise12 = props.astroData.astronomy.astro.sunrise;
    sunrise24 = convertInto24(sunrise12);

  var sunset12= props.astroData.astronomy.astro.sunset;
    sunset24 = convertInto24(sunset12);

  var moonrise12 = props.astroData.astronomy.astro.moonrise;
    moonrise24 = convertInto24(moonrise12);

  moonset = props.astroData.astronomy.astro.moonset; 
  if(moonset[0]!=='N'){
    moonset = convertInto24(moonset);
  }
  else{
    moonset = "---";
  }
  
   var locationObject = props.locationData[0];
    city = locationObject.name;
   var lat = locationObject.lat;
   var lon = locationObject.lon;

   var windDirectionDegree = props.weatherData.wind.deg;
   var countryShort = locationObject.country;

   var state = "";
   if (locationObject.state) {
     state = locationObject.state;
   }
    var time = new Date().toLocaleTimeString([], {
     hour: "2-digit",
     minute: "2-digit",
     hour12: false,
   });

     temp = Math.round(props.weatherData.main.temp - 273.15);
     desc = props.weatherData.weather[0].description;
 
     var currentIntTime = time[0]+time[1]; 
     var sunriseIntTime = sunrise24[0]+sunrise24[1];
     var sunriseAgo = currentIntTime - sunriseIntTime;

     var sunsetIntTime = sunset24[0]+sunset24[1];
     var sunsetAgo = currentIntTime - sunsetIntTime;

     var moonriseIntTime = moonrise24[0]+moonrise24[1];
     var moonriseAgo = currentIntTime - moonriseIntTime;

     var moonsetIntTime = moonset[0]+moonset[1];
    if(moonsetIntTime!=='--'){
      if(moonsetIntTime==='00')
      moonsetIntTime=24;
      else if(moonsetIntTime==='01')
      moonsetIntTime=25;
      else if(moonsetIntTime==='02')
      moonsetIntTime=26;
      else if(moonsetIntTime==='03')
      moonsetIntTime=27;
      else if(moonsetIntTime==='04')
      moonsetIntTime=28;
      else if(moonsetIntTime==='05')
      moonsetIntTime=29;
      else if(moonsetIntTime==='06')
      moonsetIntTime=30;
      else if(moonsetIntTime==='07')
      moonsetIntTime=31;
      else if(moonsetIntTime==='08')
      moonsetIntTime=32;
      else if(moonsetIntTime==='09')
      moonsetIntTime=33;
      else if(moonsetIntTime==='10')
      moonsetIntTime=34;
      else if(moonsetIntTime==='11')
      moonsetIntTime=35;
      var moonsetAgo = currentIntTime - moonsetIntTime;
    }
     else
     var moonsetAgo = '--';
  }
  getCountryName();
  async function getCountryName() {
     var countryMapping = await axios.get(`./countryCodeMapping.json`);
    if (countryShort in countryMapping.data) {
     var country = countryMapping.data[countryShort];
      setFullName(country);
    }
    else{
      setFullName(' ');
    }

  }

  function convertInto24(time12) {
    var h1 = Number(time12[1] - "0");
    var h2 = Number(time12[0] - "0");
    var hh = h2 * 10 + (h1 % 10);
    var time = "";

    if (time12[6] == "A") {
      if (hh == 12) {
      
        time+="00";
        for (var i = 2; i <= 4; i++){
            time+=time12[i];
        }

      } else {
        for (var j = 0; j <= 4; j++) time+=time12[j];
      }
    }

    else {
      if (hh == 12) {
        time+="12";
        for (var k = 2; k <= 4; k++) time+=time12[k];
      } else {
        hh = hh + 12;
        time+=hh;
        for (var l = 2; l <= 4; l++) time+=time12[l];
      }
    }
    return time;
  }

  const iconMapping2 =
  {
    'clear sky': faSun,
    'few clouds' : faCloudSun,
    'broken clouds': faCloudMoon,
    'scattered clouds' : faCloud,
    'overcast clouds' : faCloud,
    'light rain': faCloudRain,
    'moderate rain': faCloudShowersHeavy,
    'heavy intensity rain': faCloudShowersWater,
    'light snow': faCloudMeatball,
    'moderate snow': faSnowflake,
    'heavy snow': faSnowflake,
    'snow': faCloudMeatball,
    'haze' : faSmog,
    'mist' : faSmog
  }

  var icon = faCloud; 

  if(props.weatherData.weather[0].description in iconMapping2)
  icon = iconMapping2[props.weatherData.weather[0].description];
  
  var forecastArr=['--','--','--','--','--'];
  var forecastIconArr=[faQuestion,faQuestion,faQuestion,faQuestion,faQuestion];
  var forecastTempArr=['--','--','--','--','--'];

  const [forecast, updateForecast] = useState(forecastArr);
  const [forecastIcon,updateForecastIcon] = useState(forecastIconArr);
  const [forecastTemp,updateForecastTemp] = useState(forecastTempArr);
  const dt = new Date();
  const today = new Date(dt);
  const d=today.getDay(); // eta dia ami day number ta pabo, 0 mane sunday, 1 mane monday
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  useEffect(() => {
    getForecast();
  }, [locationObject]);


  async function getForecast(){
    if(locationObject && lat!=='--'){ 
     var forecastJson = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${props.apiId}`);
     var forecastData = forecastJson.data.list;
     let tempArr=['','','','',''];
     tempArr[0]=forecastData[8].weather[0].description;
     tempArr[1]=forecastData[16].weather[0].description;
     tempArr[2]=forecastData[24].weather[0].description;
     tempArr[3]=forecastData[32].weather[0].description;
     tempArr[4]=forecastData[39].weather[0].description;
     updateForecast(tempArr);

     let tempArr2=[faCloud,faCloud,faCloud,faCloud,faCloud];
     if(forecastData[8].weather[0].description in iconMapping2)
     tempArr2[0] = iconMapping2[forecastData[8].weather[0].description];
    
     if(forecastData[16].weather[0].description in iconMapping2)
     tempArr2[1] = iconMapping2[forecastData[16].weather[0].description];

     if(forecastData[24].weather[0].description in iconMapping2)
     tempArr2[2] = iconMapping2[forecastData[24].weather[0].description];

     if(forecastData[32].weather[0].description in iconMapping2)
     tempArr2[3] = iconMapping2[forecastData[32].weather[0].description];

     if(forecastData[39].weather[0].description in iconMapping2)
     tempArr2[4] = iconMapping2[forecastData[39].weather[0].description];

     updateForecastIcon(tempArr2);

      let tempArr3=['','','','',''];

      tempArr3[0]=Math.round(forecastData[8].main.feels_like-273.15);
      tempArr3[1]=Math.round(forecastData[16].main.feels_like-273.15);
      tempArr3[2]=Math.round(forecastData[24].main.feels_like-273.15);
      tempArr3[3]=Math.round(forecastData[34].main.feels_like-273.15);
      tempArr3[4]=Math.round(forecastData[39].main.feels_like-273.15);

      updateForecastTemp(tempArr3);
    }
  }


  return (
    <div className={styles.RightSide}>
      <div className={styles.rightTop}>
        <h2 className={styles.cityName}>{city}</h2>
        <h1 className={styles.rightTopTime}>{time}</h1>
        <h2 className={styles.country}>
          {state}{state?',':' '} {fullName}
        </h2>
      </div>
      <div className={styles.rightWeather}>
        <FontAwesomeIcon className={styles.rightIcon} icon={eval(icon)} />
        <h2 className={styles.rightDesc}>{desc}</h2>
        <h2 className={styles.rightTemp}>{temp} °C</h2>
      </div>
      <div className={styles.astronomy}>
        <h2 className={styles.astroHeading}>Sunrise & Sunset</h2>
        <div className={styles.astroCardEle}>
          <FontAwesomeIcon className={styles.astroCardIcon} icon={faSun} />
          <h3 className={styles.astroCardEleAbout}>Sunrise</h3>
          <h3 className={styles.astroCardEleTime}>{sunriseAgo<0?0-sunriseAgo:sunriseAgo} hours {sunriseAgo<0?"left":"ago"}</h3>
          <h3 className={styles.astroCardEleTime2}>{sunrise24}</h3>
        </div>
        <div className={styles.astroCardEle}>
          <FontAwesomeIcon
            className={styles.astroCardIcon}
            icon={faCircleDown}
          />
          <h3 className={styles.astroCardEleAbout}>Sunset</h3>
          <h3 className={styles.astroCardEleTime}>{sunsetAgo<0?0-sunsetAgo:sunsetAgo} hours {sunsetAgo<0?"left":"ago"}</h3>
          <h3 className={styles.astroCardEleTime2}>{sunset24}</h3>
        </div>
        <div className={styles.gap}></div>
        <h2 className={styles.astroHeading}>Moonrise & Moonset</h2>
        <div className={styles.astroCardEle}>
          <FontAwesomeIcon className={styles.astroCardIcon} icon={faMoon} />
          <h3 className={styles.astroCardEleAbout}>Moonrise</h3>
          <h3 className={styles.astroCardEleTime}>{moonriseAgo<0?0-moonriseAgo:moonriseAgo} hours {moonriseAgo<0?"left":"ago"}</h3>
          <h3 className={styles.astroCardEleTime2}>{moonrise24==='NaN mo'?'--':moonrise24}</h3>
        </div>
        <div className={styles.astroCardEle}>
          <FontAwesomeIcon className={styles.astroCardIcon} icon={faStar} />
          <h3 className={styles.astroCardEleAbout}>Moonset</h3>
          <h3 className={styles.astroCardEleTime}>{moonsetAgo<0?0-moonsetAgo:moonsetAgo} hours left</h3>
          <h3 className={styles.astroCardEleTime2}>{moonset}</h3>
        </div>
      </div>
      <div className={styles.astronomy}>
      <h2 className={styles.astroHeading}>Location Coordinates</h2>
      <div className={styles.coordinates}>
        <h3>Latitude : </h3>
        <h3>{lat>0?lat.toFixed(6):lat!=undefined?-lat.toFixed(6):"--"}° {lat>0?'N':'S'}</h3>
        <h3>Longitude : </h3>
        <h3>{lon>0?lon.toFixed(6):lon!=undefined?-lon.toFixed(6):"--"}° {lon>0?'E':'W'}</h3>
      </div>
      </div>
      <div className={styles.astronomy}>
      <h2 className={styles.astroHeading}>Wind Direction</h2>
      <div className={styles.windDirectionELe}>
         <svg style={{width:"25rem"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 331 331"><g fill="none" fillRule="evenodd" opacity=".501"><path fill="#fff" d="M11.5 0 23 23H0z" transform="translate(154 31)"/><path stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel" strokeWidth="2" d="m11.421 250 .158 17.999" transform="translate(154 31)"/><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(3 -566.204 3300.048)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(6 -241.38 1723.694)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(9 -133.006 1197.762)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(12 -78.745 934.435)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(15 -46.128 776.15)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(18 -24.333 670.385)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(21 -8.724 594.63)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(24 3.021 537.632)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(27 12.19 493.137)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel" strokeWidth="2"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(30 19.555 457.394)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(33 25.609 428.015)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(36 30.679 403.409)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(39 34.993 382.473)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(42 38.713 364.42)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(45 41.959 348.673)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(48 44.816 334.798)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(51 47.359 322.465)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(54 49.636 311.415)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(57 51.69 301.446)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel" strokeWidth="2"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(60 53.555 292.394)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(63 55.258 284.128)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(66 56.822 276.539)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(69 58.264 269.538)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(72 59.601 263.051)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(75 60.845 257.016)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(78 62.007 251.379)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(81 63.096 246.095)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(84 64.12 241.125)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(87 65.086 236.437)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel" strokeWidth="2"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(90 66 232)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(93 66.868 227.79)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(96 67.694 223.784)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(99 68.48 219.962)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(102 69.233 216.307)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(105 69.955 212.805)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(108 70.649 209.44)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(111 71.317 206.2)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(114 71.96 203.075)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(117 72.582 200.056)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel" strokeWidth="2"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(120 73.185 197.131)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(123 73.77 194.294)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(126 74.338 191.536)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(129 74.892 188.85)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(132 75.431 186.231)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(135 75.959 183.673)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(138 76.474 181.169)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(141 76.98 178.715)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(144 77.477 176.306)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(147 77.965 173.938)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel" strokeWidth="2"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(150 78.445 171.606)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(153 78.919 169.306)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(156 79.386 167.036)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(159 79.85 164.79)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(162 80.307 162.566)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(165 80.762 160.362)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(168 81.213 158.171)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(171 81.662 155.993)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(174 82.109 153.824)"/></g><g stroke="#fff" strokeLinecap="square" strokeLinejoin="bevel"><path d="m.421 0 .158 17.999M.421 247l.158 17.999" transform="rotate(177 82.554 151.66)"/></g><g fill="#fff" fontFamily="Arial-BoldMT, Arial" fontSize="36" fontWeight="bold"><text transform="translate(60 60)"><tspan x="92.501" y="33">N</tspan></text><text transform="translate(60 60)"><tspan x="178.494" y="118">E</tspan></text><text transform="translate(60 60)"><tspan x="93.494" y="203">S</tspan></text><text transform="translate(60 60)"><tspan x="3.511" y="118">W</tspan></text></g></g></svg>
          <FontAwesomeIcon className={styles.windDirectionIcon} icon={faLocationArrow} style={{rotate:`${windDirectionDegree-45}deg`}}/>
        </div>
      </div>
      <div className={styles.astronomy}>
        <h2 className={styles.astroHeading}> Weather Forecast </h2>
        <div className={`${styles.astroCardEle} ${styles.forecastEle}`}>
        <FontAwesomeIcon className={styles.astroCardIcon} icon={desc==='------'?faQuestion:eval(icon)}/>
          <h3 className={styles.astroCardEleAbout}>Today</h3>
          <h1 className={styles.astroCardEleTemp}>{temp}°</h1>
          <h1 className={styles.astroCardEleTime2}>{desc}</h1>
        </div>
        <div className={`${styles.astroCardEle} ${styles.forecastEle}`}>
        <FontAwesomeIcon className={styles.astroCardIcon} icon={desc==='------'?faQuestion:eval(forecastIcon[0])}/>
          <h3 className={styles.astroCardEleAbout}>Tomorrow</h3>
          <h1 className={styles.astroCardEleTemp}>{temp==='--'?temp:forecastTemp[0]}°</h1>
          <h1 className={styles.astroCardEleTime2}>{desc==='------'?desc:forecast[0]}</h1>
        </div>
        <div className={`${styles.astroCardEle} ${styles.forecastEle}`}>
        <FontAwesomeIcon className={styles.astroCardIcon} icon={desc==='------'?faQuestion:eval(forecastIcon[1])}/>
          <h3 className={styles.astroCardEleAbout}>{days[(d+2)%7]}</h3>
          <h1 className={styles.astroCardEleTemp}>{temp==='--'?temp:forecastTemp[1]}°</h1>
          <h1 className={styles.astroCardEleTime2}>{desc==='------'?desc:forecast[1]}</h1>
        </div>
        <div className={`${styles.astroCardEle} ${styles.forecastEle}`}>
        <FontAwesomeIcon className={styles.astroCardIcon} icon={desc==='------'?faQuestion:eval(forecastIcon[2])}/>
          <h3 className={styles.astroCardEleAbout}>{days[(d+3)%7]}</h3>
          <h1 className={styles.astroCardEleTemp}>{temp==='--'?temp:forecastTemp[2]}°</h1>
          <h1 className={styles.astroCardEleTime2}>{desc==='------'?desc:forecast[2]}</h1>
        </div>
        <div className={`${styles.astroCardEle} ${styles.forecastEle}`}>
        <FontAwesomeIcon className={styles.astroCardIcon} icon={desc==='------'?faQuestion:eval(forecastIcon[3])}/>
          <h3 className={styles.astroCardEleAbout}>{days[(d+4)%7]}</h3>
          <h1 className={styles.astroCardEleTemp}>{temp==='--'?temp:forecastTemp[3]}°</h1>
          <h1 className={styles.astroCardEleTime2}>{desc==='------'?desc:forecast[3]}</h1>
        </div>
        <div className={`${styles.astroCardEle} ${styles.forecastEle}`}>
        <FontAwesomeIcon className={styles.astroCardIcon} icon={desc==='------'?faQuestion:eval(forecastIcon[4])}/>
          <h3 className={styles.astroCardEleAbout}>{days[(d+5)%7]}</h3>
           <h1 className={styles.astroCardEleTemp}>{temp==='--'?temp:forecastTemp[4]}°</h1>
          <h1 className={styles.astroCardEleTime2}>{desc==='------'?desc:forecast[4]}</h1>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
