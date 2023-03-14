package com.integrador.Proyecto_Integrador_G2.entity;


import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "features")
public class Feature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    @NotNull
    private String nameFeature;
    @Column
    private String description;
    @Column
    private Boolean present;
    @Column
    @NotNull
    private String url;

    public Feature(){
    }

    public Feature(String nameFeature, String description, Boolean present, String url) {
        this.nameFeature = nameFeature;
        this.description = description;
        this.present = present;
        this.url = url;
    }

    public Feature(Long id, String nameFeature, String description, Boolean present, String url) {
        this.id = id;
        this.nameFeature = nameFeature;
        this.description = description;
        this.present = present;
        this.url = url;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameFeature() {
        return nameFeature;
    }

    public void setNameFeature(String nameFeature) {
        this.nameFeature = nameFeature;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getPresent() {
        return present;
    }

    public void setPresent(Boolean present) {
        this.present = present;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
