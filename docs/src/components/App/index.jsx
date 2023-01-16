import React, { useState } from "react";
import axios from "axios";

export function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("")


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=e770e429df1f2b73a40d4935f273f8ee&units=metric`

{/** Procura Localização e retorna o JSON */}
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation("")
    }
  }


  return (
    <div className="app">
      <div className="search">
        {/** Altera a localização com setLocation pelo valor do input */}
        <input value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location" type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
{/** Esconde Conteudo caso Nome esteja indefinido */}
{/** Hide Content if Name Undefined */}
        {data.name != undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  )
}