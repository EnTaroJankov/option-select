import minBy from "lodash.minby";

import { MouseEvent } from "react";

export const pixelsToCoords = (chart: any, [pX, pY]: [number, number]) => {
  const { top: yTop, bottom: yBottom } = chart.chartArea;
  const { max: yMax } = chart.scales["y-axis-1"];

  const { right: xRight, left: xLeft } = chart.chartArea;
  const { min: xMin } = chart.scales["x-axis-1"];

  const [xScale, yScale] = pixelScales(chart);

  const y = pY > yBottom || pY < yTop ? null : yMax - (pY - yTop) * yScale;

  const x = pX < xLeft || pX > xRight ? null : xMin + (pX - xLeft) * xScale;

  return [x, y];
};

// returns index of nearest point in points array based on pixel distance as well as nearest
// pixel distance
export const nearestPoint = (
  chart: any,
  { x, y }: { x: number; y: number },
  points: Array<{ x: number; y: number }>
): [number, number] => {
  const point: [number, number] = [x, y];
  return (
    minBy(
      points.map(({ x: xi, y: yi }, idx) => [
        idx,
        pixelDistance(chart, [xi, yi], [x, y])
      ]),
      ([_, pDist]) => pDist
    ) || [-1, -1]
  );
};

export const pixelScales = (chart: any): [number, number] => {
  const { right: xRight, left: xLeft } = chart.chartArea;
  const { min: xMin, max: xMax } = chart.scales["x-axis-1"];

  const { top: yTop, bottom: yBottom } = chart.chartArea;
  const { min: yMin, max: yMax } = chart.scales["y-axis-1"];

  return [(xMax - xMin) / (xRight - xLeft), (yMax - yMin) / (yBottom - yTop)];
};

export const pixelDistance = (
  chart: any,
  [x1, y1]: [number, number],
  [x2, y2]: [number, number]
): number => {
  const [dx, dy] = [x2 - x1, y2 - y1];
  const [xScale, yScale] = pixelScales(chart);
  const [dpx, dpy] = [dx / xScale, dy / yScale];
  return dpx * dpx + dpy * dpy;
};

export const distance = (
  [x1, y1]: [number, number],
  [x2, y2]: [number, number]
): number => {
  const [dx, dy] = [x2 - x1, y2 - y1];
  return dx * dx + dy * dy;
};
