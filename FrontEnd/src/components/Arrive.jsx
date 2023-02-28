import { React, useState } from 'react';

function Arrive() {

  const [hour,sethour] = useState();


  const OnDateChange = ({ target }) => {
    sethour(target.value);
  };

  console.log("hora", hour);

  return (
    <div className='arrive'>
      
       
        
    <div className='arrive__content'>
    <h1>Your pick up time</h1>
      <img src="" alt="" />
        <div className='arrive__text'>
        <h2>Your car is ready to pick up at {hour}
          
        </h2>
        </div>
        <div className='arrive__text'>
          <label className="labelForm">Select your estimated arrival time</label>
        </div>
        <div>
          <select 
           onChange={OnDateChange}
           required>
           
            <option disabled selected>
              Select hour
            </option>
            <option>00 PM.</option>
            <option>01 AM.</option>
            <option>02 AM.</option>
            <option>03 AM.</option>
            <option>04 AM.</option>
            <option>05 AM.</option>
            <option>06 AM.</option>
            <option>07 AM.</option>
            <option>08 AM.</option>
            <option>09 AM.</option>
            <option>10 AM.</option>
            <option>11 AM.</option>
            <option>12 M.</option>
            <option>13 PM.</option>
            <option>14 PM.</option>
            <option>15 PM.</option>
            <option>16 PM.</option>
            <option>17 PM.</option>
            <option>18 PM.</option>
            <option>19 PM.</option>
            <option>20 PM.</option>
            <option>21 PM.</option>
            <option>22 PM.</option>
            <option>23 PM.</option>
          </select>
        </div>
    </div>
    </div>




  )
}

export default Arrive