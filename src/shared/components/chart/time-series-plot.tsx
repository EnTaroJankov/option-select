import React, { useMemo, useRef, useState } from "react";

import { usePrevious } from "../../hooks/use-previous";

import ScatterChart from "../chartjs/plot";

import clonedeep from "lodash.clonedeep";
import max from "lodash.max";
import min from "lodash.min";
import range from "lodash.range";
import unzip from "lodash.unzip";

interface Props {
  onShiftData?: (datasetIndex: number, index: number, value: number) => void;
}

export default (props: Props) => {
  const { onShiftData: onChangeData } = props;

  // use of ref is (possibly) temporary; might taken directly from props later
  const dataRef = useRef({
    datasets: [
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
    ]
  });

  const data = useMemo(() => clonedeep(dataRef.current), [dataRef.current]);

  const getYAxisBoundsForCurve = (dataIndex: number) => {
    const ys = data.datasets[dataIndex].data.map(point => point.y);
    const minY = min(ys);
    const maxY = max(ys);
    const range = maxY - minY;
    return [
      max([0, minY - 0.1 * range]),
      maxY + max([0.1 * range, 0.05])
    ] as Array<number>;
  };

  const getYAxisBoundsForAllCurves = () => {
    const [mins, maxs] = unzip(
      range(data.datasets.length).map(getYAxisBoundsForCurve)
    );
    return [min(mins), max(maxs)] as Array<number>;
  };

  // const [options, setOptions] = useState(() => {
  //   const [minY, maxY] = getYAxisBoundsForAllCurves()
  //   return {
  //     dragData: true,
  //     onDragEnd: (_, dataSetIndex: number, index: number, value: number) => {
  //       console.log(JSON.stringify(value))
  //       recomputeGraphOptions()
  //       onChangeData && onChangeData(dataSetIndex, index, value)
  //     },
  //     legend: {
  //       onClick: e => e.stopPropagation()
  //     },
  //     scales: {
  //       yAxes: [{
  //         display: true,
  //         ticks: {
  //           suggestedMin: minY,
  //           suggestedMax: maxY
  //         }
  //       }]
  //     }
  //   }
  // });

  // const recomputeGraphOptions = () => {
  //   const [minY, maxY] = getYAxisBoundsForAllCurves()
  //   setOptions({
  //     ...options,
  //     scales: {
  //       yAxes: [{
  //         display: true,
  //         ticks: {
  //           suggestedMin: minY, //min
  //           suggestedMax: maxY  //max
  //         }
  //       }]
  //     }
  //   })
  // }

  return (
    <ScatterChart
      data={data}
      options={{}}
      dragOptions={{}}
      interactive={true}
    />
  );
};
