import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [running]);

  const formatTime = (time) => {
    const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
    const hours = `0${Math.floor(time / 3600000)}`.slice(-2);
    return `${hours}:${minutes}:${seconds}.${getMilliseconds}`;
  };

  return (
    <div className="stopwatch">
      <div className="time">{formatTime(time)}</div>
      <div className="buttons">
        {!running && time === 0 && (
          <button onClick={() => setRunning(true)}>Start</button>
        )}
        {running && <button onClick={() => setRunning(false)}>Stop</button>}
        {!running && time > 0 && (
          <button onClick={() => setTime(0)}>Reset</button>
        )}
        {!running && time > 0 && (
          <button onClick={() => setRunning(true)}>Resume</button>
        )}
      </div>
    </div>
  );
};

export default App;
