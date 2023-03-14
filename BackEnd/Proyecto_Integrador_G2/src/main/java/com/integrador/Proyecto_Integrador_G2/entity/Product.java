package com.integrador.Proyecto_Integrador_G2.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    @NotNull
    private String productName;
    @Column
    @NotNull
    private String description;
    @Column
    @NotNull
    private String brand;
    @Column
    @NotNull
    private String model;
    @Column
    @NotNull
    private String availability;
    @Column
    @NotNull
    private Double priceDay;
    @Column
    @NotNull
    private Boolean reserved;

    @Column(unique = true)
    @NotNull
    private String carLicensePlate;

    @Column
    @NotNull
    private Double productAverage;

    @ManyToMany
    @JoinTable(
            name="product_has_feature",
            joinColumns = @JoinColumn(name="product_idproduct"),
            inverseJoinColumns = @JoinColumn(name = "feature_idfeature")
    )
    private Set<Feature> featuresProducts=new HashSet();

    @OneToMany
    @JoinColumn(name="products_id")
    private Set<Image> image= new HashSet();

    @ManyToOne
    @JoinColumn(name = "category_id",referencedColumnName = "id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "city_id",referencedColumnName = "id")
    private City city;

    @OneToMany(mappedBy = "product",fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Booking> booking=new HashSet<>();

    public Product(){
    }

    public Product(String productName, String description, String brand, String model, String availability, Double priceDay, Boolean reserved, String carLicensePlate, Double productAverage, Set<Feature> featuresProducts, Set<Image> image, Category category, City city, Set<Booking> booking) {
        this.productName = productName;
        this.description = description;
        this.brand = brand;
        this.model = model;
        this.availability = availability;
        this.priceDay = priceDay;
        this.reserved = reserved;
        this.carLicensePlate = carLicensePlate;
        this.productAverage = productAverage;
        this.featuresProducts = featuresProducts;
        this.image = image;
        this.category = category;
        this.city = city;
        this.booking = booking;
    }

    public Product(Long id, String productName, String description, String brand, String model, String availability, Double priceDay, Boolean reserved, String carLicensePlate, Double productAverage, Set<Feature> featuresProducts, Set<Image> image, Category category, City city, Set<Booking> booking) {
        this.id = id;
        this.productName = productName;
        this.description = description;
        this.brand = brand;
        this.model = model;
        this.availability = availability;
        this.priceDay = priceDay;
        this.reserved = reserved;
        this.carLicensePlate = carLicensePlate;
        this.productAverage = productAverage;
        this.featuresProducts = featuresProducts;
        this.image = image;
        this.category = category;
        this.city = city;
        this.booking = booking;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public Double getPriceDay() {
        return priceDay;
    }

    public void setPriceDay(Double priceDay) {
        this.priceDay = priceDay;
    }

    public Boolean getReserved() {
        return reserved;
    }

    public void setReserved(Boolean reserved) {
        this.reserved = reserved;
    }

    public String getCarLicensePlate() {
        return carLicensePlate;
    }

    public void setCarLicensePlate(String carLicensePlate) {
        this.carLicensePlate = carLicensePlate;
    }

    public Double getProductAverage() {
        return productAverage;
    }

    public void setProductAverage(Double productAverage) {
        this.productAverage = productAverage;
    }

    public Set<Feature> getFeaturesProducts() {
        return featuresProducts;
    }

    public void setFeaturesProducts(Set<Feature> featuresProducts) {
        this.featuresProducts = featuresProducts;
    }

    public Set<Image> getImage() {
        return image;
    }

    public void setImage(Set<Image> image) {
        this.image = image;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public Set<Booking> getBooking() {
        return booking;
    }

    public void setBooking(Set<Booking> booking) {
        this.booking = booking;
    }
}
