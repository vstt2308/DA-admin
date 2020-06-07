import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AsyncIntegrationComponent, AsyncConfigComponent, AsyncOfficeComponent, AsyncCommonAppSettingComponent } from '../../components/AsyncComponent/AsyncComponent';

// async components


const office = ({ match }) => (
   <div className="dashboard-wrapper">
      <Switch>
         <Redirect exact from={`${match.url}/`} to={`${match.url}/integration`} />
         <Route path={`${match.url}/integration`} component={AsyncIntegrationComponent} />
         <Route path={`${match.url}/config`} component={AsyncConfigComponent} />
         <Route path={`${match.url}/office`} component={AsyncOfficeComponent} />
          <Route path={`${match.url}/commonsetting`} component={AsyncCommonAppSettingComponent} />
      </Switch>
   </div>
);

export default office;