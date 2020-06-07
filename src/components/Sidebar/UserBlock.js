/**
 * User Block Component
 */
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Badge } from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import { withRouter } from 'react-router-dom';
import { setCookie, removeCookie, getCookie } from './../../helpers/session';

import { Avatar } from 'antd';
// components
import SupportPage from '../Support/Support';

// redux action
import { logoutUserFromFirebase } from 'Actions';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import config from '../../../config';
import { deleteToken } from '../../firebase';
const ACCOUNT_IMAGE_URL = config.URL_ASSET;



class UserBlock extends Component {

	state = {
		userDropdownMenu: false,
		isSupportModal: false
	}

	/**
	 * Logout User
	 */
	async logoutUser() {
		removeCookie('token');
		await deleteToken();
		window.location.href = "/admin/login"
	}

	/**
	 * Toggle User Dropdown Menu
	 */
	toggleUserDropdownMenu() {
		this.setState({ userDropdownMenu: !this.state.userDropdownMenu });
	}

	/**
	 * Open Support Modal
	 */
	openSupportModal() {
		this.setState({ isSupportModal: true });
	}

	/**
	 * On Close Support Page
	 */
	onCloseSupportPage() {
		this.setState({ isSupportModal: false });
	}

	/**
	 * On Submit Support Page
	 */
	onSubmitSupport() {
		this.setState({ isSupportModal: false });
		NotificationManager.success('Message has been sent successfully!');
	}

	render() {
		const { authUserRes } = this.props;

		return (
			authUserRes.data.image ?
				<div className="top-sidebar">
					<div className="sidebar-user-block">
						<Dropdown
							isOpen={this.state.userDropdownMenu}
							toggle={() => this.toggleUserDropdownMenu()}
							className="rct-dropdown"
						>
							<DropdownToggle
								tag="div"
								className="d-flex align-items-center"
							>
								<div className="user-profile">

									<Avatar size={50} src={ACCOUNT_IMAGE_URL + authUserRes.data.image} />
								</div>
								<div className="user-info">
									<span className="user-name ml-4">{authUserRes.data.lastname}</span>
									<i className="zmdi zmdi-chevron-down dropdown-icon mx-4"></i>
								</div>
							</DropdownToggle>
							<DropdownMenu>
								<ul className="list-unstyled mb-0">
									<li>
										<Link to={{
											pathname: '/app/users/user-profile-1',
											state: { activeTab: 0 }
										}}>
											<i className="zmdi zmdi-account text-primary mr-3"></i>
											<IntlMessages id="widgets.profile" />
										</Link>
									</li>
									<li className="border-top">
										<a className="action-link" onClick={() => this.logoutUser()}>
											<i className="zmdi zmdi-power text-danger mr-3"></i>
											<IntlMessages id="widgets.logOut" />
										</a>
									</li>
								</ul>
							</DropdownMenu>
						</Dropdown>
					</div>
					<SupportPage
						isOpen={this.state.isSupportModal}
						onCloseSupportPage={() => this.onCloseSupportPage()}
						onSubmit={() => this.onSubmitSupport()}
					/>
				</div>
				:
				<div className="top-sidebar">
					<div className="sidebar-user-block">
						<Dropdown
							isOpen={this.state.userDropdownMenu}
							toggle={() => this.toggleUserDropdownMenu()}
							className="rct-dropdown"
						>
							<DropdownToggle
								tag="div"
								className="d-flex align-items-center"
							>
								<div className="user-profile">

									<Avatar size={50} src={ACCOUNT_IMAGE_URL+'/backup.png'} />
								</div>
								<div className="user-info">
									<span className="user-name ml-4">{authUserRes.data.lastname}</span>
									<i className="zmdi zmdi-chevron-down dropdown-icon mx-4"></i>
								</div>
							</DropdownToggle>
							<DropdownMenu>
								<ul className="list-unstyled mb-0">
									<li>
										<Link to={{
											pathname: '/app/users/user-profile-1',
											state: { activeTab: 0 }
										}}>
											<i className="zmdi zmdi-account text-primary mr-3"></i>
											<IntlMessages id="widgets.profile" />
										</Link>
									</li>
									<li className="border-top">
										<a className="action-link" onClick={() => this.logoutUser()}>
											<i className="zmdi zmdi-power text-danger mr-3"></i>
											<IntlMessages id="widgets.logOut" />
										</a>
									</li>
								</ul>
							</DropdownMenu>
						</Dropdown>
					</div>
					<SupportPage
						isOpen={this.state.isSupportModal}
						onCloseSupportPage={() => this.onCloseSupportPage()}
						onSubmit={() => this.onSubmitSupport()}
					/>
				</div>
		);
	}
}

// map state to props
function mapStateToProps(state) {
	return {
		authUserRes: state.authUser
	}
}

export default connect(mapStateToProps, null)(UserBlock);
