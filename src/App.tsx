import React from "react";
import NavBar from "./shared/components/nav-bar";
import LineChart from "./shared/pages/option-forecast-page";

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <div style={{ width: "500px", height: "500px" }}>
        <LineChart />
      </div>
    </div>
  );
}

export default App;
