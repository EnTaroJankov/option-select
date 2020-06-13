import React, { useMemo, useRef } from "react";

import ScatterChart from "../chartjs/plot";

import clonedeep from "lodash.clonedeep";
import max from "lodash.max";
import min from "lodash.min";
import range from "lodash.range";
import unzip from "lodash.unzip";

interface Props {
  data: any;
  onDataModify?: (data: any) => void;
  interactive: boolean;
}

export default (props: Props) => {
  const { data, interactive, onDataModify } = props;

  const dataCopy = useMemo(
    () => ({
      datasets: clonedeep(data)
    }),
    [data]
  );

  return (
    <ScatterChart
      data={dataCopy}
      options={{}}
      dragOptions={{}}
      interactive={interactive}
      onDataModify={props.onDataModify}
      externalRefresh={true}
    />
  );
};
