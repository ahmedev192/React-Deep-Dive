import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const [remainingTime, setRemainingTime]=useState(targetTime*1000);
  const dialog=useRef();
  var timer = useRef();

  if(remainingTime<=0)
  {
    clearInterval(timer.current);
    dialog.current.open();
  }
  function handleStart() {
    timer.current = setInterval(() => {
      setRemainingTime(prevtime=> prevtime-10);
    }, 10);
}
 function handleReset()
 {
   setRemainingTime(targetTime*1000);
 }
  function handleStop() {
   clearInterval(timer.current);
   dialog.current.open();
  }
  const isActive= remainingTime>0 && remainingTime<targetTime*1000;
  return (
    <>
    <ResultModal ref={dialog} targetTime={targetTime} title={title} remainingTime={remainingTime} onReset={handleReset}/>
     <section className="challenge">
      <h2>{title}</h2>
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? "s" : ""}
      </p>
      <p>
        <button onClick={isActive ? handleStop : handleStart}>
          {isActive ? "Stop" : "Start"}Challenge
        </button>
      </p>
      <p className={isActive? "active" : undefined}>
        {isActive ? "Timer isrunning..." : " Timer inactive"}
      </p>
    </section>
    </>
  );
}
