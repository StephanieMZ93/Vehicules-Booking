package com.integrador.Proyecto_Integrador_G2.controller;

import com.integrador.Proyecto_Integrador_G2.entity.City;
import com.integrador.Proyecto_Integrador_G2.exception.BadRequestException;
import com.integrador.Proyecto_Integrador_G2.exception.ResourceNotFoundException;
import com.integrador.Proyecto_Integrador_G2.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/city")
@CrossOrigin(origins ={"http://g2-frontend-destiautos.s3-website.us-east-2.amazonaws.com", "http://localhost:3000", "http://127.0.0.1:3000/"})

public class CityController {
    private final CityService cityService;
    @Autowired
    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping
    public ResponseEntity<List<City>> Allcities(){
        return ResponseEntity.ok(cityService.searchAllCity());
    }

    @PostMapping
    public ResponseEntity<City> toResgisterCity(@RequestBody City city) throws BadRequestException {
        Optional<City> citySerach= cityService.validateCity(city.getNameCity());
        if (citySerach.isPresent()){
            throw new BadRequestException("the city already exists and/or a wrong format was sent");
        }else{
            return ResponseEntity.ok(cityService.createCity(city));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCity(@PathVariable long id) throws ResourceNotFoundException{
        Optional<City> citysearch = cityService.searchCity(id);
        if (citysearch.isPresent()){
            cityService.deleteCity(id);
            return ResponseEntity.ok("The city with id: " + id + " was successfully deleted");
        }else {
            throw new ResourceNotFoundException("Error. does not exist" +
                    "the id: " + id +
                    "associated with a city in the database");
        }
    }
}
