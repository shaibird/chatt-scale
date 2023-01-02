import { checkPropTypes } from "prop-types"
import { Chart } from "../Chart/Chart"

export const UserChart = (props) => {
    
    const chartDataPoints = [
        {label: "V0", value:0},
        {label: "V1", value:0},
        {label: "V2", value:0},
        {label: "V3", value:0},
        {label: "V4", value:0},
        {label: "V5", value:0},
        {label: "V6", value:0},
        {label: "V7", value:0},
        {label: "V8", value:0},
        {label: "V9", value:0},
        {label: "V10", value:0},
        {label: "V11", value:0},
        {label: "V12", value:0}
    ]
    
    for (const send of props.filtered) {
        
        const sendGrade = send.boulderGrade.boulderGrade
        console.log(chartDataPoints[sendGrade.value])
        if(sendGrade === chartDataPoints.label)
        chartDataPoints[sendGrade].value += 1
    }

    return <Chart dataPoints={chartDataPoints}/>
}