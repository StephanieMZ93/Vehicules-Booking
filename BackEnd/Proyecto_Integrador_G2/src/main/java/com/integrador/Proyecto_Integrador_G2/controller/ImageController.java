package com.integrador.Proyecto_Integrador_G2.controller;

import com.integrador.Proyecto_Integrador_G2.entity.Image;
import com.integrador.Proyecto_Integrador_G2.exception.BadRequestException;
import com.integrador.Proyecto_Integrador_G2.exception.ResourceNotFoundException;
import com.integrador.Proyecto_Integrador_G2.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/image")
@CrossOrigin(origins ={"http://g2-frontend-destiautos.s3-website.us-east-2.amazonaws.com", "http://localhost:3000", "http://127.0.0.1:3000/"})

public class ImageController {
    private final ImageService imageService;

    @Autowired

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping
    public ResponseEntity<List<Image>> allImages(){return ResponseEntity.ok(imageService.searchAllImage());}

    @GetMapping("/{id}")
    public ResponseEntity<Image> oneImage (@PathVariable Long id)throws ResourceNotFoundException{
        Optional<Image> imageSearch = imageService.searchImage(id);
        if (imageSearch.isPresent()){
            return ResponseEntity.ok(imageSearch.get());
        }else{
            throw new ResourceNotFoundException("Error. does not exist" +
                    "the id: " + id + "associated with a image in the database");
        }
    }

    @PostMapping
    public ResponseEntity<Image> toRegisterImage(@RequestBody Image image)throws BadRequestException{
        Optional<Image> imageSearch = imageService.validateImage(image.getUrl());
        if (imageSearch.isPresent()){
            throw new BadRequestException("the image already exists and/or a wrong format was sent");
        }else{
            return ResponseEntity.ok(imageService.saveImage(image));
        }
    }
}
