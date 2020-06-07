//Newslater widget
import React, { Component, Fragment } from 'react'
import "../../../public/style.css";
// chart
import StackedLineChart from 'Components/Charts/StackedLineChart';

export default class NewslaterCampaign extends Component {
   render() {
      return (
         <Fragment>
            <StackedLineChart />
         </Fragment>
      )
   }
}
