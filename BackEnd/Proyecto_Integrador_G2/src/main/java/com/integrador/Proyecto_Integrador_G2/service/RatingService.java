package com.integrador.Proyecto_Integrador_G2.service;

import com.integrador.Proyecto_Integrador_G2.dto.RatingDTO;
import com.integrador.Proyecto_Integrador_G2.entity.Product;
import com.integrador.Proyecto_Integrador_G2.entity.Rating;
import com.integrador.Proyecto_Integrador_G2.entity.User;
import com.integrador.Proyecto_Integrador_G2.exception.ResourceNotFoundException;
import com.integrador.Proyecto_Integrador_G2.repository.ProductRepository;
import com.integrador.Proyecto_Integrador_G2.repository.RatingRepository;
import com.integrador.Proyecto_Integrador_G2.repository.UserRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class RatingService {

    private static final Logger LOGGER = Logger.getLogger(ProductService.class);

    private final RatingRepository ratingRepository;

    private final ProductRepository productRepository;

    private final UserRepository userRepository;

    private final ProductService productService;

    @Autowired
    public RatingService(RatingRepository ratingRepository, ProductRepository productRepository, UserRepository userRepository, ProductService productService) {
        this.ratingRepository = ratingRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.productService = productService;
    }


    public RatingDTO createRating(RatingDTO ratingDTO) throws ResourceNotFoundException {
        Long productId = ratingDTO.getProducts_id();
        Long userId = ratingDTO.getUsers_id();
        Double rating = ratingDTO.getRating();

        // Buscar si el producto y el usuario existen en la base de datos
        Optional<Product> product = productRepository.findById(productId);
        Optional<User> user = userRepository.findById(userId);

        // Si ambos existen
        if (product.isPresent() && user.isPresent()) {
            // Validar que la calificación esté entre 0 y 5
            if (rating >= 0 && rating <= 5) {
                // Buscar si ya existe una calificación para ese producto y usuario
                Optional<Rating> optionalRating = ratingRepository.findByProductIdAndUserId(productId, userId);
                Rating ratingCreate;
                if (optionalRating.isPresent()) {
                    // Actualizar la calificación existente
                    LOGGER.warn("The rating has been updated");
                    Rating ratingEntity = optionalRating.get();
                    ratingEntity.setRating(ratingDTO.getRating());
                    ratingRepository.save(ratingEntity);
                    ratingCreate = ratingEntity;
                } else {
                    // Crear una nueva calificación
                    LOGGER.info("Rating was created: ");
                    ratingCreate = ratingRepository.save(ratingDTOToRating(ratingDTO));
                }

                // Actualizar el valor de productAverage en la entidad Product
                productService.updateProductAverage(productId);
                return ratingToRatingDTO(ratingCreate);

            } else {
                // Si la calificación no está entre 0 y 5, lanzar una excepción
                throw new IllegalArgumentException("Rating should be between 0 and 5");
            }
        } else {
            // Si el producto o el usuario no existen, lanzar una excepción
            throw new ResourceNotFoundException("Product or user not found");
        }
    }

    private RatingDTO ratingToRatingDTO(Rating rating) {
        ///////////////////////////////////////
        RatingDTO respuesta = new RatingDTO();
        ///////////////////////////////////////
        respuesta.setId(rating.getId());
        respuesta.setProducts_id(rating.getProduct().getId());
        respuesta.setUsers_id(rating.getUser().getId());
        respuesta.setRating(rating.getRating());
        ///////////////////////////////////////
        return respuesta;
    }

    private Rating ratingDTOToRating(RatingDTO ratingDTO) {
        Rating respuesta = new Rating();
        ///////////////////////////////////////
        Product product = new Product();
        User user = new User();
        product.setId(ratingDTO.getProducts_id());
        user.setId(ratingDTO.getUsers_id());
        ///////////////////////////////////////
        respuesta.setRating(ratingDTO.getRating());
        ///////////////////////////////////////
        respuesta.setProduct(product);
        respuesta.setUser(user);
        return respuesta;
    }



}