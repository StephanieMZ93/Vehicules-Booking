package com.integrador.Proyecto_Integrador_G2.service;

import com.integrador.Proyecto_Integrador_G2.entity.Feature;
import com.integrador.Proyecto_Integrador_G2.repository.FeatureRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeatureService {

    private static final Logger LOGGER = Logger.getLogger(FeatureService.class);

    private final FeatureRepository featureRepository;

    @Autowired
    public FeatureService(FeatureRepository featureRepository) {
        this.featureRepository = featureRepository;
    }

    public Feature createFeature(Feature feature){
        LOGGER.info("a named feature was created: "+feature.getNameFeature());
        return featureRepository.save(feature);
    }

    public List<Feature> searchFeature(){
        LOGGER.info("All features were searched: ");
        return featureRepository.findAll();
    }

    public Optional<Feature> searchFeature(Long id){
        LOGGER.info("A feature with ID was searched: "+id);
        return featureRepository.findById(id);
    }

    public void updateFeature(Feature feature){
        LOGGER.warn("The feature with ID "+feature.getId()+" has been updated");
        featureRepository.save(feature);
    }

    public void deleteFeature(Long id){
        LOGGER.warn("The feature with ID has been removed: "+id);
        featureRepository.deleteById(id);
    }

    public Optional<Feature> validateFeature(String nameFeature){
        return featureRepository.findBynameFeature(nameFeature);
    }
}
