package com.integrador.Proyecto_Integrador_G2.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "cities")
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    @NotNull
    private String nameCity;
    @OneToMany(mappedBy = "city",fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Product> product=new HashSet<>();

    public City(){
    }

    public City(String nameCity, Set<Product> product) {
        this.nameCity = nameCity;
        this.product = product;
    }

    public City(Long id, String nameCity, Set<Product> product) {
        this.id = id;
        this.nameCity = nameCity;
        this.product = product;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameCity() {
        return nameCity;
    }

    public void setNameCity(String nameCity) {
        this.nameCity = nameCity;
    }

    public Set<Product> getProduct() {
        return product;
    }

    public void setProduct(Set<Product> product) {
        this.product = product;
    }
}
