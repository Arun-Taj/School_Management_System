import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const EditExam = () => {
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
    id: 'centerText',
    beforeDraw: (chart) => {
      const { ctx, chartArea } = chart;
      const centerText = chart.config.options.plugins.centerText.text;

      if (!chartArea) return;

      ctx.save();

      // Get the dimensions of the chart
      const { width, height } = chartArea;
      const fontSize = (height / 114).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#000'; // Text color

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
    <div className="grid grid-cols-2 gap-4 p-4 bg-purple-100">
      {/* Estimated Fee This Month */}
      <div className="col-span-2 bg-white p-6 rounded-xl shadow-md">
        <div className="text-center text-[20px] font-bold mb-4">
          Estimated Fee This Month
        </div>
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
        <div className="text-center text-[24px] font-bold mt-4">Estimation</div>
        <div className="text-center text-[24px] font-bold">₹ 35,000</div>
      </div>

      {/* Staff Present Today */}
      <div className="col-span-1 bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
        <div className="text-center text-[20px] font-bold mb-4">Staff Present Today</div>
        <div className="w-1/3 mb-4">
          <Doughnut
            data={{
              labels: ["Remaining", "Present"],
              datasets: [
                {
                  data: [87, 13], // Example data for staff present
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
                  text: '13', // Display the number of staff present
                },
              },
            }}
          />
        </div>
      </div>

      {/* Students Present Today */}
      <div className="col-span-1 bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
        <div className="text-center text-[20px] font-bold mb-4">Students Present Today</div>
        <div className="w-1/3 mb-4">
          <Doughnut
            data={{
              labels: ["Remaining", "Present"],
              datasets: [
                {
                  data: [215, 215], // Example data for students present
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
                  text: '215', // Display the number of students present
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditExam;
