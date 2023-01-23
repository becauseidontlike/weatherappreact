import React, { useState } from "react";
import axios from "axios";
import Info from "./Info";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import "./Weather.css";

export default function Weather(props){
const [city, setCity] = useState(props.defaultCity);
const [weather, setWeather] = useState({ready: false});

function handleResponse(response) {
setWeather({
    ready: true,
    temperature: response.data.main.temp,
    wind: response.data.wind.speed,
    humidity: response.data.main.humidity,
    city: response.data.name,
    icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    description: response.data.weather[0].description,
    date: new Date(response.data.dt*1000),
});
}

function search() {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6c8161756616103589832909859e4f86&units=metric`
    axios.get(apiUrl).then(handleResponse);    
}


function handleSubmit(event) {
    event.preventDefault();
    search();
}

function handleCity(event) {
setCity(event.target.value);
}    


if (weather.ready) {
    return (
    <div className="Weather">
        <div className="container">
            <form onSubmit={handleSubmit}>
             <div className="row">
                <div className="col-8">
                <input type="search" placeholder="Search for a city..." className="form-control" autoFocus="on" onChange={handleCity} />
                </div> 
                <div className="col-2">
                <input type="submit" value="Search" className="btn btn-outline-secondary w-100" />
                </div>
                <div className="col-2">
                <input type="submit" value="Current" className="btn btn-outline-secondary  w-100" />
                </div>
             </div>
            </form>
            <Info dataInfo={weather} />
            
        </div>
    </div>
    );
} else {
    search();
    return "Loading..."
}
}