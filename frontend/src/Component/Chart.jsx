import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(...registerables);

export default function Chart({ datas, label }) {
  console.log("data in chart", label);

  return (
    <div>
      <Bar
        data={{
          labels: label,
          datasets: [
            {
              label: "Score",
              data: datas,

              backgroundColor: ["rgb(120, 120, 120)"],
            },
          ],
        }}
        height={300}
        width={50}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}
