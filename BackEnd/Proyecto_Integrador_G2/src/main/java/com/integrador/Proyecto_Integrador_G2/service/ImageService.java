package com.integrador.Proyecto_Integrador_G2.service;

import com.integrador.Proyecto_Integrador_G2.entity.Image;
import com.integrador.Proyecto_Integrador_G2.repository.ImageRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImageService {
    private static final Logger LOGGER = Logger.getLogger(ImageService.class);

    private final ImageRepository imageRepository;

    @Autowired
    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public Image saveImage(Image image){
        LOGGER.info("a titled image was saved: "+image.getTitle());
        return imageRepository.save(image);
    }

    public List<Image> searchAllImage(){
        LOGGER.info("All images were searched: ");
        return imageRepository.findAll();
    }

    public Optional<Image> searchImage(Long id){
        LOGGER.info("A category with ID was searched: "+id);
        return imageRepository.findById(id);
    }

    public void updateImage(Image image){
        LOGGER.warn("The image with ID "+image.getId()+" has been updated ");
        imageRepository.save(image);
    }

    public void deleteImage(Long id){
        LOGGER.warn("The image with ID has been removed: "+id);
        imageRepository.deleteById(id);
    }
    public Optional<Image> validateImage(String url){
        return imageRepository.findByurl(url);
    }
}
