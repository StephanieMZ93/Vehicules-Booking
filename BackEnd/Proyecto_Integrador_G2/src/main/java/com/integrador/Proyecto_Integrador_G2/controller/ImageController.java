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

    @GetMapping("/byId/{id}")
    public ResponseEntity<Image> searchImageById (@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Image> imageWanted = imageService.searchImage(id);
        if (imageWanted.isPresent()){
            return ResponseEntity.ok(imageWanted.get());
        }else{
            throw new ResourceNotFoundException("Error. does not exist" +
                    "the id: " + id + "associated with a image in the database");
        }
    }

    @GetMapping("byURL/{url}")
    public ResponseEntity<Image> imageForUrl (@PathVariable String url)throws ResourceNotFoundException{
        Optional<Image> imageSearch = imageService.validateImage(url);
        if (imageSearch.isPresent()){
            return ResponseEntity.ok(imageSearch.get());
        }else{
            throw new ResourceNotFoundException("Error. does not exist" +
                    "the url: " + url + "associated with a image in the database");
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

    @PutMapping
    public ResponseEntity<String> toUpdateImage(@RequestBody Image image)throws ResourceNotFoundException{
        Optional<Image> imageWanted = imageService.searchImage(image.getId());
        if (imageWanted.isPresent()){
            imageService.updateImage(image);
            return ResponseEntity.ok("Updated the image with id: " + image.getId());
        }else{
            throw new ResourceNotFoundException("Error. does not exist" +
                    "the id: " + image.getId() + "associated with a image in the database");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteImageById(@PathVariable long id) throws ResourceNotFoundException{
        Optional<Image> imageWanted = imageService.searchImage(id);
        if (imageWanted.isPresent()){
            imageService.deleteImage(id);
            return ResponseEntity.ok("The image with id: " + id + " was successfully deleted");
        }else {
            throw new ResourceNotFoundException("Error. does not exist" +
                    "the id: " + id +
                    "associated with a image in the database");
        }
    }


}
