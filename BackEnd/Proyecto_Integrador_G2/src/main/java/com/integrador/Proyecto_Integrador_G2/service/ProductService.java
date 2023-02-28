package com.integrador.Proyecto_Integrador_G2.service;


import com.integrador.Proyecto_Integrador_G2.dto.ProductDTO;
import com.integrador.Proyecto_Integrador_G2.entity.*;
import com.integrador.Proyecto_Integrador_G2.exception.ResourceNotFoundException;
import com.integrador.Proyecto_Integrador_G2.repository.BookingRepository;
import com.integrador.Proyecto_Integrador_G2.repository.ProductRepository;
import com.integrador.Proyecto_Integrador_G2.repository.RatingRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private static final Logger LOGGER = Logger.getLogger(ProductService.class);

    private final ProductRepository productRepository;
    private final BookingRepository bookingRepository;

    private final RatingRepository ratingRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, BookingRepository bookingRepository, RatingRepository ratingRepository) {
        this.productRepository = productRepository;
        this.bookingRepository = bookingRepository;
        this.ratingRepository = ratingRepository;
    }

    public List<Product> searchAllProduct(){
        LOGGER.info("All Products were searched: ");
        return productRepository.findAll();
    }

    public Optional<Product> searchProduct(Long id){
        LOGGER.info("A product with ID was searched: "+id);
        return productRepository.findById(id);
    }

    public void deleteProduct(Long id){
        LOGGER.warn("The product with ID has been removed: "+id);
        productRepository.deleteById(id);
    }

    public ProductDTO createProduct(ProductDTO productDTO){
        String carLicensePlate = productDTO.getCarLicensePlate();
        Optional<Product> existingProduct = productRepository.findByCarLicensePlate(carLicensePlate);
        if (existingProduct.isPresent()){
            throw new IllegalArgumentException("Product with license plate" + carLicensePlate +" already exists");
        }

        LOGGER.info("a named product was created: "+productDTO.getProductName());
        Product product = productDTOToProduct(productDTO);
        Product savedProduct = productRepository.save(product);
        return productToProductDTO(savedProduct);
    }

    public void updateProduct(ProductDTO product){
        LOGGER.warn("The product has been updated with ID: "+product.getId());
        productRepository.save(productDTOToProduct(product));

    }

    private ProductDTO productToProductDTO(Product product){
        ///////////////////////////////////////
        ProductDTO respuesta= new ProductDTO();
        ///////////////////////////////////////
        respuesta.setId(product.getId());
        respuesta.setProductName(product.getProductName());
        respuesta.setDescription(product.getDescription());
        respuesta.setBrand(product.getBrand());
        respuesta.setModel(product.getModel());
        respuesta.setAvailability(product.getAvailability());
        respuesta.setPriceDay(product.getPriceDay());
        respuesta.setReserved(product.getReserved());
        respuesta.setCarLicensePlate(product.getCarLicensePlate());
        respuesta.setProductAverage(product.getProductAverage());
        respuesta.setFeaturesProducts(product.getFeaturesProducts());
        respuesta.setImage(product.getImage());
        respuesta.setCategory_id(product.getCategory().getId());
        respuesta.setCity_id(product.getCity().getId());
        ////////////////////////////////////////
        return respuesta;

    }
    private Product productDTOToProduct(ProductDTO productDTO){
        Product respuesta= new Product();
        ////////////////////////////////////////
        Category category=new Category();
        City city= new City();
        category.setId(productDTO.getCategory_id());
        city.setId(productDTO.getCity_id());
        ////////////////////////////////////////
        respuesta.setId(productDTO.getId());
        respuesta.setProductName(productDTO.getProductName());
        respuesta.setDescription(productDTO.getDescription());
        respuesta.setBrand(productDTO.getBrand());
        respuesta.setModel(productDTO.getModel());
        respuesta.setAvailability(productDTO.getAvailability());
        respuesta.setPriceDay(productDTO.getPriceDay());
        respuesta.setReserved(productDTO.getReserved());
        respuesta.setCarLicensePlate(productDTO.getCarLicensePlate());
        respuesta.setProductAverage(productDTO.getProductAverage());
        respuesta.setFeaturesProducts(productDTO.getFeaturesProducts());
        respuesta.setImage(productDTO.getImage());
        /////////////////////////////////////////
        respuesta.setCategory(category);
        respuesta.setCity(city);
        return respuesta;
    }


    public Optional<List<Product>> filterToCity(long id){
        LOGGER.info("A product with ID of city "+ id + " was searched");
       return productRepository.findBycity_idLike(id);
    }

    public Optional<List<Product>> filterToCategory(Long id){
        LOGGER.info("A product with ID of category "+ id + " was searched");
        return productRepository.findBycategory_idLike(id);
    }

    public List<Product> searchAvailableProductsByDate(LocalDate startDate, LocalDate endDate){

        List<Product> availableProducts = new ArrayList<>();

        List<Booking> overlappedBookings = bookingRepository.findByStartDateLessThanEqualAndEndDateGreaterThanEqual(endDate, startDate);

        List<Product> allProducts = productRepository.findAll();

        for (Product product : allProducts){
            boolean isProductAvailable = true;

            for (Booking booking : product.getBooking()){
                if (overlappedBookings.contains(booking)){
                    isProductAvailable = false;
                    break;
                }
            }

            if (isProductAvailable){
                availableProducts.add(product);
            }
        }

        return availableProducts;
    }

    public List<Product> searchAvailableProductsByCityAndDate(long cityId, LocalDate startDate, LocalDate endDate){

        LOGGER.info("Search for available products for city and date");

        //Buscar productos por ciudad
        Optional<List<Product>> productListOptional = productRepository.findBycity_idLike(cityId);
        if (productListOptional.isEmpty()){
            LOGGER.info("No products found for city with ID: "+cityId);
            return Collections.emptyList();
        }

        List<Product> products = productListOptional.get();

        List<Product> availableProducts = new ArrayList<>();

        List<Booking> overlappedBookings = bookingRepository.findByStartDateLessThanEqualAndEndDateGreaterThanEqual(endDate, startDate);

        for (Product product : products){
            boolean isProductAvailable = true;

            for (Booking booking : product.getBooking()){
                if (overlappedBookings.contains(booking)){
                    isProductAvailable = false;
                    break;
                }
            }

            if (isProductAvailable){
                availableProducts.add(product);
            }
        }

        return availableProducts;

    }


    public void updateProductAverage(Long productId) throws ResourceNotFoundException {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isPresent()) {
            List<Rating> ratings = ratingRepository.findByProductId(productId);
            double average = 0.0;
            if (!ratings.isEmpty()) {
                Double sum = 0.0;
                for (Rating rating : ratings) {
                    sum += rating.getRating();
                }
                average = sum / ratings.size();
            }
            Product productEntity = product.get();
            productEntity.setProductAverage(average);
            if (average < 0 || average > 5) {
                throw new IllegalArgumentException("Invalid average rating value: " + average);
            }
            productRepository.save(productEntity);
        } else {
            throw new ResourceNotFoundException("Product not found");
        }
    }


    public Optional<List<Product>> ProductRandom(){
        LOGGER.info("A product Random was searched");
        return productRepository.findRandomProducts();
    }

}

