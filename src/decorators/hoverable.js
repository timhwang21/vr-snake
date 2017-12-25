import React, { Component } from 'react';
import { object, number, func } from 'prop-types';
import { View } from 'react-vr';

export default WrappedComponent =>
  class Hoverable extends Component {
    static propTypes = {
      hoverStyle: object,
      style: object,
      onEnter: func,
      onExit: func,
      onInput: func,
      onHover: func,
      hoverTimeout: number,
    };
    static defaultProps = {
      onEnter: () => {},
      onExit: () => {},
      onInput: () => {},
      onHover: null,
      hoverTimeout: 0,
    };

    static displayName = `Hoverable.${WrappedComponent.displayName ||
      WrappedComponent.name}`;

    state = {
      hover: false,
    };

    componentDidMount() {
      const { onHover, hoverTimeout } = this.props;

      if (onHover) {
        this.interval = setInterval(this.handleHover, hoverTimeout);
      }
    }

    componentWillUnmount() {
      this.interval && clearInterval(this.interval);
    }

    handleHover = () => {
      const { onHover } = this.props;
      const { hover } = this.state;

      hover && onHover();
    };

    get style() {
      const { hoverStyle, style } = this.props;
      const { hover } = this.state;

      return hover ? { ...style, ...hoverStyle } : style;
    }

    handleEnter = e => {
      const { onEnter } = this.props;

      this.setState({ hover: true });
      onEnter(e);
    };

    handleExit = e => {
      const { onExit } = this.props;

      this.setState({ hover: false });
      onExit(e);
    };

    handleInput = e => {
      const { onInput } = this.props;

      onInput(e);
    };

    render() {
      const {
        onEnter,
        onExit,
        onInput,
        hoverStyle,
        style,
        ...props
      } = this.props;

      return (
        <View
          onEnter={this.handleEnter}
          onExit={this.handleExit}
          onInput={this.handleInput}
        >
          <WrappedComponent {...props} style={this.style} />
        </View>
      );
    }
  };
