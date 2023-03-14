package com.integrador.Proyecto_Integrador_G2.entity;

import javax.persistence.*;


@Entity
@Table(name = "ratings")
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "products_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "users_id")
    private User user;

    private Double rating;

    public Rating(){}

    public Rating(Product product, User user, Double rating) {
        this.product = product;
        this.user = user;
        this.rating = rating;
    }

    public Rating(Long id, Product product, User user, Double rating) {
        this.id = id;
        this.product = product;
        this.user = user;
        this.rating = rating;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }
}
