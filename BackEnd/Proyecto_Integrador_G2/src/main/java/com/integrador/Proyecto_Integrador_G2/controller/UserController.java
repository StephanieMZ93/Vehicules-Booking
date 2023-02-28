package com.integrador.Proyecto_Integrador_G2.controller;

import com.integrador.Proyecto_Integrador_G2.entity.User;
import com.integrador.Proyecto_Integrador_G2.exception.BadRequestException;
import com.integrador.Proyecto_Integrador_G2.exception.ResourceNotFoundException;
import com.integrador.Proyecto_Integrador_G2.security.*;
import com.integrador.Proyecto_Integrador_G2.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin(origins ={"http://g2-frontend-destiautos.s3-website.us-east-2.amazonaws.com", "http://localhost:3000", "http://127.0.0.1:3000/"})
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private  AuthenticationService service;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> AllUsers(){
        return ResponseEntity.ok(userService.searchAllUser());
    }

    @GetMapping("/{email}")
    public ResponseEntity<User> SearchUser(@PathVariable String email) throws ResourceNotFoundException{
        Optional<User> userSearch = userService.validateUser(email);
        if (userSearch.isPresent()){
            return ResponseEntity.ok(userSearch.get());
        }
        else{
            throw new ResourceNotFoundException("Error. does not exist" +
                    "the user in the database");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> createAuthenticationToken(@RequestBody RegisterRequest request) throws BadRequestException{
        Optional<User> userSearch = userService.validateUser(request.getEmail());
        if (userSearch.isPresent()){
            throw new BadRequestException("the user already exists and/or a wrong format was sent");
        }else{
            return ResponseEntity.status(HttpStatus.CREATED).body(service.register(request));
        }

    }
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> createAuthenticationTokens(@RequestBody AuthenticationRequest request) throws BadRequestException{
            return ResponseEntity.ok(service.authenticate(request));
    }

}


