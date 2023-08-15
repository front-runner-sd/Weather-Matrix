import axios from "axios";
import { useState } from "react";
import styles from "./Middle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faCloud,faDroplet, faArrowUp,faEye, faPerson, faSearch, faTemperatureArrowDown, faTemperatureArrowUp, faWater, faWind, faUmbrella, faVirusCovid, faFire, faCircleHalfStroke, faDumpsterFire, faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import LineChart from "./LineChart";
import LineChart2 from "./LineChart2";
import LineChart3 from "./LineChart3";
const Middle = (props) => {
  const [maxMin,setMaxMin] = useState({max:40,min:20});
  const [maxMin2,setMaxMin2] = useState({max:2,min:0}); 
  const [maxMin3,setMaxMin3] = useState({max:100,min:50}); 
  const [userData, setUserData] = useState({
    labels:[],
    datasets: [
      {
        data: []
      },
    ],
  });
  const [userData2, setUserData2] = useState({
    labels:[],
    datasets: [
      {
        data: [],
        backgroundColor: '#af00b57e',
        borderColor: "#58005b",
        borderWidth: 3,
        tension:0.3,
      },
    ],
  });  
  const [userData3, setUserData3] = useState({
    labels:[],
    datasets: [
      {
        data: [],
        backgroundColor: 'rgba(174, 60, 255, 0.449)',
        borderColor: "#58005b",
        borderWidth: 3,
        tension:0.3,
      },
    ],
  });
    const dateObj = new Date();
    const dayNum = dateObj.getDay();
    const dayNumMapping = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const day = dayNumMapping[dayNum];
    const monthNum = dateObj.getMonth();
    const monthMapping = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const month = monthMapping[monthNum];
    const date = dateObj.getDate();
    const year = dateObj.getFullYear();

    const feelBase = 27;
    const humidBase = 45;
    const wSpeedBase = 12;
    const presBase = 1010;
    const maxBase = 28;
    const minBase = 22;
    const visiBase = 3; 
    const cloBase = 50;
    const uvBase = 5;

    const pm2_5Base=25;
    const pm10Base=50;
    const so2Base=80;
    const coBase=9400;
    const o3Base=100;
    const noBase=40;
    const no2Base=70;
    const nh3Base=40;
    const aqiNumBase=2;
    
    if(props.airPollutionData.list[0].components.pm2_5==='--'){ 
        
        var feel = props.weatherData.main.feels_like;
        var humid = props.weatherData.main.humidity;
        var wSpeed = props.weatherData.wind.speed;
        var pres = props.weatherData.main.pressure;
        var max = props.weatherData.main.temp_max;
        var min = props.weatherData.main.temp_min;
        var visi = props.weatherData.visibility; 
        var clo = props.weatherData.clouds.all;
    
        var pm2_5=props.airPollutionData.list[0].components.pm2_5;
        var pm10=props.airPollutionData.list[0].components.pm10;
        var so2=props.airPollutionData.list[0].components.so2;
        var co=props.airPollutionData.list[0].components.co;
        var o3=props.airPollutionData.list[0].components.o3;
        var no=props.airPollutionData.list[0].components.no;
        var no2=props.airPollutionData.list[0].components.no2;
        var nh3=props.airPollutionData.list[0].components.nh3;
        var aqi = props.airPollutionData.list[0].main.aqi;
        var aqiNum;

    }
    else{
        const feel_k = props.weatherData.main.feels_like;
        feel = Math.round(feel_k-273.15);
        humid = props.weatherData.main.humidity;
        const wSpeedMPS = props.weatherData.wind.speed;
        wSpeed = Math.round(wSpeedMPS*3.6);
        pres = props.weatherData.main.pressure;
        const max_k = props.weatherData.main.temp_max;
        max =  Math.round(max_k-273.15);
        const min_k = props.weatherData.main.temp_min;
        min =  Math.round(min_k-273.15);
        const visiM = props.weatherData.visibility; 
        visi = Math.round(visiM/1000);
        clo = props.weatherData.clouds.all;

         pm2_5=props.airPollutionData.list[0].components.pm2_5.toFixed(1);
         pm10=Math.round(props.airPollutionData.list[0].components.pm10);
         so2=Math.round(props.airPollutionData.list[0].components.so2);
         co=Math.round(props.airPollutionData.list[0].components.co);
         o3=Math.round(props.airPollutionData.list[0].components.o3);
         no=Math.round(props.airPollutionData.list[0].components.no);
         no2=Math.round(props.airPollutionData.list[0].components.no2);
         nh3=props.airPollutionData.list[0].components.nh3.toFixed(1);
         aqiNum = parseInt(props.airPollutionData.list[0].main.aqi);
        const aqiNumMapping = ["Null","Good","Fair","Moderate","Poor","Worst"];
         aqi=aqiNumMapping[aqiNum];
        var locationName = "";
    }

    const autoComplete = async(event)=>{
        locationName=event.target.value;
    }
    const doSearch = (event)=>{
        if(event.key==='Enter'){
            search();
            event.currentTarget.blur();
        }
    }
    
    const search = async()=>{
      try{
        props.parentLoadingStart(true);
        const res_coordinates = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=1&appid=${props.apiId}`);

        if(res_coordinates.data.length ==0){
            errorHandler();
            return;
        }
        const lat = res_coordinates.data[0].lat;
        const lon = res_coordinates.data[0].lon;

        const completeWeatherJson = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${props.apiId}`);

        props.sendWeatherToParent(completeWeatherJson.data);

        const completeAir = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${props.apiId}`);

        props.sendAirToParent(completeAir.data);


        const options = {
            method: 'GET',
            url: 'https://weatherapi-com.p.rapidapi.com/current.json',
            params: {q: `${lat},${lon}`},
            headers: {
              'X-RapidAPI-Key': `${props.apiId2}`,
              'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
          };

        const uvJson = await axios.request(options);

        props.sendUvToParent(uvJson.data.current.uv);


        const options2 = {
            method: 'GET',
            url: 'https://weatherapi-com.p.rapidapi.com/astronomy.json',
            params: {q: `${lat},${lon}`},
            headers: {
              'X-RapidAPI-Key': `${props.apiId2}`,
              'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
          };
          const astroJson = await axios.request(options2);
          props.sendAstroToParent(astroJson.data);



          const locationJson = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=1&appid=${props.apiId}`); 
          props.sendLocationToParent(locationJson.data);

          const forecastJson = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${props.apiId}`);
          const forecastData = forecastJson.data.list;

          const time = ['','','','','','','','','','','','','','','','',''];
          const tempreture = ['','','','','','','','','','','','','','','','',''];

          for(let i=0;i<17;i++)
          {
             time[i]=`${new Date(forecastData[i].dt_txt).getHours()}:00`;
          }

          for(let i=0;i<17;i++){
            tempreture[i]=Math.round(forecastData[i].main.temp-273.15);
          }

          const maxEle = Math.max(...tempreture)+5;
          const minEle = Math.min(...tempreture)-5;
          setUserData({
            labels: time,
            datasets: [
              {
                label: "Temprature graph",
                data:tempreture,
                fill: true,
                backgroundColor: 'rgba(255, 4, 38,0.25)',
                borderColor: "#db042f",
                borderWidth: 3,
                tension:0.4,
              },
            ],
            
          });
          setMaxMin({max:maxEle,min:minEle});

          const rain = ['','','','','','','','','','','','','','','','',''];
          for(let i=0;i<17;i++){
            rain[i]=forecastData[i].rain?forecastData[i].rain['3h']:0;
          }
          const maxEle2 = Math.max(...rain)+2;
          const minEle2 = 0;
          setUserData2({
            labels: time,
            datasets: [
              {
                data:rain,
                fill: true,
                backgroundColor: 'rgba(0, 69, 161,0.45)',
                borderColor: "#00357b",
                borderWidth: 3,
                tension:0.4,
              },
            ],
            
          });
          setMaxMin2({max:maxEle2,min:minEle2});

          const humid = ['','','','','','','','','','','','','','','','',''];
          for(let i=0;i<17;i++)
          {
            humid[i]=forecastData[i].main.humidity;
          }     
          const maxEle3 = (Math.max(...humid)+5)%100;
          const minEle3 = Math.min(...humid)-5;
          setUserData3({
            labels: time,
            datasets: [
              {
                data:humid,
                fill: true,
                backgroundColor: 'rgba(184, 84, 255, 0.5)',
                borderColor: "#58005b",
                borderWidth: 3,
                tension:0.4,
              },
            ],
            
          });
          setMaxMin3({max:maxEle3,min:minEle3});          
      }
      catch(err){
        console.log(err);
        errorHandler();
      }
    }

    const errorHandler = ()=>{
        const completeErrWeatherJson = {
            "weather": [
              {
                "id": 501,
                "main": "--",
                "description": "------",
                "icon": "10d"
              }
            ],
            "main": {
              "temp": "--",
              "feels_like": "--",
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
              "deg": "--",
              "gust": "--"
            },
            "rain": {
              "1h": "--"
            },
            "clouds": {
              "all": "--"
            },
            "dt": 1661870592,
            "sys": {
              "type": 2,
              "id": 2075663,
              "country": "IT",
              "sunrise": "--",
              "sunset": "--"
            },
            "timezone": 7200,
            "id": 3163858,
            "name":"--",
            "cod": 200
          }   
        props.sendWeatherToParent(completeErrWeatherJson);

        const ErrAirPollutionObj = {
            "coord":[
              50,
              50
            ],
            "list":[
              {
                "dt":"--",
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
        props.sendAirToParent(ErrAirPollutionObj);

        const ErrLocationJson =[
            {
               "name":`No Matching City Found !`,
               "lat":"--",
               "lon":"--",
               "country":"--",
               "state":"--"
            }
         ]  
         props.sendLocationToParent(ErrLocationJson);

        const ErrUvData = "--";
        props.sendUvToParent(ErrUvData);

        const ErrAstroJson = {
            "astronomy": {
              "astro": {
                "sunrise": "--",
                "sunset": "--",
                "moonrise": "--",
                "moonset": "--",
                "moon_phase": "--",
                "moon_illumination": "--",
              }
            }
          }
        props.sendAstroToParent(ErrAstroJson);
        setUserData({
          labels: [],
          datasets: [
            {
              label: "Temprature graph",
              data:[],
              fill: true,
              backgroundColor: '#9aaecbda',
              borderColor: "#00357b",
              borderWidth: 3,
              tension:0.4,
            },
          ],
          
        });
        setUserData2({
          labels: [],
          datasets: [
            {
              data:[],
              fill: true,
              backgroundColor: '#af00b57e',
              borderColor: "#58005b",
              borderWidth: 3,
              tension:0.4,
            },
          ],
          
        });
        setUserData3({
          labels: [],
          datasets: [
            {
              data:[],
              fill: true,
              backgroundColor: 'rgba(174, 60, 255, 0.449)',
              borderColor: "#58005b",
              borderWidth: 3,
              tension:0.4,
            },
          ],
          
        });
    }
  return (
        <div className={styles.Middle}>
            <div className={styles.dateAndSearch}>
                <div className={styles.date}>
                    <div className={styles.upperDate}>{day}</div>
                    <div className={styles.lowerDate}>{`${month} ${date}, ${year}`}</div>
                </div>
                <div className={styles.test}>
                <FontAwesomeIcon className={styles.i_ele} icon={faSearch} />
                <input type="text" id="input" className={styles.input} placeholder="search a city"  onChange={autoComplete} onKeyDown={doSearch}></input>
                </div>
                <button className={styles.searchButton} onClick={search}><FontAwesomeIcon icon={faSearch} /></button>
            </div>
            <div  className={styles.middleMiddle}>
                <div>
                    <h2 className={styles.overview} style={{textAlign:feel==='--'||feel==='---'?"center":"left"}}> {feel==='--'?'Please check the spelling of the city':feel!=='---'?'Today Overview':'Please type a city name and press enter to search'} </h2>
                </div>
                <div className={styles.cardContainer}>
                    <div className={styles.cardEle}>
                        <FontAwesomeIcon className={styles.cardIcon} icon={faPerson}/>
                        <h3 className={styles.cardEleAbout}>Feels Like</h3>
                        <FontAwesomeIcon className={styles.cardIcon2}  style={{color: feelBase<feel? "#FF0000":"#00FF00"}} icon={feelBase<feel?faArrowUp:faArrowDown}/>
                        <h3 className={styles.cardEleRes}>{feel} {feel!=='--'&&feel!=='---'?'°C':' '}</h3>
                    </div>
                    <div className={styles.cardEle}>
                        <FontAwesomeIcon className={styles.cardIcon} icon={faDroplet}/>
                        <h3 className={styles.cardEleAbout}>Humidity</h3>
                        <FontAwesomeIcon className={styles.cardIcon2} style={{color: humidBase<humid? "#FF0000":"#00FF00"}} icon={humidBase<humid?faArrowUp:faArrowDown}/>
                        <h3 className={styles.cardEleRes}>{humid} {humid==='--'?' ':'%'}</h3>
                    </div>
                    <div className={styles.cardEle}>
                        <FontAwesomeIcon className={styles.cardIcon} icon={faWind}/>
                        <h3 className={styles.cardEleAbout}>Wind Speed</h3>
                        <FontAwesomeIcon className={styles.cardIcon2}style={{color: wSpeedBase<wSpeed? "#FF0000":"#00FF00"}} icon={wSpeedBase<wSpeed?faArrowUp:faArrowDown}/>
                        <h3 className={styles.cardEleRes}>{wSpeed}{wSpeed==='--'?' ':'km/h'}</h3>
                    </div>
                    <div className={styles.cardEle}>
                        <FontAwesomeIcon className={styles.cardIcon} icon={faWater}/>
                        <h3 className={styles.cardEleAbout}>Air pressure</h3>
                        <FontAwesomeIcon className={styles.cardIcon2} style={{color: presBase<pres? "#00FF00":"#FF0000"}} icon={presBase<pres?faArrowUp:faArrowDown}/>
                        <h3 className={styles.cardEleRes}>{pres}{pres==='--'?' ':'hPa'}</h3>
                    </div>
                    <div className={styles.cardEle}>
                        <FontAwesomeIcon className={styles.cardIcon} icon={faTemperatureArrowUp}/>
                        <h3 className={styles.cardEleAbout}>Max temp</h3>
                        <FontAwesomeIcon className={styles.cardIcon2} style={{color: maxBase<max? "#FF0000":"#00FF00"}} icon={maxBase<max?faArrowUp:faArrowDown}/>
                        <h3 className={styles.cardEleRes}>{max} {max==='--'?' ':'°C'}</h3>
                    </div>
                    <div className={styles.cardEle}>
                        <FontAwesomeIcon className={styles.cardIcon} icon={faTemperatureArrowDown}/>
                        <h3 className={styles.cardEleAbout}>Min temp</h3>
                        <FontAwesomeIcon className={styles.cardIcon2} style={{color: minBase<min? "#FF0000":"#00FF00"}} icon={minBase<min?faArrowUp:faArrowDown}/>
                        <h3 className={styles.cardEleRes}>{min} {min==='--'?' ':'°C'}</h3>
                    </div>
                    <div className={styles.cardEle}>
                        <FontAwesomeIcon className={styles.cardIcon} icon={faEye}/>
                        <h3 className={styles.cardEleAbout}>Visibility</h3>
                        <FontAwesomeIcon className={styles.cardIcon2} style={{color: visi<visiBase? "#FF0000":"#00FF00"}} icon={visiBase<visi?faArrowUp:faArrowDown}/>
                        <h3 className={styles.cardEleRes}>{visi} {min==='--'?' ':'KM'}</h3>
                    </div>
                    <div className={styles.cardEle}>
                        <FontAwesomeIcon className={styles.cardIcon} icon={faCloud}/>
                        <h3 className={styles.cardEleAbout}>Clouds</h3>
                        <FontAwesomeIcon className={styles.cardIcon2} style={{color: cloBase<clo? "#FF0000":"#00FF00"}} icon={cloBase<clo?faArrowUp:faArrowDown}/>
                        <h3 className={styles.cardEleRes}>{clo}{clo==='--'?' ':'%'}</h3>
                    </div>
                    <div className={styles.cardEle}>
                        <FontAwesomeIcon className={styles.cardIcon} icon={faUmbrella}/>
                        <h3 className={styles.cardEleAbout}>UV Index</h3>
                        <FontAwesomeIcon className={styles.cardIcon2} style={{color: uvBase<props.uvData? "#FF0000":"#00FF00"}} icon={uvBase<props.uvData?faArrowUp:faArrowDown}/>
                        <h3 className={styles.cardEleRes}>{props.uvData}</h3>
                    </div>
                </div>
            </div>
            <div className={styles.middleBottom}>
                <div className={styles.gap}>
                    <h2 className={styles.overview}> Air Pollution </h2>
                </div>
                <div className={`${styles.cardContainer} ${styles.airCardContainer}`}>
                    <div className={`${styles.cardEle} ${styles.airEleQ}`}>
                        <FontAwesomeIcon className={styles.cardIcon} icon={faWind}/>
                        <h3 className={styles.cardEleAbout}>Air Quality</h3>
                        <FontAwesomeIcon className={styles.cardIcon2} style={{color: aqiNumBase<aqiNum? "#FF0000":"#00FF00"}} icon={aqiNumBase>=aqiNum?faArrowUp:faArrowDown}/>
                        <h3 className={styles.cardEleRes}>{aqi}</h3>
                    </div>
                    <div className={`${styles.cardEle} ${styles.airEle}`}>
                        <FontAwesomeIcon className={styles.cardIcon} icon={faFire}/>
                        <h3 className={styles.cardEleAbout}>Co</h3>
                        <FontAwesomeIcon className={styles.cardIcon2} style={{color: coBase<co? "#FF0000":"#00FF00"}} icon={coBase<co?faArrowUp:faArrowDown}/>
                        <h3 className={styles.cardEleRes}>{co}</h3>
                    </div>
                    <div className={`${styles.cardEle} ${styles.airEle}`}>
                        <FontAwesomeIcon className={styles.cardIcon} icon={faWater}/>
                        <h3 className={styles.cardEleAbout}>No</h3>
                        <FontAwesomeIcon className={styles.cardIcon2} style={{color: noBase<no? "#FF0000":"#00FF00"}} icon={noBase<no?faArrowUp:faArrowDown}/>
                        <h3 className={styles.cardEleRes}>{no}</h3>
                    </div>
                    <div className={`${styles.cardEle} ${styles.airEle}`}>
                        <FontAwesomeIcon className={styles.cardIcon} icon={faWater}/>
                        <h3 className={styles.cardEleAbout}>N02</h3>
                        <FontAwesomeIcon className={styles.cardIcon2} style={{color: no2Base<no2? "#FF0000":"#00FF00"}} icon={no2Base<no2?faArrowUp:faArrowDown}/>
                        <h3 className={styles.cardEleRes}>{no2}</h3>
                    </div>
                    <div className={`${styles.cardEle} ${styles.airEle}`}>
                        <FontAwesomeIcon className={styles.cardIcon} icon={faCircleHalfStroke}/>
                        <h3 className={styles.cardEleAbout}>O3</h3>
                        <FontAwesomeIcon className={styles.cardIcon2} style={{color: o3Base<o3? "#FF0000":"#00FF00"}} icon={o3Base<o3?faArrowUp:faArrowDown}/>
                        <h3 className={styles.cardEleRes}>{o3}</h3>
                    </div>
                    <div className={`${styles.cardEle} ${styles.airEle}`}>
                        <FontAwesomeIcon className={styles.cardIcon} icon={faDumpsterFire}/>
                        <h3 className={styles.cardEleAbout}>So2</h3>
                        <FontAwesomeIcon className={styles.cardIcon2} style={{color: so2Base<so2? "#FF0000":"#00FF00"}} icon={so2Base<so2?faArrowUp:faArrowDown}/>
                        <h3 className={styles.cardEleRes}>{so2}</h3>
                    </div>
                    <div className={`${styles.cardEle} ${styles.airEle}`}>
                        <FontAwesomeIcon className={styles.cardIcon} icon={faStarOfLife}/>
                        <h3 className={styles.cardEleAbout}>PM 2.5</h3>
                        <FontAwesomeIcon className={styles.cardIcon2} style={{color: pm2_5Base<pm2_5? "#FF0000":"#00FF00"}} icon={pm2_5Base<pm2_5?faArrowUp:faArrowDown}/>
                        <h3 className={styles.cardEleRes}>{pm2_5}</h3>
                    </div>
                    <div className={`${styles.cardEle} ${styles.airEle}`}>
                        <FontAwesomeIcon className={styles.cardIcon} icon={faVirusCovid}/>
                        <h3 className={styles.cardEleAbout}>PM 10</h3>
                        <FontAwesomeIcon className={styles.cardIcon2} style={{color: pm10Base<pm10? "#FF0000":"#00FF00"}} icon={pm10Base<pm10?faArrowUp:faArrowDown}/>
                        <h3 className={styles.cardEleRes}>{pm10}</h3>
                    </div>
                    <div className={`${styles.cardEle} ${styles.airEle}`}>
                        <FontAwesomeIcon className={styles.cardIcon}  icon={faDroplet}/>
                        <h3 className={styles.cardEleAbout}>NH3</h3>
                        <FontAwesomeIcon className={styles.cardIcon2} style={{color: nh3Base<nh3? "#FF0000":"#00FF00"}} icon={nh3Base<nh3?faArrowUp:faArrowDown}/>
                        <h3 className={styles.cardEleRes}>{nh3}</h3>
                    </div>
                </div>
            </div>
            <div className={styles.chartDiv}>
            <h2 className={styles.overview}> Humidity Forecast Graph</h2>
               <div className={styles.chart3}>
                <LineChart3 chartData={userData3} maxMin3={maxMin3}/>
               </div>
            </div>
            <div className={styles.chartDiv}>

               <h2 className={styles.chart2Overview}> Rain Forecast Graph</h2>
               <div className={styles.chart2}>
                <LineChart2 chartData={userData2} maxMin2={maxMin2}/>
               </div>
            </div>
            <div className={styles.chartDiv}>
            <h2 className={styles.chart2Overview}> Temprature Forecast Graph</h2>
               <div className={styles.chart}>
                <LineChart chartData={userData} maxMin={maxMin}/>
               </div>
            </div>
        </div>
  );
};

export default Middle;


