package com.integrador.Proyecto_Integrador_G2.service;

import com.integrador.Proyecto_Integrador_G2.entity.City;
import com.integrador.Proyecto_Integrador_G2.repository.CityRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CityService {

    private static final Logger LOGGER = Logger.getLogger(CityService.class);

    private final CityRepository cityRepository;

    @Autowired
    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public City createCity(City city){
        LOGGER.info("a named city was created: "+city.getNameCity());
        return cityRepository.save(city);
    }

    public List<City> searchAllCity(){
        LOGGER.info("All cities were searched: ");
        return cityRepository.findAll();
    }

    public void deleteCity(Long id){
        LOGGER.warn("The city with ID has been removed: "+id);
        cityRepository.deleteById(id);
    }

    public Optional<City> validateCity(String nameCity){
        return cityRepository.findBynameCity(nameCity);
    }
    public Optional<City> searchCity(long id){
        LOGGER.info("city was search ");
        return cityRepository.findById(id);
    }
}
