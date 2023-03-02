import { useState, useEffect } from "react";
import Highcharts from "highcharts";

function Chart({ chartSeries }) {
  useEffect(() => {
    chartOption.series[0].data = chartSeries;

    Highcharts.chart('container', chartOption);
  }, [chartSeries]);

  let chartOption = {
    title: {
      text: "Preço de carros seminovos",
    },

    chart: {
      type: "scatter",
      zoomType: "xy",
    },

    subtitle: {
      text: "Source: Olx PE",
    },

    yAxis: {
      title: {
        text: "Preço",
      },
    },

    xAxis: {
      type: "datetime",
      labels: {
        formatter: function () {
          return Highcharts.dateFormat("%b/%e/%Y", this.value);
        },
      },
      accessibility: {
        rangeDescription: "Data Postagem",
      },
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    tooltip: {
      useHTML: true,
      formatter: function () {
        return `<div class="d-flex flex-column">
                      <span class="my-2"><b>Anuncio:</b> ${this.point.name}</span>
                      <span class="my-2"><b>Preço:</b> ${this.point.formattedPrice}</span>
                      <img  class="my-2" src = "${this.point.imgSrc}" height="120" width="200"/>
                    </div>`;
      },
    },

    series: [
      {
        name: "Carros",
        data: [],
      },
    ],

    plotOptions: {
      series: {
        point: {
          events: {
            click: (pointClickEventObject) => {
              window.open(pointClickEventObject.point.url, "_blank").focus();
            },
          },
        },
      },
    },

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };

  return <div id="container" style={{ width: "100%", height: "400px" }}></div>;
}

export default Chart;
