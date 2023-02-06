import {useState, useEffect} from "react";
import Highcharts from "highcharts";

import Chart from './components/Chart';



function App() {
  const [cars, setCars] = useState([]);

  let chartOption = {

    title: {
        text: 'Preço de carros seminovos'
    },

    chart: {
      type: 'scatter',
      zoomType: 'xy'
    },

    subtitle: {
        text: 'Source: Olx PE'
    },

    yAxis: {
        title: {
            text: 'Preço'
        }
    },

    xAxis: {
        type: "datetime",
        labels: {
          formatter: function() {
            return Highcharts.dateFormat('%b/%e/%Y', this.value);
          }
        },
        accessibility: {
            rangeDescription: 'Data Postagem'
        }
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    tooltip: {
      useHTML: true,
      formatter: function() {
        return `<div class="d-flex flex-column">
                  <span class="my-2"><b>Anuncio:</b> ${this.point.name}</span>
                  <span class="my-2"><b>Preço:</b> ${this.point.formattedPrice}</span>
                  <img  class="my-2" src = "${this.point.imgSrc}" height="120" width="200"/>
                </div>`
        
      }
    },

    series: [{
        name: 'Carros',
        data: []
    }],

    plotOptions: {
      series: {
        point: {
          events: {
            click: (pointClickEventObject) => {
              window.open(pointClickEventObject.point.url, '_blank').focus();
            }
          }
        }
      }
    },

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:5000/getCars");
      const responseJson = await response.json();

      console.log(responseJson[0]);

      setCars(responseJson);

      chartOption.series[0].data = responseJson.map(car => { 
        return { x: new Date(car.postDate["$date"]),
                 y: car.price, 
                 formattedPrice: car.formattedPrice,
                 name: car.announceName,
                 imgSrc: car.img,
                 url: car.link}
      })

      Highcharts.chart('container', chartOption);
    }
    fetchData();
  }, []);

  if (cars.length > 0) {
    
    return (
      <>
      <div id="container" style={{width: "100%" , height: "400px" }}></div>
      <Chart></Chart>
      <div className="App">
        <h1>Seminovos</h1>
        {
          cars.map(car => {
            return (<div key={car._id}>
              {car.announceName}
            </div>)
          })
        }
      </div>
      </>
    );
  } else {
    return <h1>Loading...</h1>
  }
}

export default App;
