import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components

import { AsyncToursComponent, AsyncFlightComponent, AsyncHotelComponent, AsyncInquiryComponent,AsyncAttractionOrderComponent,AsyncCitiescapeOrderComponent } from '../../components/AsyncComponent/AsyncComponent';

const Orders = ({ match }) => (
   <div className="dashboard-wrapper">
      <Switch>
         <Redirect exact from={`${match.url}/`} to={`${match.url}/tours`} />
         <Route path={`${match.url}/attraction`} component={AsyncAttractionOrderComponent} />
         <Route path={`${match.url}/cities_escape`} component={AsyncCitiescapeOrderComponent} />
         <Route path={`${match.url}/tours`} component={AsyncToursComponent} />
         <Route path={`${match.url}/flight`} component={AsyncFlightComponent} />
         <Route path={`${match.url}/hotel`} component={AsyncHotelComponent} />
         <Route path={`${match.url}/inquiry`} component={AsyncInquiryComponent} />
         
      </Switch>
   </div>
);

export default Orders;