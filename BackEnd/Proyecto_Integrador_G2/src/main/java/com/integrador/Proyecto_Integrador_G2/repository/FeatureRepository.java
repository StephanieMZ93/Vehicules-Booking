package com.integrador.Proyecto_Integrador_G2.repository;

import com.integrador.Proyecto_Integrador_G2.entity.Feature;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FeatureRepository extends JpaRepository<Feature, Long> {
    Optional<Feature> findBynameFeature(String nameFeature);
}
