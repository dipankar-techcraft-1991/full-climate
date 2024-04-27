import { useState } from "react";
import search from "./assets/icons/search.svg";
import BackgroundLayout from "./components/BackgroundLayout";
import WeatherCard from "./components/WeatherCard";
import { useStateContext } from "./Context/Context";
import MiniCard from "./components/MiniCard";

function App() {
  const [input, setInput] = useState("");
  const { weather, setPlace, values, location } = useStateContext();

  const submitCity = () => {
    setPlace(input);
    setInput("");
  };

  return (
    <div className="h-screen w-full px-8 text-white">
      <nav className="flex w-full items-center justify-between p-3">
        <h1 className="text-3xl font-bold tracking-wide">Full Climate</h1>
        <div className="flex w-[15rem] items-center gap-2 overflow-hidden rounded bg-white p-2 shadow-2xl">
          <img src={search} alt="search" className="h-[1.5rem] w-[1.5rem]" />
          <input
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                // submit the form
                submitCity();
              }
            }}
            type="text"
            placeholder="Search City"
            className="w-full text-lg text-[#212121] focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </nav>
      <BackgroundLayout></BackgroundLayout>
      <main className="flex w-full flex-wrap items-center justify-center gap-8 px-[10%] py-4">
        <WeatherCard
          place={location}
          windspeed={weather.wspd}
          humidity={weather.humidity}
          temperature={weather.temp}
          iconString={weather.conditions}
          conditions={weather.conditions}
        />

        <div className="flex w-[60%] flex-wrap justify-center gap-8">
          {values?.slice(1, 7).map((curr) => (
            <MiniCard
              key={curr.datetime}
              time={curr.datetime}
              temp={curr.temp}
              iconString={curr.conditions}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
