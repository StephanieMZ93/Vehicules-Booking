package com.integrador.Proyecto_Integrador_G2.dto;

public class RatingDTO {

    private Long id;
    private Long products_id;

    private Long users_id;

    private Double rating;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProducts_id() {
        return products_id;
    }

    public void setProducts_id(Long products_id) {
        this.products_id = products_id;
    }

    public Long getUsers_id() {
        return users_id;
    }

    public void setUsers_id(Long users_id) {
        this.users_id = users_id;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }
}
