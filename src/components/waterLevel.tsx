import React, { useEffect, useState } from "react";
import axios from "axios";
import TasksChart from "./TasksChart";

type Props = {
  water: string;
};

const WaterLevel = (props: Props) => {
  const [first, setfirst] = useState([]);

  useEffect(() => {
    getSensorCount();
  }, []);

  function getSensorCount() {
    // Make a request for a user with a given ID
    axios.get(`http://localhost:4000/sensors/waterDepths`).then((res) => {
      const persons = res.data;
      console.log(persons);
      setfirst(persons.sensors);
      console.log(first);
    });
  }

  axios.get(`http://localhost:4000/sensors`).then((res) => {
    const person = res.data;
  });

  return (
    <div>
      waterLevel{props.water}
      <TasksChart tasks={first} />
    </div>
  );
};
export default WaterLevel;
