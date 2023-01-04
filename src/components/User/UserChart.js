import { useEffect, useState } from "react"
import { Chart } from "../Chart/Chart"



export const UserChart = (props) => {

    const chartDataPoints = [
        { label: "V0", value: 0 },
        { label: "V1", value: 0 },
        { label: "V2", value: 0 },
        { label: "V3", value: 0 },
        { label: "V4", value: 0 },
        { label: "V5", value: 0 },
        { label: "V6", value: 0 },
        { label: "V7", value: 0 },
        { label: "V8", value: 0 },
        { label: "V9", value: 0 },
        { label: "V10", value: 0 },
        { label: "V11", value: 0 },
        { label: "V12", value: 0 }
    ]
    const [userSends, setUserSends] = useState(chartDataPoints)
    const [chartData, setChartData] = useState({})

    useEffect(() => {
        const updatedDataPoints = [...chartDataPoints];
        props.filtered.forEach(send => {
          const sendGrade = send.boulderGrade.boulderGrade;
          const dataPoint = updatedDataPoints.find(dataPoint => dataPoint.label === sendGrade);
          if (dataPoint) {
            dataPoint.value += 1;
          }
        });
        setUserSends(updatedDataPoints);
      }, [props.filtered]);


    return <Chart chartData={userSends}/>
}