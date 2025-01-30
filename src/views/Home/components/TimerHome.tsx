
import React from 'react';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styled from 'styled-components'

const minuteSeconds = 60;
  const hourSeconds = 3600;
  const daySeconds = 86400;
  
  const timerProps = {
    isPlaying: true,
    size: 120,
    strokeWidth: 15,
    trailColor: "#126e82"
  };
  
  const renderTime = (dimension, time) => {
    return (             
      <div className="time-wrapper">
<div className="time">{time}</div>
        <TimeText>
        <div>{dimension}</div>
        </TimeText>
      </div>
    );
  };
  
  // eslint-disable-next-line no-bitwise
  const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
  // eslint-disable-next-line no-bitwise
  const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
  // eslint-disable-next-line no-bitwise
  const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
  // eslint-disable-next-line no-bitwise
  const getTimeDays = (time) => (time / daySeconds) | 0;

const TimerBox = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
  padding: 22px 300px 10px 300px;
  margin-bottom: 20px;
  font-size:28px;
  line-height: 32px;
  max-width: 100%;

  @media (max-width: 1045px) {
    padding: 22px 80px 10px 80px;
  }
}
  `
  const TimeText = styled.div`
  margin-top: -10px;
  font-size:12px;
  text-align: left;

  `

const Timer = () => {

  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = 1646236616; // use UNIX timestamp in seconds

  const remainingTime = endTime - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  return (
  <TimerBox>
    <CountdownCircleTimer
        {...timerProps}
        colors="#7f7f7f"
        duration={daysDuration}
        initialRemainingTime={remainingTime}
        size={0}
      >
        {({ elapsedTime }) =>
          renderTime("DAYS", getTimeDays(daysDuration - elapsedTime))
        }
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        size={0}
        colors="#7f7f7f"
        duration={daySeconds}
        initialRemainingTime={remainingTime % daySeconds}
        onComplete={(totalElapsedTime) => [
          remainingTime - totalElapsedTime > hourSeconds, 10
        ]}
      >
        {({ elapsedTime }) =>
          renderTime("HOURS", getTimeHours(daySeconds - elapsedTime))
        }
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        size={0}
        colors="#7f7f7f"
        duration={hourSeconds}
        initialRemainingTime={remainingTime % hourSeconds}
        onComplete={(totalElapsedTime) => [
          remainingTime - totalElapsedTime > minuteSeconds, 10
        ]}
      >
        {({ elapsedTime }) =>
          renderTime("MINUTES", getTimeMinutes(hourSeconds - elapsedTime))
        }
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        size={0}
        colors="#7f7f7f"
        duration={minuteSeconds}
        initialRemainingTime={remainingTime % minuteSeconds}
        onComplete={(totalElapsedTime) => [
          remainingTime - totalElapsedTime > 0, 10
        ]}
      >
        {({ elapsedTime }) =>
          renderTime("SECONDS", getTimeSeconds(elapsedTime))
        }
      </CountdownCircleTimer>
    </TimerBox>
  )
  
};

export default Timer;