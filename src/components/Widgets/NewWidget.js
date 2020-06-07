import React, { Component } from 'react';
import "../../../public/style.css";
export default class NewWidget extends Component {
	render() {
		return (
			<div className="new-widget">
				<div className="bg-primary p-50 mb-30">
               <h2 className="text-light">{'This is a new widget'}</h2>
			   
            </div>
			<p>Không hề đơn giản</p>
			</div>
		)
	}
};