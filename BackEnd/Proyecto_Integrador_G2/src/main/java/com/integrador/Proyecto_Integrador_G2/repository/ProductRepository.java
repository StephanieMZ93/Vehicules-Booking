package com.integrador.Proyecto_Integrador_G2.repository;

import com.integrador.Proyecto_Integrador_G2.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<List<Product>> findBycity_idLike(Long id);
    Optional<List<Product>> findBycategory_idLike(Long id);

    Optional<Product> findByCarLicensePlate(String licensePlate);

    @Query(value = "select * from products order by rand()",
    nativeQuery = true)
    Optional<List<Product>> findRandomProducts();

}
