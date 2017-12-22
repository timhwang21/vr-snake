import React, { Component } from 'react';
import { View } from 'react-vr';

export default WrappedComponent => class Hoverable extends Component {
	static defaultProps = {
		hoverStyle: { color: 'red' },
		onEnter: () => {},
		onExit: () => {},
	};

	static displayName = `Hoverable.${WrappedComponent.displayName || WrappedComponent.name}`;

	state = {
		hover: false,
	};

	get style() {
		const { hoverStyle, style } = this.props;
		const { hover } = this.state;

		return hover
			? { ...style, ...hoverStyle }
			: style;
	}

	onEnter = e => {
		const { onEnter } = this.props;

		this.setState({ hover: true });
		onEnter(e);
	};

	onExit = e => {
		const { onExit } = this.props;

		this.setState({ hover: false });
		onExit(e);
	};

	render() {
		const { style } = this.props;

		return (
			<WrappedComponent
				{...this.props}
				onEnter={this.onEnter}
				onExit={this.onExit}
				style={this.style}
			/>
		);
	}
}
