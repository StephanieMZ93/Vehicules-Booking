import { React, useState } from "react";
import { TimePicker } from "antd";

function Arrive({ setReservDetails, reservDetail, errorTime, showError }) {
  function timeFormat(value1) {
    const value2 = value1.toString();
    return value2.length < 2 ? "0" + value2 : value2;
  }

  const [hour, sethour] = useState();
  const OnTimeChange = (time) => {
    sethour(timeFormat(time.$H) + ":" + timeFormat(time.$m));
    setReservDetails({
      ...reservDetail,
      pickUpTime: timeFormat(time.$H) + ":" + timeFormat(time.$m),
    });
  };

  return (
    <div className="arrive">
      <div className="arrive__content">
        <h1>Your pick up time</h1>
        <img src="" alt="" />
        <div className="arrive__text">
          <h2>Your car is ready to pick up at {hour}</h2>
        </div>
        <div className="arrive__text">
          <label className="labelForm">
            Select your estimated arrival time
          </label>
        </div>
        <TimePicker format={"HH:mm"} onChange={OnTimeChange} footer={null} />
        <h2 className="errorMessage">
          {showError
            ? errorTime
              ? "The Time field cannot be empty"
              : null
            : null}
        </h2>
      </div>
    </div>
  );
}

export default Arrive;
