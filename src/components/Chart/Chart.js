import { ChartBar } from "./ChartBar"
import "./Chart.css"

export const Chart = (props) => {
    const  dataPointValues = props.chartData.map(dataPoint => dataPoint.value)
    const totalMaximum = Math.max(...dataPointValues)

console.log(props.chartData)
    return <div className="chart">
        {props.chartData.map((dataPoint) =>
            <ChartBar 
            key={dataPoint.label}
            value={dataPoint.value} 
            maxValue={totalMaximum} 
            label={dataPoint.label}/>)}
    </div>
}