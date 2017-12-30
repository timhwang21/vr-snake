/*
	Modified from @piterwilson/react-vr-head-gesture

	https://github.com/piterwilson/react-vr-head-gesture
 */

import React, { Component } from 'react';
import { func } from 'prop-types';
import { Scene, VrHeadModel } from 'react-vr';

import {
  DIRECTIONS,
  MOTION_DIRECTIONS,
  MOTION_EXPIRY_TIME,
  MOTION_THRESHOLD,
  MOTIONS_TO_TRACK,
} from '../constants';

const initialState = {
  lastPosition: null,
  motionDirection: MOTION_DIRECTIONS.none,
};

export default class HeadGestureDetector extends Component {
  static propTypes = {
    onLeft: func,
    onRight: func,
    onUp: func,
    onDown: func,
  };

  static defaultProps = {
    onLeft: () => {},
    onRight: () => {},
    onUp: () => {},
    onDown: () => {},
  };

  motions = [];

  state = initialState;

  componentDidMount() {
    this.expireMotionInterval = setInterval(
      () => this.enqueueMotion(MOTION_DIRECTIONS.stop),
      MOTION_EXPIRY_TIME,
    );
  }

  componentWillUnmount() {
    clearInterval(this.expireMotionInterval);
  }

  handleHeadPose = () => {
    const { lastPosition } = this.state;

    const [yaw, pitch] = VrHeadModel.yawPitchRoll();

    if (lastPosition) {
      if (Math.abs(yaw - lastPosition.yaw) > MOTION_THRESHOLD) {
        yaw > lastPosition.yaw
          ? this.addMotion(MOTION_DIRECTIONS.right)
          : this.addMotion(MOTION_DIRECTIONS.left);
      } else if (Math.abs(pitch - lastPosition.pitch) > MOTION_THRESHOLD) {
        pitch > lastPosition.pitch
          ? this.addMotion(MOTION_DIRECTIONS.down)
          : this.addMotion(MOTION_DIRECTIONS.up);
      }
    }

    this.analyzeMotions();
    this.setState({
      lastPosition: { pitch, yaw },
    });
  };

  enqueueMotion(direction) {
    this.motions.unshift(direction);

    if (this.motions.length > MOTIONS_TO_TRACK) {
      this.motions.pop();
    }
  }

  addMotion(newMotion) {
    const { motionDirection } = this.state;

    // Check if directions are incompatible
    if (motionDirection === MOTION_DIRECTIONS.upDown) {
      if (
        newMotion === MOTION_DIRECTIONS.left ||
        newMotion === MOTION_DIRECTIONS.right
      ) {
        this.resetMotions();
        return;
      }
    } else if (motionDirection === MOTION_DIRECTIONS.leftRight) {
      if (
        newMotion === MOTION_DIRECTIONS.up ||
        newMotion === MOTION_DIRECTIONS.down
      ) {
        this.resetMotions();
        return;
      }
    } else {
      // No existing motion
      if (
        newMotion === MOTION_DIRECTIONS.up ||
        newMotion === MOTION_DIRECTIONS.down
      ) {
        this.setState({ motionDirection: MOTION_DIRECTIONS.upDown });
      } else {
        this.setState({ motionDirection: MOTION_DIRECTIONS.leftRight });
      }
    }

    this.enqueueMotion(newMotion);
  }

  analyzeMotions() {
    const { onUp, onDown, onLeft, onRight } = this.props;
    const { motionDirection } = this.state;

    if (this.motions.length === MOTIONS_TO_TRACK) {
      const total = this.motions.reduce((sum, n) => sum + n);

      if (total !== 0) {
        return;
      }

      if (motionDirection === MOTION_DIRECTIONS.leftRight) {
        this.motions[0] === MOTION_DIRECTIONS.left
          ? onLeft(DIRECTIONS.left)
          : onRight(DIRECTIONS.right);
      } else if (motionDirection === MOTION_DIRECTIONS.upDown) {
        this.motions[0] === MOTION_DIRECTIONS.up
          ? onUp(DIRECTIONS.up)
          : onDown(DIRECTIONS.down);
      }
    }
  }

  resetMotions() {
    this.motions = [];
    this.setState(initialState);
  }

  render() {
    return <Scene {...this.props} onHeadPose={this.handleHeadPose} />;
  }
}
