import React from "react";
import "./App.css";
import TasksChart from "./components/TasksChart";
import WaterLevel from "./components/waterLevel";

function App() {
  return (
    <div className="App">
      <WaterLevel water={"water"} />
    </div>
  );
}

export default App;
