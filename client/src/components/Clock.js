import { useEffect, useState } from 'react';
import '../assets/clock.css';

export default function Clock() {
  const [time, setTime] = useState(new Date());

  const secondHandRot = time.getSeconds() * 6;
  const minuteHandRot = (time.getSeconds() / 60 + time.getMinutes()) * 6;
  const hourHandRot = ((time.getSeconds() / 60 + time.getMinutes()) / 60 + time.getHours()) * 30;

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="clock">
      <div className="hand second" style={{ '--rotation': secondHandRot }} />
      <div className="hand minute" style={{ '--rotation': minuteHandRot }} />
      <div className="hand hour" style={{ '--rotation': hourHandRot }} />
      <div className="number" style={{ '--hour': 1 }}><div className="inner">1</div></div>
      <div className="number" style={{ '--hour': 2 }}><div className="inner">2</div></div>
      <div className="number" style={{ '--hour': 3 }}><div className="inner">3</div></div>
      <div className="number" style={{ '--hour': 4 }}><div className="inner">4</div></div>
      <div className="number" style={{ '--hour': 5 }}><div className="inner">5</div></div>
      <div className="number" style={{ '--hour': 6 }}><div className="inner">6</div></div>
      <div className="number" style={{ '--hour': 7 }}><div className="inner">7</div></div>
      <div className="number" style={{ '--hour': 8 }}><div className="inner">8</div></div>
      <div className="number" style={{ '--hour': 9 }}><div className="inner">9</div></div>
      <div className="number" style={{ '--hour': 10 }}><div className="inner">10</div></div>
      <div className="number" style={{ '--hour': 11 }}><div className="inner">11</div></div>
      <div className="number" style={{ '--hour': 12 }}><div className="inner">12</div></div>
      <div className="text">{time.toTimeString().split(' ')[0]}</div>
    </div>

  );
}
