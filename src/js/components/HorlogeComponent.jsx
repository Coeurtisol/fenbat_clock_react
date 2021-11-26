import React, { useEffect, useState } from "react";

const HorlogeComponent = () => {
  const dateOptions = {
    weekday: "long",
    day: "2-digit",
    month: "long",
  };
  const hourOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const FormatDateTime = (dateObject) => {
    const date = dateObject.toLocaleDateString("fr-FR", dateOptions);
    const hour = dateObject.toLocaleTimeString("fr-FR", hourOptions);
    return { date, hour };
  };

  const [dateTime, setDateTime] = useState(FormatDateTime(new Date()));

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(FormatDateTime(new Date()));
    }, 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <div className="horloge">
      <h3 className="horloge-day m-0">{dateTime.date}</h3>
      <h2 className="horloge-hour m-0">{dateTime.hour}</h2>
    </div>
  );
};

export default HorlogeComponent;
