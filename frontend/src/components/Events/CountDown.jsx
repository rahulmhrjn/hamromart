import React, { useEffect, useState } from "react";
import { server } from "../../server";
import axios from "axios";

const CountDown = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    if (
      typeof timeLeft.days === "undefined" &&
      typeof timeLeft.hours === "undefined" &&
      typeof timeLeft.minutes === "undefined" &&
      typeof timeLeft.seconds === "undefined"
    ) {
      if (data && data._id) {
        axios.delete(`${server}/event/delete-shop-event/${data._id}`)
          .then(response => {
            // Handle the response if needed
          })
          .catch(error => {
            console.error('Error deleting event:', error);
          });
      } else {
        console.error('Invalid data structure or missing _id property.');
      }
    }
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = data && data.Finish_Date
    ? +new Date(data.Finish_Date) - +new Date()
    : 0;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }
    return (
      <span className="text-[25px] text-[#475ad2]">
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px]">Time's Up!</span>
      )}
    </div>
  );
};

export default CountDown;
