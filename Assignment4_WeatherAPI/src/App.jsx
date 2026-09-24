import {useState} from "react";
import "./App.css";

export default function App(){
 const [city,setCity]=useState("");
 const [weather,setWeather]=useState(null);
 const [loading,setLoading]=useState(false);
 const [error,setError]=useState("");

 async function search(){
   if(!city.trim()){setError("Please enter a city");return}
   setLoading(true);setError("");setWeather(null);
   try{
     const r=await fetch(`/api/weather?city=${encodeURIComponent(city.trim())}`);
     const d=await r.json();
     if(!r.ok) throw new Error(d.error || "Unable to fetch weather");
     setWeather(d);
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
