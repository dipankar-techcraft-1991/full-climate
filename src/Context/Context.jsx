import { useContext, createContext, useState, useEffect } from "react";

import axios from "axios";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState("Nagarukhra, Haringhata");
  const [location, setLocation] = useState("");


  // fetch api
  const fetchWeather = async () => {
    const options = {
      method: "GET",
      url: "https://visual-crossing-weather.p.rapidapi.com/forecast",
      params: {
        aggregateHours: "24",
        location: place,
        contentType: "json",
        unitGroup: "metric",
        shortColumnNames: "0",
      },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
        "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(options);
      // console.log(response.data);
      const weatherData = Object.values(response.data.locations)[0];
      setLocation(weatherData.address);
      setValues(weatherData.values);
      setWeather(weatherData.values[0]);
    } catch (error) {
      console.error(error);
      // if api throws error
      alert("This place does not exist!");
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [place]);

  return (
    <StateContext.Provider
      value={{
        weather,
        setPlace,
        values,
        location,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
