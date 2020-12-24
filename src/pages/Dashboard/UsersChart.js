import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const UsersChart = (props) => {
  const { data } = props;

  const [options] = useState({
    chart: { zoom: { enabled: !1 }, toolbar: { show: !1 } },
    colors: ["#556ee6", "#34c38f"],
    dataLabels: { enabled: !0 },
    stroke: { width: [3, 3], curve: "straight" },
    title: { text: "Usuarios registrados (por mes)", align: "left" },
    grid: { row: { colors: ["transparent", "transparent"], opacity: 0.2 }, borderColor: "#f1f1f1" },
    markers: { style: "inverted", size: 6 },
    xaxis: { categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"], title: { text: "Mes" } },
    legend: { position: "top", horizontalAlign: "right", floating: !0, offsetY: -25, offsetX: -5 },
    responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
  });
  const [series, setSeries] = useState([{ name: "Usuarios", data: [] }]);

  useEffect(() => {
    if (data.length > 0) {
      setSeries([{ name: "Usuarios", data: data }]);
    }
  }, [data]);

  return <ReactApexChart options={options} series={series} type='line' height='380' />;
};

export default React.memo(UsersChart);
