import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function TableChart() {
  const doughnutData = {
    labels: ["Remaining", "Collected"],
    datasets: [
      {
        data: [35000, 35000],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      centerText: {
        text: "",
      },
    },
  };

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { ctx, chartArea } = chart;
      const centerText = chart.config.options.plugins.centerText.text;

      if (!chartArea) return;

      ctx.save();
      const { width, height } = chartArea;
      const fontSize = height / 4;
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillStyle = "#000";
      const textX = width / 2;
      const textY = height / 2;
      ctx.fillText(centerText, textX, textY);
      ctx.restore();
    },
  };

  ChartJS.register(centerTextPlugin);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 ">
      <div className="col-span-1 lg:col-span-3 bg-white rounded-lg shadow-md w-full h-full">
        <p className="text-xl font-bold mb-4 text-center">Class Wise Report</p>
        <div className="overflow-x-auto w-full">
          <table className="w-full overflow-hidden">
            <thead>
              <tr className="bg-white text-center text-xs lg:text-sm">
                <th className="p-2">Class</th>
                <th className="p-2">Present Today</th>
                <th className="p-2">Absent Today</th>
                <th className="p-2">On Leave</th>
                <th className="p-2">Fees (Monthly)</th>
                <th className="p-2">Paid Amount</th>
                <th className="p-2">Balance</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(12)].map((_, idx) => (
                <tr
                  key={idx}
                  className={`border border-gray-300 ${
                    idx % 2 === 0 ? "bg-[#BCA8EA]" : "bg-[#E3D6FF]"
                  }`}
                >
                  <td className="p-2 text-center">{idx + 1}</td>
                  <td className="p-2 text-center">35</td>
                  <td className="p-2 text-center">15</td>
                  <td className="p-2 text-center">5</td>
                  <td className="p-2 text-center">15,000</td>
                  <td className="p-2 text-center">9,000</td>
                  <td className="p-2 text-center">6,000</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Estimated Fee This Month */}
      <div className="col-span-1 lg:col-span-2 space-y-4">
        {/* Estimated Fee This Month */}
        <div className="bg-white p-6 rounded-xl shadow-md text-center h-auto flex flex-col items-center">
          <div className="text-lg md:text-xl font-bold mb-4">Estimated Fee This Month</div>
          <div className="text-sm md:text-base mt-4">Estimation</div>
          <div className="text-xl md:text-2xl font-bold">₹ 35,000</div>

          {/* Flex container for collection and remaining */}
          <div className="flex flex-col md:flex-row justify-around items-center mt-4 w-full">
            <div className="text-center md:w-[30%]">
              <p className="text-sm md:text-base">Collection</p>
              <p className="text-xl md:text-2xl font-bold">₹ 35,000</p>
            </div>

            {/* Doughnut Chart */}
            <div className="w-full md:w-[40%] flex justify-center mb-4">
              <Doughnut data={doughnutData} options={options} />
            </div>

            {/* Remaining Amount */}
            <div className="text-center md:w-[30%]">
              <p className="text-sm md:text-base">Remaining</p>
              <p className="text-xl md:text-2xl font-bold">₹ 35,000</p>
            </div>
          </div>
        </div>

        {/* Staff Present Today & Students Present Today */}
        <div className="flex flex-col md:flex-row gap-4 h-auto">
          {/* Staff Present Today */}
          <div className="flex-1 bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
            <div className="text-center text-lg font-bold mb-4">
              Staff Present Today
            </div>
            <div className="w-full md:w-[60%] flex justify-center mb-4">
              <Doughnut
                data={{
                  labels: ["Remaining", "Present"],
                  datasets: [
                    {
                      data: [100, 87],
                      backgroundColor: ["#E3E3E3", "#8B5CF6"],
                      borderWidth: 0,
                    },
                  ],
                }}
                options={{
                  ...options,
                  plugins: {
                    ...options.plugins,
                    centerText: {
                      text: "13",
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Students Present Today */}
          <div className="flex-1 bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
            <div className="text-center text-lg font-bold mb-4">
              Students Present Today
            </div>
            <div className="w-full md:w-[60%] flex justify-center mb-4">
              <Doughnut
                data={{
                  labels: ["Remaining", "Present"],
                  datasets: [
                    {
                      data: [400, 400],
                      backgroundColor: ["#E3E3E3", "#8B5CF6"],
                      borderWidth: 0,
                    },
                  ],
                }}
                options={{
                  ...options,
                  plugins: {
                    ...options.plugins,
                    centerText: {
                      text: "215",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      
    
    </div>
  );
}

export default TableChart;
