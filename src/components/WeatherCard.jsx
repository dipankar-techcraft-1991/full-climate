/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDate } from "../utils/useDate";
import sun from "../assets/icons/sun.png";
import cloud from "../assets/icons/cloud.png";
import fog from "../assets/icons/fog.png";
import rain from "../assets/icons/rain.png";
import snow from "../assets/icons/snow.png";
import storm from "../assets/icons/storm.png";
import wind from "../assets/icons/windy.png";
import "../index.css";

const WeatherCard = ({
  temperature,
  windspeed,
  humidity,
  place,
  iconString,
  conditions,
}) => {
  const [icon, setIcon] = useState(sun);
  const { time } = useDate();

  let temp = temperature;

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes("cloud")) {
        setIcon(cloud);
      } else if (iconString.toLowerCase().includes("rain")) {
        setIcon(rain);
      } else if (iconString.toLowerCase().includes("clear")) {
        setIcon(sun);
      } else if (
        iconString.toLowerCase().includes("thunder") ||
        iconString.toLowerCase().includes("storm")
      ) {
        setIcon(storm);
      } else if (iconString.toLowerCase().includes("fog")) {
        setIcon(fog);
      } else if (iconString.toLowerCase().includes("snow")) {
        setIcon(snow);
      } else if (iconString.toLowerCase().includes("wind")) {
        setIcon(wind);
      }
    }
  }, [iconString, temperature]);

  return (
    <div className="glassCard h-[30rem] w-[22rem] min-w-[22rem] p-4">
      <div className="flex w-full items-center justify-center  text-3xl font-semibold">
        {conditions}
      </div>

      <hr className="mt-2 bg-slate-600" />

      <div className="just-center mb-4 mt-6 flex w-full items-center gap-4">
        <img src={icon} alt="weather_icon" />
        <p className="flex items-center justify-center text-5xl font-bold">
          {temp}&deg;C
        </p>
      </div>
      <div className="text-center text-xl font-bold">{place}</div>
      <div className="mt-4 flex w-full items-center justify-between">
        <p className="flex-1 p-2 text-center">{new Date().toDateString()}</p>
        <p className="flex-1 p-2 text-center">{time}</p>
      </div>
      <div className="mt-4 flex w-full items-center justify-between gap-4">
        <p className="flex-1 rounded-lg bg-blue-600 p-2 text-center font-bold shadow">
          Wind Speed <p className="font-normal">{windspeed} km/h</p>
        </p>
        <p className="flex-1 rounded-lg bg-green-600 p-2 text-center font-bold">
          Humidity <p className="font-normal">{humidity} gm/m&#179;</p>
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
