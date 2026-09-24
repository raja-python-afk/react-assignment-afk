import {useState} from "react";
import "./App.css";

const API_KEY=import.meta.env.VITE_OPENWEATHER_API_KEY;

export default function App(){
 const [city,setCity]=useState("");
 const [weather,setWeather]=useState(null);
 const [loading,setLoading]=useState(false);
 const [error,setError]=useState("");

 async function search(){
   if(!city){setError("Please enter a city");return}
   if(!API_KEY){setError("Weather API key is not configured");return}
   setLoading(true);setError("");setWeather(null);
   try{
     const r=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
     if(!r.ok) throw new Error("City not found");
     const d=await r.json();setWeather(d);
   }catch(e){setError(e.message)}
   finally{setLoading(false)}
 }
 return <div className="app"><h1>Weather Dashboard</h1>
 <input value={city} onChange={e=>setCity(e.target.value)} placeholder="Enter city"/>
 <button onClick={search}>Search</button>
 {loading&&<p>Loading...</p>}{error&&<p className="error">{error}</p>}
 {weather&&<div className="weather"><h2>{weather.name}</h2><img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/><p>Temperature: {weather.main.temp} °C</p><p>Humidity: {weather.main.humidity}%</p><p>Wind Speed: {weather.wind.speed} m/s</p><p>Weather: {weather.weather[0].description}</p><p>Sunrise: {new Date(weather.sys.sunrise*1000).toLocaleTimeString()}</p><p>Sunset: {new Date(weather.sys.sunset*1000).toLocaleTimeString()}</p></div>}
 </div>
}