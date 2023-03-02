import { useState, useEffect } from "react";

import Chart from "./components/Chart";

function App() {
  const [cars, setCars] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://gist.githubusercontent.com/mrov/f0080f612f1f20cf33a54a25f8bb85ee/raw/342d9a6087f3cca28a021ee8838cf93311945423/cars.json"
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
          <h1>Lista de carros</h1>
          {cars.map((car) => {
            return (
              <div className="carCard" key={car._id}>
                <img src={car.img}></img>
                <div>
                  <h4>{car.announceName}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}

export default App;
