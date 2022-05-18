import React, { Component } from 'react';
import { Button, View } from 'react-native';
import RunningPage from './RunningPage';
import StoppedPage from './StoppedPage';

interface TimerProps {
  onReturn: () => void;
}

enum Operation {
  Stopped,
  Running
}

interface TimerState {
  operation: Operation;
  seconds: number;
}

class Timer extends Component<TimerProps, TimerState> {
  state: TimerState = {
    operation: Operation.Stopped,
    seconds: 0,
  };

  getPage = () => {
    switch(this.state.operation){
    case Operation.Stopped:
      return (
        <StoppedPage
          onStart={(seconds) => {
            this.setState({
              operation: Operation.Running,
              seconds,
            });
          }}
        />
      );
    case Operation.Running:
      return (
        <RunningPage
          onStop={ () => this.setState({ operation: Operation.Stopped })}
          seconds={this.state.seconds}
        />
      );
    default:
      return null;
    }
  };

  render() {
    return (
      <View>
        <Button title="Back" onPress={this.props.onReturn}/>
        {this.getPage()}
      </View>
    );
  }
}

export default Timer;
