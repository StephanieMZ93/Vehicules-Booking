package com.integrador.Proyecto_Integrador_G2.repository;

import com.integrador.Proyecto_Integrador_G2.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
