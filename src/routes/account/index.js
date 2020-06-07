import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AsyncAdminComponent, AsyncRegisteredComponent, AsyncAgentComponent, AsyncSupplierComponent, AsyncPassengerComponent } from '../../components/AsyncComponent/AsyncComponent';

// async components


const Account = ({ match }) => (
   <div className="dashboard-wrapper">
      <Switch>
         <Redirect exact from={`${match.url}/`} to={`${match.url}/registered`} />
         <Route path={`${match.url}/admin`} component={AsyncAdminComponent} />
         <Route path={`${match.url}/registered`} component={AsyncRegisteredComponent} />
         <Route path={`${match.url}/agent`} component={AsyncAgentComponent} />
         <Route path={`${match.url}/supplier`} component={AsyncSupplierComponent} />
         <Route path={`${match.url}/passenger`} component={AsyncPassengerComponent} />
      </Switch>
   </div>
);

export default Account;