import { useState, useEffect } from "react";
import Car from "../../components/Car/Car";
import "./App.scss";

import Chart from "../../components/Chart";

function App() {
  const [cars, setCars] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://${process.env.REACT_APP_API_URI}/getCars`
      );
      const responseJson = await response.json();

      setCars(responseJson);

      setChartData(
        responseJson.map((car) => {
          return {
            x: new Date(car.postDate["$date"]),
            y: car.price,
            formattedPrice: car.formattedPrice,
            name: car.announceName,
            imgSrc: car.img,
            url: car.link,
          };
        })
      );
    }
    fetchData();
  }, []);

  if (cars.length > 0) {
    return (
      <>
        <Chart chartSeries={chartData}></Chart>
        <div className="App">
          <h1 style={{ width: "100%" }}>Lista de carros</h1>
          {cars.map((car) => {
            return <Car car={car} />;
          })}
        </div>
      </>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}

export default App;
