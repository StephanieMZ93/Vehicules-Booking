package com.integrador.Proyecto_Integrador_G2.controller;

import com.integrador.Proyecto_Integrador_G2.entity.Feature;
import com.integrador.Proyecto_Integrador_G2.exception.BadRequestException;
import com.integrador.Proyecto_Integrador_G2.exception.ResourceNotFoundException;
import com.integrador.Proyecto_Integrador_G2.service.FeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/feature")
@CrossOrigin(origins ={"http://g2-frontend-destiautos.s3-website.us-east-2.amazonaws.com", "http://localhost:3000", "http://127.0.0.1:3000/"})

public class FeatureController {
    private final FeatureService featureService;

    @Autowired
    public FeatureController(FeatureService featureService) {
        this.featureService = featureService;

    }

    @GetMapping
    public ResponseEntity<List<Feature>> allFeature(){
        return ResponseEntity.ok(featureService.searchFeature());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Feature> oneFeature (@PathVariable Long id)throws ResourceNotFoundException{
        Optional<Feature> featureSearch = featureService.searchFeature(id);
        if (featureSearch.isPresent()){
            return ResponseEntity.ok(featureSearch.get());
        }else{
            throw new ResourceNotFoundException("Error. does not exist" +
                    "the id: " + id + "associated with a feature in the database");
        }
    }

    @PostMapping
    public ResponseEntity<Feature> toRegisterFeature(@RequestBody Feature feature) throws BadRequestException{
        Optional<Feature> featureSearch = featureService.validateFeature(feature.getNameFeature());
        if (featureSearch.isPresent()){
            throw new BadRequestException("the feature already exists and/or a wrong format was sent");
        }else{
            return ResponseEntity.ok(featureService.createFeature(feature));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFeature(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<Feature> featureSearch = featureService.searchFeature(id);
        if (featureSearch.isPresent()){
            return ResponseEntity.ok("The feature with id: " + id + " was successfully deleted");
        }else{
            throw new ResourceNotFoundException("Error. does not exist" +
                    "the id: " + id +
                    "associated with a feature in the database");
        }
    }

    @PutMapping
    public ResponseEntity<String> toUpdateFeature(@RequestBody Feature feature)throws ResourceNotFoundException{
        Optional<Feature> featureSearch = featureService.searchFeature(feature.getId());
        if (featureSearch.isPresent()){
            featureService.updateFeature(feature);
            return ResponseEntity.ok("Updated the category with id: " + feature.getId());
        }else{
            throw new ResourceNotFoundException("Error. does not exist" +
                    "the id: " + feature.getId() + "associated with a feature in the database");
        }
    }
}
