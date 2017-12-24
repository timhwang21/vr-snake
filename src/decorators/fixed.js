import React, { Component } from 'react';
import { VrHeadModel, View } from 'react-vr';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

const getHeadModelState = () => ({
	rotation: VrHeadModel.rotation(),
	yawPitchRoll: VrHeadModel.yawPitchRoll(),
	headMatrix: VrHeadModel.getHeadMatrix(),
});

export default WrappedComponent => class Fixed extends Component {
	static displayName = `Fixed.${WrappedComponent.displayName || WrappedComponent.name}`;

	state = getHeadModelState();

	headMatrixListener = RCTDeviceEventEmitter.addListener(
		'onReceivedHeadMatrix',
		() => this.setState(getHeadModelState()),
	);

	render() {
		const { rotation, yawPitchRoll, headMatrix } = this.state;

		return (
			<View
				style={{
					position: 'absolute',
					layoutOrigin: [0, 2],
					transform: [
						{ translate: [0, 0, 0] },
						{ matrix: headMatrix },
					],
				}}
			>
				<View
					style={{
						position: 'absolute',
						layoutOrigin: [.5, .5],
						transform: [
							{ translate: [0, 0, 0] },
						],
					}}
				>
					<WrappedComponent {...this.props}/>
				</View>
			</View>
		);
	}
}
