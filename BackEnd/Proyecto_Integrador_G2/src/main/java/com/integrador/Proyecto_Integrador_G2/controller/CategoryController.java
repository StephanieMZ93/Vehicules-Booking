package com.integrador.Proyecto_Integrador_G2.controller;

import com.integrador.Proyecto_Integrador_G2.entity.Category;
import com.integrador.Proyecto_Integrador_G2.exception.BadRequestException;
import com.integrador.Proyecto_Integrador_G2.exception.ResourceNotFoundException;
import com.integrador.Proyecto_Integrador_G2.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/category")
@CrossOrigin(origins ={"http://g2-frontend-destiautos.s3-website.us-east-2.amazonaws.com", "http://localhost:3000", "http://127.0.0.1:3000/"})

public class CategoryController {
    private final CategoryService categoryService;
    @Autowired

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }
    @GetMapping
    public ResponseEntity<List<Category>> AllCategory(){
        return ResponseEntity.ok(categoryService.searchAllCategory());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> OneCategory(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<Category> categorySearch= categoryService.searchCategory(id);
        if (categorySearch.isPresent()){
            return ResponseEntity.ok(categorySearch.get());
        }else{
            throw new ResourceNotFoundException("Error. does not exist" +
                    "the id: " + id + "associated with a category in the database");
        }
    }
    @PostMapping
    public ResponseEntity<Category> toRegisterCategory(@RequestBody Category category)throws BadRequestException{
    Optional<Category> categorySearch= categoryService.ValidateCategory(category.getTitle());
    if(categorySearch.isPresent()){
        throw new BadRequestException("the category already exists and/or a wrong format was sent");
        }else {
            return ResponseEntity.ok(categoryService.createCategory(category));
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<Category> categorySearch = categoryService.searchCategory(id);
        if (categorySearch.isPresent()){
            categoryService.deleteCategory(id);
            return ResponseEntity.ok("The category with id: " + id + " was successfully deleted");
        }else {
            throw new ResourceNotFoundException("Error. does not exist" +
                    "the id: " + id +
                    "associated with a category in the database");
        }
    }

    @PutMapping
    public ResponseEntity<String> toUpdateCategory(@RequestBody Category category)throws ResourceNotFoundException{
        Optional<Category> categorySearch = categoryService.searchCategory(category.getId());
        if (categorySearch.isPresent()){
            categoryService.updateCategory(category);
            return ResponseEntity.ok("Updated the category with id: " + category.getId());
        }else {
            throw new ResourceNotFoundException("Error. does not exist" +
                    "the id: " + category.getId() + "associated with a category in the database");
        }
    }
}
