import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
//var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Chart2 extends Component {
	render() {
		const options = {
			animationEnabled: true,
			title: {
				text: "Staff Present today"
			},
			subtitles: [{
				text: "255",
				verticalAlign: "center",
				fontSize: 16,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
				//showInLegend: true,
				indexLabel: "{name}: {y}",
				//yValueFormatString: "#,###'%'",
				dataPoints: [
					
					{ name: "Estimation", y: 200},
					//{ name: "Estimation", y: 2},
					
				]
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				 onRef={ref => this.chart = ref} 
			/>
			
		</div>
		);
	}
}
export default Chart2;                              