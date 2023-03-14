package com.integrador.Proyecto_Integrador_G2.controller;

import com.integrador.Proyecto_Integrador_G2.dto.BookingDTO;
import com.integrador.Proyecto_Integrador_G2.entity.Product;
import com.integrador.Proyecto_Integrador_G2.entity.User;
import com.integrador.Proyecto_Integrador_G2.repository.ProductRepository;
import com.integrador.Proyecto_Integrador_G2.service.ProductService;
import com.integrador.Proyecto_Integrador_G2.service.UserService;
import com.integrador.Proyecto_Integrador_G2.validator.BookingDTOValidationError;
import com.integrador.Proyecto_Integrador_G2.entity.Booking;
import com.integrador.Proyecto_Integrador_G2.exception.ResourceNotFoundException;
import com.integrador.Proyecto_Integrador_G2.service.BookingService;
import com.integrador.Proyecto_Integrador_G2.validator.DateValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;

import java.util.*;

@RestController
@RequestMapping("/booking")
@CrossOrigin(origins ={"http://g2-frontend-destiautos.s3-website.us-east-2.amazonaws.com", "http://localhost:3000", "http://127.0.0.1:3000/"})
public class BookingController {

    private final BookingService bookingService;
    private final ProductService productService;
    private final ProductRepository productRepository;
    private final UserService userService;

    @Autowired
    public BookingController(BookingService bookingService, ProductService productService, ProductRepository productRepository, UserService userService) {
        this.bookingService = bookingService;
        this.productService = productService;
        this.productRepository = productRepository;
        this.userService = userService;
    }


    @GetMapping
    public ResponseEntity<List<Booking>> searchAllBookings() {
        List<Booking> bookings = bookingService.searchAllBooking();
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> searchBookingById(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Booking> bookingWanted = bookingService.searchBooking(id);
        if (bookingWanted.isPresent()) {
            return ResponseEntity.ok(bookingWanted.get());
        } else {
            throw new ResourceNotFoundException("Booking with id " + id + " not found");
        }
    }
    @GetMapping("/product/{id}")
    public ResponseEntity<List<Booking>> searchBookingByProductId(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<Product> productWanted = productService.searchProduct(id);
        if (productWanted.isPresent()){
            return ResponseEntity.ok(bookingService.searchBookingByProduct(id));
        } else {
            throw new ResourceNotFoundException("Product with id "+ id + " not exist in a database");
        }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Booking>> searchBookingByUserId(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<User> userWanted = userService.searchUser(id);
        if (userWanted.isPresent()){
            return ResponseEntity.ok(bookingService.searchBookingByUser(id));
        } else {
            throw new ResourceNotFoundException("User with id "+ id + " not exist in a database");
        }
    }

    /**
     * Metodo Post
     * Crea una reserva y la almacena en la base de datos si todas las validaciones son satisfactorias.
     *
     * @param bookingDTO     Objeto BookingDTO que contiene los detalles de la reserva a crear.
     * @param bindingResult  Objeto BindingResult que contiene los resultados de la validación de BookingDTO.
     * @return ResponseEntity con la entidad creada si la validación es satisfactoria, o un objeto de error si no lo es.
     * @throws MethodArgumentNotValidException si BookingDTO no es válido.
     */
    @PostMapping
    public ResponseEntity<?> createBooking(@Valid @RequestBody BookingDTO bookingDTO, BindingResult bindingResult) throws MethodArgumentNotValidException {

        //Comprobar si el objeto que se esta pasando es nulo
        if (bookingDTO == null) {
            return ResponseEntity.badRequest().body(new BookingDTOValidationError("booking", "Booking is null"));
        }
        //Comprobar si existen errores de validacion en el objeto
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(new BookingDTOValidationError("booking", "Booking validation failed"));
        }

        // Validar las fechas
        DateValidator validator = new DateValidator();
        String dateValidationError = validator.validateDates(bookingDTO.getStartDate(), bookingDTO.getEndDate());
        if (dateValidationError != null) {
            return ResponseEntity.badRequest().body(new BookingDTOValidationError("booking", dateValidationError));
        }

        // Validar la disponibilidad del producto
        List<Product> availableProducts = productService.searchAvailableProductsByDate(bookingDTO.getStartDate(), bookingDTO.getEndDate()); //Lista los productos disponibles en ese rango de fechas
        Product product = productRepository.findById(bookingDTO.getProducts_id()).orElse(null); //Obtiene el producto que se esta queriendo reservar a traves de su ID
        if (product == null || !availableProducts.contains(product)) { //Comprobar que el producto exite y esta dentro de la lista de productos disponibles
            return ResponseEntity.badRequest().body(new BookingDTOValidationError("booking", "The product is not available in the specified date range")); //En caso de que no exista o no este, devolver el mensaje de error
        }

        BookingDTO createdBooking = bookingService.createBooking(bookingDTO);
        return ResponseEntity.ok(createdBooking);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBookingById(@PathVariable long id) throws ResourceNotFoundException{
        Optional<Booking> bookingWanted = bookingService.searchBooking(id);
        if (bookingWanted.isPresent()){
            bookingService.deleteBooking(id);
            return ResponseEntity.ok("The booking with id: " + id + " was successfully deleted");
        }else {
            throw new ResourceNotFoundException("Error. does not exist" +
                    "the id: " + id +
                    "associated with a booking in the database");
        }
    }
}
