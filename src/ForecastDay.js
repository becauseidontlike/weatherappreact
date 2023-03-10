import React from "react";


export default function ForecastDay(props) {

let iconId = props.data.weather[0].icon;
let link = `http://openweathermap.org/img/wn/${iconId}@2x.png`;

function maxT() {
    let maxT = Math.round(props.data.temp.max);
    return `${maxT}°`;
}

function minT() {
    let minT = Math.round(props.data.temp.min);
    return `${minT}°`;
}

function day() {
let date = new Date(props.data.dt * 1000);
let day = date.getDay();
let days =["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
return days[day];
}

    return(
        <div className="Forecastday">
                <div className="forecastday">{day()}</div>
                <div className="forecasticon"><img src={link} alt="forecast-icon"></img></div>
                <div className="forecasttemp"><span className="tempmax">{maxT()} |</span><span className="tempmin"> {minT()}</span></div>
        </div>
    );
}
