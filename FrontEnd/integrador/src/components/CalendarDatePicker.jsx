import { DatePicker, Space } from "antd";
import { DateTime } from "luxon";
import { useState } from "react";
const { RangePicker } = DatePicker;

//COMMENTED FUNCTIONS IN CASE WE REQUIRED TO DISABLE TIME
// function range(start, end) {
//   const result = [];
//   for (let i = start; i < end; i++) {
//     result.push(i);
//   }
//   return result;
// }

// function disabledDateTime() {
//   return {
//     disabledHours: () => range(0, 24).splice(4, 20),
//     disabledMinutes: () => range(30, 60),
//     disabledSeconds: () => [55, 56],
//   };
// }

//Este calendario valida de que no se escojan fechas del pasado con respecto a la fecha actual y restringe un rango de fechas maximo de 30 dias para la reserva, estableciendo una fecha inicial y una fecha final

// Función para deshabilitar las fechas anteriores al día actual y posteriores a 30 días a partir de la fecha inicial en el calendario
function disabledDate(current, startDate, maxSelectableDate) {
  
  const today = DateTime.now().endOf("day");
  // Si no hay fecha inicial seleccionada, se deshabilitan las fechas anteriores al día actual
  if (!startDate) {
    return current && current < today;
  }
  // Si no se proporciona una fecha máxima seleccionable, se establece una fecha límite 30 días después de la fecha inicial
  if (!maxSelectableDate) {
    maxSelectableDate = startDate.plus({ days: 30 }).endOf("day");
  }
   // Se deshabilitan las fechas anteriores al día actual, anteriores a la fecha inicial o posteriores a la fecha límite
  return current && (current < today || current < startDate || current > maxSelectableDate);
}

// Definir el calendario y el estado inicial de las variables
export const CalendarDatePicker = ({ onCalendarChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (dates) => {
    // Restablecer los valores de startDate y endDate, en caso de que las fechas sean nulas o vacias.
    if (!dates || !dates.length) {
      setStartDate(null);
      setEndDate(null);
      setErrorMessage(null);
      onCalendarChange(dates);
      return;
    }
  
    const newStartDate = DateTime.fromJSDate(dates[0].toDate()).startOf("day");
    const today = DateTime.now().endOf("day");
  
    //Validar que la fecha no se encuentre en el pasado y que el rango de fechas seleccionado no supere los 30 dias
    if (newStartDate < today.minus({ days: 1 })) {
      setStartDate(today);
      setErrorMessage("Initial date cannot be in the past.");
      onCalendarChange([today.toJSDate(), dates[1].toDate()]);
    } else {
      const maxSelectableDate = newStartDate.plus({ days: 30 }).endOf("day");
      if (dates[1].diff(newStartDate, 'days') > 30) {
        setStartDate(newStartDate);
        setErrorMessage("Reservations can only be made for a maximum of 30 days");
        onCalendarChange([newStartDate.toJSDate(), maxSelectableDate.toJSDate()]);
      } else {
        setStartDate(newStartDate);
        setErrorMessage(null);
        onCalendarChange(dates);
      }
    }
  }

  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        showTime={false}
        showNow={false}
        format="DD-MM-YYYY"
        size="large"
        disabledDate={(current) => disabledDate(current, startDate)}
        className="searcher__subcontainer__input"
        onChange={handleChange}
      />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </Space>
  );
};
