import React, { useState} from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import appStyles from '../../appStyles';

interface TimerProps {
  onReturn: () => void;
}

enum TimerState {
  Stopped,
  Running
}

const getHours = (seconds: number) => {
  return Math.floor(seconds / 3600) % 60;
};

const getMinutes = (seconds: number) => {
  return Math.floor(seconds / 60) % 60;
};

const getSeconds = (seconds: number) => {
  return seconds % 60;
};

const toTwoDigitString = (value: number) => { 
  return String(value).padStart(2, '0');
};

const calculateSeconds = (hours: number, minutes: number, seconds: number) => {
  return hours * 3600 + minutes * 60 + seconds;
};

const Timer = ({ onReturn }: TimerProps) => {
  const [timerState, setTimerState] = useState(TimerState.Stopped);
  const [countdownSeconds, setcountdownSeconds] = useState(0);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  let timer: NodeJS.Timer;

  const startTimer = () => {
    // timer = setInterval(() => {
    //   // setcountdownSeconds(countdownSeconds - 1);
    //   console.log(">>> here");
    // }, 1000);
  };

  const stopTimer = () => {
    // console.log(">>> clearInterval", timer);
    // clearInterval(timer);
  };

  return (
    <View>
      <Button title="Back" onPress={onReturn}/>
      <View>
        {
          timerState === TimerState.Stopped &&
          <View style={appStyles.row}>
            <TextInput 
              style={componentStyles.constDownNumberEditMode}
              onChangeText={(value) => setHours(parseInt(value))}
              value={toTwoDigitString(hours)}
              keyboardType="decimal-pad"
            />
            <Text style={componentStyles.constDownNumberEditMode}>:</Text>
            <TextInput 
              style={componentStyles.constDownNumberEditMode}
              onChangeText={(value) => setMinutes(parseInt(value))}
              value={toTwoDigitString(minutes)}
              keyboardType="decimal-pad"
            />
            <Text style={componentStyles.constDownNumberEditMode}>:</Text>
            <TextInput 
              style={componentStyles.constDownNumberEditMode}
              onChangeText={(value) => setSeconds(parseInt(value))}
              value={toTwoDigitString(seconds)}
              keyboardType="decimal-pad"
            />
          </View>
        }
        {
          timerState === TimerState.Running &&
          <View style={appStyles.row}>
            <Text style={componentStyles.countDownNumber}>{toTwoDigitString(getHours(countdownSeconds))}</Text>
            <Text style={componentStyles.countDownNumber}>:</Text>
            <Text style={componentStyles.countDownNumber}>{toTwoDigitString(getMinutes(countdownSeconds))}</Text>
            <Text style={componentStyles.countDownNumber}>:</Text>
            <Text style={componentStyles.countDownNumber}>{toTwoDigitString(getSeconds(countdownSeconds))}</Text>
          </View>
        }
      </View>
      <View style={appStyles.buttonRow}>
        {
          timerState === TimerState.Stopped &&
          <Button title="Start" onPress={() => {
            setcountdownSeconds(calculateSeconds(hours, minutes, seconds));
            setTimerState(TimerState.Running);
            startTimer();
          }}/>
        }
        {
          timerState === TimerState.Running &&
          <Button title="Stop" onPress={() => {
            setHours(getHours(countdownSeconds));
            setMinutes(getMinutes(countdownSeconds));
            setSeconds(getSeconds(countdownSeconds));
            setTimerState(TimerState.Stopped);
            stopTimer();
          }}/>
        }
      </View>
    </View>
    
  );
};

const componentStyles = StyleSheet.create({
  constDownNumberEditMode: {
    fontSize: 70,
    color: 'red'
  },
  countDownNumber: {
    fontSize: 70,
  }
});

export default Timer;
