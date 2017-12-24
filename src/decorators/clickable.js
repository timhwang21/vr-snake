import React, { Component } from 'react';
import { func } from 'prop-types';
import { VrButton } from 'react-vr';

export default WrappedComponent => class Clickable extends Component {
	static propTypes = {
		onClick: func,
		onLongClick: func,
	};

	static defaultProps = {
		onClick: () => {},
		onLongClick: () => {},
	};

	static displayName = `Clickable.${WrappedComponent.displayName || WrappedComponent.name}`;

	render() {
		const { onClick, onLongClick, ...props } = this.props;

		return (
			<VrButton
				onClick={onClick}
				onLongClick={onLongClick}
			>
				<WrappedComponent {...props}/>
			</VrButton>
		);
	}
}
