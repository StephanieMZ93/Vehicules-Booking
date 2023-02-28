package com.integrador.Proyecto_Integrador_G2.validator;

import com.integrador.Proyecto_Integrador_G2.dto.BookingDTO;
import com.integrador.Proyecto_Integrador_G2.entity.Booking;
import com.integrador.Proyecto_Integrador_G2.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

public class DateValidator {


    private BookingService bookingService;

    public DateValidator(){

    }
    public DateValidator(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    //Metodo setter que permite inyectar la dependencia bookingService en la instancia de DateValidator durante el tiempo de ejecucion.
    public void setBookingService(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    /**
     * Esto se puede reutilizar para otras consultas de validacion.
     * Valida que la fecha final es posterior a la fecha de inicio y que ambas fechas sean en el futuro.
     *
     * @param startDate Fecha de inicio de la reserva.
     * @param endDate   Fecha final de la reserva.
     * @return null si las fechas son válidas, o un mensaje de error si no lo son.
     */
    public static String validateDates(LocalDate startDate, LocalDate endDate) {
        if (endDate.isBefore(startDate)) {
            return "End date is before start date";
        }

        if (startDate.isBefore(LocalDate.now())) {
            return "Start date is in the past";
        }

        if (endDate.isBefore(LocalDate.now())) {
            return "End date is in the past";
        }

        //Comprobar que la busqueda de reserva no supere los 30 dias
        if (ChronoUnit.DAYS.between(startDate, endDate) > 30) {
            return "Reservation cannot exceed 30 days";
        }

        return null;
    }


    public String validateBookingOverlap(BookingDTO bookingDTO) {
        List<Booking> existingBookings = bookingService.searchAllBooking();

        for (Booking existingBooking : existingBookings) {
            if (checkBookingOverlap(bookingDTO.getStartDate(), bookingDTO.getEndDate(), existingBooking.getStartDate(), existingBooking.getEndDate())) {
                return "Booking overlaps with an existing booking";
            }
        }

        return null;
    }

    /**
     * Verifica si hay solapamiento de fechas entre dos reservas.
     *
     * @param startDate  Fecha de inicio de la nueva reserva.
     * @param endDate    Fecha final de la nueva reserva.
     * @param startDate1 Fecha de inicio de la reserva existente a comparar.
     * @param endDate1   Fecha final de la reserva existente a comparar.
     * @return true si hay solapamiento, false si no lo hay.
     */
    public boolean checkBookingOverlap(LocalDate startDate, LocalDate endDate, LocalDate startDate1, LocalDate endDate1) {
        return startDate.isBefore(endDate1) && endDate.isAfter(startDate1);
    }
}
