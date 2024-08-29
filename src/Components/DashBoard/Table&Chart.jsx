import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function TableChart() {
  const doughnutData = {
    labels: ["Remaining", "Collected"],
    datasets: [
      {
        data: [35000, 35000], // Remaining and Collected values
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%", // Adjust the size of the inner circle
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: false, // Hide the tooltip
      },
      centerText: {
        text: "", // Placeholder for custom text
      },
    },
  };

  // Custom plugin to draw text in the center of the doughnut
  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { ctx, chartArea } = chart;
      const centerText = chart.config.options.plugins.centerText.text;

      if (!chartArea) return;

      ctx.save();

      // Get the dimensions of the chart
      const { width, height } = chartArea;
      const fontSize = (height / 114).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillStyle = "#000"; // Text color

      // Draw the text in the center of the doughnut
      const textX = width / 2;
      const textY = height / 2;

      ctx.fillText(centerText, textX, textY);
      ctx.restore();
    },
  };

  // Register the custom plugin
  ChartJS.register(centerTextPlugin);
  return (
    <div className="grid grid-cols-5 gap-4 ">
      {/* Class Wise Report */}
      <div className="col-span-3 bg-white rounded-lg shadow-md w-full h-full">
        <p className="text-[20px] font-bold mb-4 text-center">
          Class Wise Report
        </p>
        <div className="overflow-x-auto w-full">
          <table className="w-full bg-purple-200  overflow-hidden">
            <thead>
              <tr className="bg-white text-center text-sm">
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
      <div className="col-span-2 ">
        <div className="grid grid-cols-2 gap-4 h-full bg-purple-100">
          {/* Estimated Fee This Month */}
          <div className="col-span-2 bg-white p-6 rounded-xl shadow-md">
            <div className="text-center text-[20px] font-bold mb-4">
              Estimated Fee This Month
            </div>{" "}
            <div className="text-center text-base mt-4">
              Estimation
            </div>
            <div className="text-center text-[24px] font-bold">₹ 35,000</div>
            <div className="flex justify-around items-center">
              <div className="text-center">
                <p className="text-base">Collection</p>
                <p className="text-[24px] font-bold">₹ 35,000</p>
              </div>
              <div className="w-1/3">
                <Doughnut data={doughnutData} options={options} />
              </div>
              <div className="text-center">
                <p className="text-base">Remaining</p>
                <p className="text-[24px] font-bold">₹ 35,000</p>
              </div>
            </div>
          </div>

          {/* Staff Present Today */}
          <div className="col-span-1 bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
            <div className="text-center text-[20px] font-bold mb-4">
              Staff Present Today
            </div>
            <div className="w-1/3 mb-4">
              <Doughnut
                data={{
                  labels: ["Remaining", "Present"],
                  datasets: [
                    {
                      data: [13, 87], // Example data for staff present
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
                      text: "13", // Display the number of staff present
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Students Present Today */}
          <div className="col-span-1 bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
            <div className="text-center text-[20px] font-bold mb-4">
              Students Present Today
            </div>
            <div className="w-1/3 mb-4">
              <Doughnut
                data={{
                  labels: ["Remaining", "Present"],
                  datasets: [
                    {
                      data: [400, 215], // Example data for students present
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
                      text: "215", // Display the number of students present
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
