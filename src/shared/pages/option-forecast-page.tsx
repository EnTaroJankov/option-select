import TimeSeriesChart from "../components/chart/time-series-plot";
import React, { useRef, useState } from "react";

import clonedeep from "lodash.clonedeep";

export default () => {
  const [data1, setData1] = useState([
    {
      label: "Share Price",
      showLine: true,
      fill: false,
      data: [
        { x: 1, y: 65 },
        { x: 2, y: 59 },
        { x: 3, y: 81 },
        { x: 4, y: 56 },
        { x: 5, y: 55 },
        { x: 6, y: 40 }
      ]
    }
  ]);

  const [data2, setData2] = useState([
    {
      label: "Share Price",
      showLine: true,
      fill: false,
      data: [
        { x: 1, y: 65 },
        { x: 2, y: 59 },
        { x: 3, y: 81 },
        { x: 4, y: 56 },
        { x: 5, y: 55 },
        { x: 6, y: 40 }
      ]
    }
  ]);

  return (
    <div>
      <TimeSeriesChart
        data={data1}
        interactive={true}
        onDataModify={(data: any) => {
          const dataCopy = clonedeep(data);
          dataCopy[0].data = dataCopy[0].data.map(({ x, y }) => ({
            x: 2 * x,
            y: 2 * y
          }));
          setData2(dataCopy);
        }}
      />
      <TimeSeriesChart interactive={false} data={data2} />
    </div>
  );
};
