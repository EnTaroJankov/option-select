import React, { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import Chart, { ChartData, ChartOptions } from "chart.js";
import "chartjs-plugin-dragdata";
import { usePrevious } from "../../hooks/use-previous";
import { pixelsToCoords, nearestPoint } from "./calculate-coordinates";

interface PropsT {
  externalRefresh?: boolean; // allows parent to mutate data and yield refresh
  data: ChartData;
  options: ChartOptions;
  dragOptions: DragOptionsT;
  interactive: boolean;
  onDoubleClickCoords?: (x: Number, y: Number) => void;
  onDataModify?: (data: any) => void;
}

interface DragOptionsT {
  onDrag?: (e: any, datasetIndex: number, index: number, value: number) => void;
  onDragEnd?: (
    e: any,
    datasetIndex: number,
    index: number,
    value: number
  ) => void;
}

export default (props: PropsT) => {
  const { data, options, dragOptions, interactive, externalRefresh } = props;

  console.log("Scatterplot rerender");
  console.log(data);

  const [internalRefresh, setInternalRefresh] = useState(false);

  // const {refreshSwitch, setRefreshSwitch} = useState(true); // TODO: fix refresh

  const previous = usePrevious(false);

  // const refreshSwitch =
  //  previous !== (externalRefresh || internalRefresh); // TODO: fix refresh

  // console.log(refreshSwitch, previous); // TODO: fix refresh

  const canvasRef = useRef(null);
  const chartRef = useRef<Chart | null>(null);

  const childDragOptions = {
    onDragEnd: (e, datasetIndex, index, value) => {
      props.onDataModify && props.onDataModify(chartRef.current?.data.datasets);
    }
  };

  const fullOptions = useMemo(
    () => ({
      ...options,
      ...(interactive ? childDragOptions : {}),
      dragData: interactive
    }),
    [options, childDragOptions, interactive]
  );

  const modifiedData = useMemo(() => {
    return {
      datasets: (data.datasets || []).map(ds => {
        return {
          ...ds,
          showLine: true
        };
      }),
      ...data
    };
  }, [data]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    // @ts-ignore
    const ctx = canvasRef.current.getContext("2d");

    if (!chartRef.current) {
      chartRef.current = new Chart(ctx, {
        type: "scatter",
        data: modifiedData,
        options: fullOptions
      });
    } else {
      if (externalRefresh) {
        chartRef.current.options = fullOptions;
        chartRef.current.data = data;
      }
    }
    chartRef.current.update();

    //if (internalRefresh) {
    //  setInternalRefresh(false);
    //}
  });

  // cleanup by destroying chart
  useEffect(
    () => () => {
      chartRef.current && chartRef.current.destroy();
    },
    []
  );

  const doubleClickHandler = (e: MouseEvent) => {
    if (interactive && chartRef.current) {
      const [x, y] = pixelsToCoords(chartRef.current, [
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY
      ]);
      const points = ((data.datasets || [])[0] || {}).data || [];
      const [nearestIndex, nearestPQuadrance] = nearestPoint(
        chartRef.current,
        { x, y },
        points as Array<{ x: number; y: number }>
      );
      if (nearestIndex >= 0 && nearestPQuadrance < 20.25) {
        points.splice(nearestIndex, 1);
        props.onDataModify &&
          props.onDataModify(chartRef.current.data.datasets);
        // setInternalRefresh(true); TODO: fix refresh logic
      }
    }
  };

  return <canvas onDoubleClick={doubleClickHandler} ref={canvasRef} />;
};
