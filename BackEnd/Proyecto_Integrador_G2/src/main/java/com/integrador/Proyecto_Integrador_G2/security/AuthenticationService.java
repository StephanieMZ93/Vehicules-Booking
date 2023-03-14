package com.integrador.Proyecto_Integrador_G2.security;

import com.integrador.Proyecto_Integrador_G2.entity.Rol;
import com.integrador.Proyecto_Integrador_G2.entity.User;
import com.integrador.Proyecto_Integrador_G2.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request) {
        Rol rol = new Rol();
        rol.setId(2);
        var user = User.builder()
                .name(request.getName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .city(request.getCity())
                .rol(rol)
                .build();
                repository.save(user);
                var jwtToken = jwtUtil.generateToken(user);
                return AuthenticationResponse.builder()
                        .jwt(jwtToken)
                        .build();

    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                       request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtUtil.generateToken(user);
        return AuthenticationResponse.builder()
                .jwt(jwtToken)
                .build();
    }


    public void updateCity(RegisterRequest request) {
        Rol rol = new Rol();
        Optional<User> userSearch = repository.findById(request.getId());



        if(userSearch.get().getRol().getId() == 1)
        {
            rol.setId(1);
            var user = User.builder()
                    .id(request.getId())
                    .name(request.getName())
                    .lastName(request.getLastName())
                    .email(request.getEmail())
                    .password(request.getPassword())
                    .city(request.getCity())
                    .rol(rol)
                    .build();
            repository.save(user);

        }else{
            rol.setId(2);
            var user = User.builder()
                    .id(request.getId())
                    .name(request.getName())
                    .lastName(request.getLastName())
                    .email(request.getEmail())
                    .password(request.getPassword())
                    .city(request.getCity())
                    .rol(rol)
                    .build();
            repository.save(user);
        }


    }
}
