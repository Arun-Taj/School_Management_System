import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Chart extends Component {
	render() {
		const options = {
			animationEnabled: true,
			title: {
				text: "Estimated Fee This Month"
			},
			// subtitles: [{
			// 	text: "71% Positive",
			// 	verticalAlign: "center",
			// 	fontSize: 24,
			// 	dockInsidePlotArea: true
			// }],
			data: [{
				type: "doughnut",
				//showInLegend: true,
				indexLabel: "{name}: {y}",
				//yValueFormatString: "#,###'%'",
				dataPoints: [
					
					{ name: "Estimation", y: 35000 },
					{ name: "Collection", y: 35000 },
					{ name: "Remaining", y: 35000 }
				]
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			
		</div>
		);
	}
}
export default Chart;                              