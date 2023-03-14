package com.integrador.Proyecto_Integrador_G2.repository;

import com.integrador.Proyecto_Integrador_G2.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface RatingRepository extends JpaRepository<Rating, Long> {
    Optional<Rating> findByProductIdAndUserId(Long productId, Long userId);

    List<Rating> findByProductId(Long productId);


}
