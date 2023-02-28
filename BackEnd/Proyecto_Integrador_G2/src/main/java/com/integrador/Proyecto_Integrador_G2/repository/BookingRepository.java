package com.integrador.Proyecto_Integrador_G2.repository;

import com.integrador.Proyecto_Integrador_G2.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByStartDateLessThanEqualAndEndDateGreaterThanEqual(LocalDate endDate, LocalDate startDate);

    List<Booking> findByUser_idLike(Long user_id);
}
