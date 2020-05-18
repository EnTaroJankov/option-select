import React, { useMemo, useRef } from "react";

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

  return (
    <ScatterChart
      data={data}
      options={{}}
      dragOptions={{}}
      interactive={true}
    />
  );
};
