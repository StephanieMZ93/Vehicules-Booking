package com.integrador.Proyecto_Integrador_G2.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class BookingDTO {

    private Long id;

    private LocalTime startHour;

    private LocalDate startDate;

    private LocalDate endDate;

    private Long products_id;

    private Long user_id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalTime getStartHour() {
        return startHour;
    }

    public void setStartHour(LocalTime startHour) {
        this.startHour = startHour;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Long getProducts_id() {
        return products_id;
    }

    public void setProducts_id(Long products_id) {
        this.products_id = products_id;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }
}
