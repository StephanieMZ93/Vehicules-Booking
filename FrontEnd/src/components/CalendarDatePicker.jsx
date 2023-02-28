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

// Función para deshabilitar las fechas anteriores al día actual y posteriores a 30 días a partir de la fecha inicial
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

export const CalendarDatePicker = ({ onCalendarChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (dates) => {
    // Si no se seleccionó ninguna fecha, se establecen los estados correspondientes
    if (!dates[0]) {
      setStartDate(null);
      setErrorMessage(null);
      onCalendarChange(dates);
      return;
    }

    const newStartDate = DateTime.fromJSDate(dates[0].toDate()).startOf("day"); // Se obtiene la fecha inicial seleccionada
    const today = DateTime.now().endOf("day"); // Se obtiene la fecha actual

    // Si la fecha inicial seleccionada es anterior al día actual, se establece la fecha actual como la fecha inicial
    if (newStartDate < today.minus({ days: 1 })) {
      setStartDate(today);
      setErrorMessage("Initial date cannot be in the past.");
      onCalendarChange([today.toJSDate(), dates[1].toDate()]); // Se actualiza el rango de fechas seleccionado
    } else {
      const maxSelectableDate = newStartDate.plus({ days: 30 }).endOf("day"); // Se establece una fecha límite 30 días después de la fecha inicial seleccionada
      if (dates[1].diff(newStartDate, 'days') > 30) { // Si el rango de fechas seleccionado es mayor a 30 días, se establece el rango máximo de 30 días a partir de la fecha inicial seleccionada
        setStartDate(newStartDate);
        setErrorMessage("Reservations can only be made for a maximum of 30 days");
        onCalendarChange([newStartDate.toJSDate(), maxSelectableDate.toJSDate()]); // Se actualiza el rango de fechas seleccionado
      } else {
        setStartDate(newStartDate); // Se establece la fecha inicial seleccionada
        setErrorMessage(null); // Se borra cualquier mensaje de error previo
        onCalendarChange(dates); // Se actualiza el rango de fechas seleccionado
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










