package com.integrador.Proyecto_Integrador_G2.security;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private Long id;
    private String name;

    private String lastName;

    private String email;

    private String password;

    private String city;

}
