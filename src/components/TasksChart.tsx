import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import { type } from "os";
import axios from "axios";
type Props = {
  tasks: any;
};
interface UserData {
  sensorName: string;
  sensorLength: string;
  latitude: number;
  longitude: number;
  prevState: null;
}

const TasksChart: React.FC<Props> = ({ tasks }) => {
  let element = [];
  for (let i = 2020; i < 2039; i++) {
    element.push(i);
  }
  console.log(element);
  const options = {
    chart: {
      height: 350,
      xaxis: {
        categories: element,
      },
      zoom: {
        enabled: true,
      },
    },
  };

  const [first, setfirst] = useState<any[]>([]);
  const [second, setSecond] = useState<any[]>([]);

  const MINUTE_MS = 60000;
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Logs every minute");
      getSensorCount();
      getWaterDepthCount();
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, []);

  function getSensorCount() {
    const dataCount: number[] = [];
    // Make a request for a user with a given ID
    axios.get(`http://localhost:4000/sensors/sensorCounts`).then((res) => {
      let persons = res.data.sensors;
      // eslint-disable-next-line array-callback-return
      persons.map((counts: any) => {
        dataCount.push(counts.sensorCount);
        setfirst(dataCount);
      });
    });
  }

  function getWaterDepthCount() {
    const dataCount: number[] = [];
    // Make a request for a user with a given ID
    axios.get(`http://localhost:4000/sensors/waterDepths`).then((res) => {
      let persons = res.data.sensors;
      console.log(persons);
      // eslint-disable-next-line array-callback-return
      persons.map((counts: any) => {
        dataCount.push(counts.waterDepth);
        setSecond(dataCount);
      });
    });
  }

  const [sensorName, setSensorName] = useState("");
  const [sensorLength, setSensorLength] = useState("");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [user, setUser] = useState<UserData | null>(null);
  const [employeeList, setEmployeeList] = useState([]);

  function addNewSensor(params: any) {
    axios
      .post("http://localhost:4000/sensors", {
        sensorName: sensorName,
        sensorLength: sensorLength,
        latitude: latitude,
        longitude: longitude,
      })
      .then((res) => {
        let persons = res.data.sensors;
        console.log(persons);
      });
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const userData = {
      sensorName,
      sensorLength,
      latitude,
      longitude,
      prevState: null,
    };
    setUser(userData);
    setSensorName("");
    setSensorLength("");
    setLatitude(0);
    setLongitude(0);
  };

  const series = [
    {
      name: "All Tasks",
      data: first,
    },
    {
      name: "My Tasks",
      data: second,
    },
  ];

  return (
    <div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h2>Add Sensor</h2>

        <form
          style={{
            display: "grid",
            alignItems: "center",
            justifyItems: "center",
          }}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="AddSensor"
            onChange={(e) => setSensorName(e.target.value)}
            value={sensorName}
          />
          <input
            type="text"
            placeholder="Sensor Length"
            onChange={(e) => setSensorLength(e.target.value)}
            value={sensorLength}
          />
          <input
            type="number"
            placeholder="
            Latitude"
            onChange={(e: any) => setLatitude(e.target.value)}
            value={latitude}
          />
          <input
            type="number"
            placeholder="Longitude"
            onChange={(e: any) => setLongitude(e.target.value)}
            value={longitude}
          />

          <button onClick={addNewSensor}>Add Employee</button>
        </form>

        {user && JSON.stringify(user, null, 2)}
      </div>

      <ReactApexChart
        type="line"
        options={options}
        series={series}
        height={350}
      />
    </div>
  );
};
export default TasksChart;
