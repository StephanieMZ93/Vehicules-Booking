import React from "react";

function MapBlock() {
  return (
    <div className="map__container">
      <iframe
      className="map__block"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15867.20478216928!2d-75.63247851947158!3d6.157375132620797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4683a2559fc6bb%3A0x9fbf7fbc45c0c14d!2sRENTAUTO%20COLOMBIA%20SAS!5e0!3m2!1ses!2sco!4v1676519197386!5m2!1ses!2sco"
        width="1700"
        height="450"
        style={{border:"0"}}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

export default MapBlock;
