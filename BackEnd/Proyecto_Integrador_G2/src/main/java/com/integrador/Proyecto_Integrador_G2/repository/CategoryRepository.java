package com.integrador.Proyecto_Integrador_G2.repository;

import com.integrador.Proyecto_Integrador_G2.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByTitle(String title);

}
