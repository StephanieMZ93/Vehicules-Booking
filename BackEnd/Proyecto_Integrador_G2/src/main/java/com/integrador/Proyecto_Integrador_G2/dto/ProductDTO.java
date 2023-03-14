package com.integrador.Proyecto_Integrador_G2.dto;

import com.integrador.Proyecto_Integrador_G2.entity.Booking;
import com.integrador.Proyecto_Integrador_G2.entity.Feature;
import com.integrador.Proyecto_Integrador_G2.entity.Image;

import java.util.HashSet;
import java.util.Set;

public class ProductDTO {
    private Long id;
    private String productName;
    private String description;
    private String brand;
    private String model;
    private String availability;
    private Double priceDay;
    private Boolean reserved;
    private String carLicensePlate;
    private Double productAverage;
    private Set<Feature> featuresProducts=new HashSet();
    private Set<Image> image= new HashSet();
    private Long category_id;
    private Long city_id;
    private Set<Booking> booking = new HashSet<>();


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

    public Long getCategory_id() {
        return category_id;
    }

    public void setCategory_id(Long category_id) {
        this.category_id = category_id;
    }

    public Long getCity_id() {
        return city_id;
    }

    public void setCity_id(Long city_id) {
        this.city_id = city_id;
    }

    public Set<Booking> getBooking() {
        return booking;
    }

    public void setBooking(Set<Booking> booking) {
        this.booking = booking;
    }
}
