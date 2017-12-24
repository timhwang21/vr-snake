import React, { Component } from 'react';
import { bool } from 'prop-types';

export default WrappedComponent => class Clickable extends Component {
	static propTypes = {
		hidden: bool,
	};

	static displayName = `Hidable.${WrappedComponent.displayName || WrappedComponent.name}`;

	render() {
		const { hidden, ...props } = this.props;

		return hidden ? null : <WrappedComponent {...props}/>;
	}
}
