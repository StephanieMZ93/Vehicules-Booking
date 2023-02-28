package com.integrador.Proyecto_Integrador_G2.repository;

import com.integrador.Proyecto_Integrador_G2.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CityRepository extends JpaRepository<City, Long> {

    Optional<City> findBynameCity(String nameCity);
}
