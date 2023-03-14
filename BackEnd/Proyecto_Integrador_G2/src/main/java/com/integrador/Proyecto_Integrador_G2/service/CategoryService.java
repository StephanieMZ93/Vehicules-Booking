package com.integrador.Proyecto_Integrador_G2.service;

import com.integrador.Proyecto_Integrador_G2.entity.Category;
import com.integrador.Proyecto_Integrador_G2.repository.CategoryRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class CategoryService {
    private static final Logger LOGGER = Logger.getLogger(CategoryService.class);

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category createCategory(Category category){
        LOGGER.info("a titled category was created: "+category.getTitle());
        return categoryRepository.save(category);
    }

    public List<Category> searchAllCategory(){
        LOGGER.info("All categories were searched: ");
        return categoryRepository.findAll();
    }


    public Optional<Category> searchCategory(Long id){
    LOGGER.info("A category with ID was searched: "+id);
    return categoryRepository.findById(id);
    }

    public void updateCategory(Category category){
        LOGGER.warn("The category with ID "+category.getId()+" has been updated");
        categoryRepository.save(category);
    }

    public void deleteCategory(Long id){
        LOGGER.warn("The category with ID has been removed: "+id);
        categoryRepository.deleteById(id);
    }
    public Optional<Category> ValidateCategory(String title){
        return categoryRepository.findByTitle(title);
    }
}
