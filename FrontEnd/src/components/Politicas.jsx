import React, { useState } from "react";

function Politicas() {
  const [politicsHiden, setpoliticsHiden] = useState({
    general: true,
    cancellation: true,
    safety: true,
  });

  const HandlerpoliticHiden = (key) => {
    setpoliticsHiden({ ...politicsHiden, [key]: !politicsHiden[key] });
  };
  return (
    <div className="politics">
      <h4 className="title">Rental Terms and Conditions</h4>
      <div className="politics-description">
        <div>
          <p className="columns">
            <h4>General</h4>
            <p>
              The renter and driver must have a valid driver's license or
              permit, both physical and digital. In addition, the following
              conditions apply depending on the country of issuance of the
              driver's license:
            </p>
            <div className={politicsHiden.general ? "politics-hide" : ""}>
              <ul>
                <li>
                  Valid driving licenses from the United States, Mexico,
                  Ecuador, Argentina, Brazil, Chile and countries belonging to
                  the European Union will be accepted.
                </li>
                <li>
                  For other countries the driver's license will be complemented
                  with an international driving license.
                </li>
              </ul>
              <p>
                Note: Photocopies, learner's permits and driving licenses with
                circulation restrictions will not be accepted.
              </p>
              <p>
                The minimum age according to the rules applied to Colombia and
                to the possession of the driving license is 18 years old,
                therefore, a rental will not be made to persons under 18 years
                old, in addition, drivers under 25 years old will be charged an
                additional fee.
              </p>
              <p>
                The vehicle will only have permits to travel domestically; if
                you wish to travel abroad you must pay an additional fee and
                take out insurance to cover all requirements.
              </p>
            </div>
            <button
              type="button"
              className="button--5 button__hide"
              onClick={() => HandlerpoliticHiden("general")}
            >
              {politicsHiden.general ? "view more..." : "hide"}
            </button>
            <h4>Safety and Security </h4>
            <p>
              At the time of rental, a service must be contracted with an
              insurance company that covers the following:
            </p>
            <div className={politicsHiden.cancellation ? "politics-hide" : ""}>
              <ul>
                <li>Insurance against damages to third parties.</li>
                <li>Supplementary Civil Liability Insurance.</li>
                <li>Damage and theft coverage.</li>
                <li>Extended roadside assistance.</li>
              </ul>
              <p>
                If an infant is among the passengers, he/she must travel in a
                special seat for him/her.
              </p>
              <p>Remember to respect the road rules.</p>
            </div>
            <button
              type="button"
              className="button--5 button__hide"
              onClick={() => HandlerpoliticHiden("cancellation")}
            >
              {politicsHiden.cancellation ? "view more..." : "hide"}
            </button>
            <h4>Cancellation and Refund</h4>
            <p>
              The reservation can be cancelled before the rental date. In case
              of cancellation, the prepayment amount will be refunded, deducting
              the cancellation fees amounting to the amount of the rental price
              for a maximum of 3 days.
            </p>
            <div className={politicsHiden.safety ? "politics-hide" : ""}>
              <p>
                In case of no-show to pick up the vehicle at the agreed time,
                the prepaid amount will be retained.
              </p>
              <p>
                If you return the vehicle earlier than agreed in the rental
                contract, you will be charged the rental price according to the
                contract. For unused rental days you will receive a partial
                discount.
              </p>
              <p>
                If you return the vehicle later than contracted and do not
                notify us, you will be charged a surcharge per hour of delay.
              </p>
            </div>
            <button
              type="button"
              className="button--5 button__hide"
              onClick={() => HandlerpoliticHiden("safety")}
            >
              {politicsHiden.safety ? "view more..." : "hide"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Politicas;
