/**
 * App Routes
 */
import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// app default layout
import RctAppLayout from 'Components/RctAppLayout';

// router service
import routerService from "../services/_routerService";

import { checkToken } from '../actions/AuthActions';

import { getCookie } from '../helpers/session';

//firebase
import { messaging, requestPM } from '../firebase';
import { sendToken } from '../actions/Notification';


class DefaultLayout extends Component {

	async componentDidMount() {
		const tok = getCookie('token');
		let user_id = "";
		let tokenFCM = "";
		if (tok) {
			await this.props.checkToken(tok).then(res => {
				user_id = res.id;
			});
		}
		await requestPM().then((res) => tokenFCM = res);
		sendToken({ device_id: tokenFCM, user_id: user_id })
	}

	render() {
		const { match } = this.props;
		const token = getCookie('token');
		if (token) {
			return (
				<RctAppLayout>
					{routerService && routerService.map((route, key) =>
						<Route key={key} path={`${match.url}/${route.path}`} component={route.component} />
					)}
				</RctAppLayout>
			);
		} else {
			return (
				<Redirect to='/login' />
			)
		}

	}
}


function mapDispatchToProps(dispatch) {
	return {
		checkToken: (data) => dispatch(checkToken(data))
	}
}

function mapStateToProps(state) {
	return {
		authUserRes: state.authUser
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DefaultLayout));
