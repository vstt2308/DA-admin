import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AsyncGroupsComponent, AsyncAssetsComponent } from '../../components/AsyncComponent/AsyncComponent';

// async components


const Grouping = ({ match }) => (
   <div className="dashboard-wrapper">
      <Switch>
         <Redirect exact from={`${match.url}/`} to={`${match.url}/assets`} />
         <Route path={`${match.url}/assets`} component={AsyncAssetsComponent} />
         <Route path={`${match.url}/groups`} component={AsyncGroupsComponent} />
       
      </Switch>
   </div>
);

export default Grouping;