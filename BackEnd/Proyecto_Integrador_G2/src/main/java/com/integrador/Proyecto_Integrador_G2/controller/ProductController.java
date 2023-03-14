package com.integrador.Proyecto_Integrador_G2.controller;

import com.integrador.Proyecto_Integrador_G2.dto.ProductDTO;
import com.integrador.Proyecto_Integrador_G2.entity.Booking;
import com.integrador.Proyecto_Integrador_G2.entity.Product;
import com.integrador.Proyecto_Integrador_G2.exception.BadRequestException;
import com.integrador.Proyecto_Integrador_G2.exception.ResourceNotFoundException;
import com.integrador.Proyecto_Integrador_G2.repository.BookingRepository;
import com.integrador.Proyecto_Integrador_G2.repository.ProductRepository;
import com.integrador.Proyecto_Integrador_G2.service.CategoryService;
import com.integrador.Proyecto_Integrador_G2.service.CityService;
import com.integrador.Proyecto_Integrador_G2.service.ProductService;
import com.integrador.Proyecto_Integrador_G2.validator.DateValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



import javax.validation.Valid;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/product")
@CrossOrigin(origins ={"http://g2-frontend-destiautos.s3-website.us-east-2.amazonaws.com", "http://localhost:3000", "http://127.0.0.1:3000/"})

public final class  ProductController {
    private final ProductService productService;
    private final CategoryService categoryService;
    private final CityService cityService;
    private final BookingRepository bookingRepository;
    private final ProductRepository productRepository;

    @Autowired
    public ProductController(ProductService productService, CategoryService categoryService, CityService cityService, BookingRepository bookingRepository, ProductRepository productRepository) {
        this.productService = productService;
        this.categoryService = categoryService;
        this.cityService = cityService;
        this.bookingRepository = bookingRepository;
        this.productRepository = productRepository;
    }

    @GetMapping
    public ResponseEntity<List<Product>> AllProduct() {
        return ResponseEntity.ok(productService.searchAllProduct());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> oneProduct (@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Product> productSearch = productService.searchProduct(id);
        if (productSearch.isPresent()){
            return ResponseEntity.ok(productSearch.get());
        }else{
            throw new ResourceNotFoundException("Error. does not exist" +
                    "the id: " + id + "associated with a product in the database");
        }
    }

    @GetMapping("/city/{id}")
    public ResponseEntity<List<Product>> filterByCity (@PathVariable Long id) throws ResourceNotFoundException {
        Optional<List<Product>> productSearch = productService.filterToCity(id);

        return ResponseEntity.ok(productSearch.get());
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<List<Product>> filterByCategory (@PathVariable Long id) throws ResourceNotFoundException {
        Optional<List<Product>> productSearch = productService.filterToCategory(id);

        return ResponseEntity.ok(productSearch.get());
    }

    @GetMapping("/random")
    public ResponseEntity<List<Product>> ramdomProduct () {
        Optional<List<Product>> productSearch = productService.ProductRandom();
        return ResponseEntity.ok(productSearch.get());

    }

    @PostMapping
    public ResponseEntity<ProductDTO> registerProduct(@Valid @RequestBody ProductDTO product) throws BadRequestException {
        try {
            categoryService.searchCategory(product.getCategory_id())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
            cityService.searchCity(product.getCity_id())
                    .orElseThrow(() -> new ResourceNotFoundException("City not found"));
            ProductDTO createdProduct = productService.createProduct(product);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
        } catch (DataIntegrityViolationException | ResourceNotFoundException e) {
            throw new BadRequestException("Invalid input data", e);
        }
    }

    @PutMapping
    public ResponseEntity<String> updateProduct (@RequestBody ProductDTO product) throws BadRequestException{

        if (productService.searchProduct(product.getId()).isPresent()){
            productService.updateProduct(product);
            return ResponseEntity.ok("Updated the category with id: " + product.getId());
        }else{
            throw new BadRequestException("the product already exists and/or a wrong format was sent");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProductById(@PathVariable long id) throws ResourceNotFoundException{
        Optional<Product> productWanted = productService.searchProduct(id);
        if (productWanted.isPresent()){
            productService.deleteProduct(id);
            return ResponseEntity.ok("The product with id: " + id + " was successfully deleted");
        }else {
            throw new ResourceNotFoundException("Error. does not exist" +
                    "the id: " + id +
                    "associated with a product in the database");
        }
    }

    @GetMapping("/byDate")
    public ResponseEntity<?> searchAvailableProductByDate(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd")LocalDate startDate, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate){

        // Validacion de fechas
        String dateValidationError = DateValidator.validateDates(startDate, endDate);
        if (dateValidationError != null){
            return ResponseEntity.badRequest().body(dateValidationError);
        }

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
        return ResponseEntity.ok(availableProducts);
    }

    @GetMapping("/city/{cityId}/byDate")
    public ResponseEntity<List<Product>> searchAvailableProductsByCityAndDate(
            @PathVariable long cityId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {

        List<Product> availableProducts = productService.searchAvailableProductsByCityAndDate(cityId, startDate, endDate);

        if (availableProducts.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // or return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(availableProducts);
    }

}