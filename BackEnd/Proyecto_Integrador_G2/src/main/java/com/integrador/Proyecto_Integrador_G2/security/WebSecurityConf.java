package com.integrador.Proyecto_Integrador_G2.security;



import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.Filter;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConf{

    private final AuthenticationProvider aunthenticationProvider;
    private final JwtRequestFilter jwtauthfilter;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
http
        .cors().and().csrf().disable()
        .authorizeHttpRequests()
        .antMatchers("/configuration/**").permitAll()
        .antMatchers("/swagger-resources/**").permitAll()
        .antMatchers("/swagger-ui/**").permitAll()
        .antMatchers("/v3/api-docs/**").permitAll()
        .antMatchers(HttpMethod.GET,"/category/**").permitAll()
        .antMatchers(HttpMethod.GET,"/product/**").permitAll()
        .antMatchers(HttpMethod.GET,"/city/**").permitAll()
        .antMatchers(HttpMethod.GET,"/feature/**").permitAll()
        .antMatchers(HttpMethod.GET,"/image/**").permitAll()
        .antMatchers(HttpMethod.GET,"/rating/**").permitAll()
        .antMatchers(HttpMethod.GET,"/booking/**").permitAll()
        .antMatchers(HttpMethod.GET,"/user/**").hasAnyAuthority("ADMIN","CLIENT")
        .antMatchers(HttpMethod.POST,"/user/register","/user/login").permitAll()
        .antMatchers(HttpMethod.POST,"/rating/**").hasAnyAuthority("ADMIN","CLIENT")
        .antMatchers(HttpMethod.POST,"/booking/**").hasAnyAuthority("ADMIN","CLIENT")
        .antMatchers(HttpMethod.POST,"/image/**").hasAnyAuthority("ADMIN")
        .antMatchers(HttpMethod.POST,"/product/**").hasAnyAuthority("ADMIN")
        .antMatchers(HttpMethod.POST,"/category/**").hasAnyAuthority("ADMIN")
        .antMatchers(HttpMethod.POST,"/image/**").hasAnyAuthority("ADMIN")
        .antMatchers(HttpMethod.POST,"/product/**").hasAnyAuthority("ADMIN")
        .antMatchers(HttpMethod.POST,"/category/**").hasAnyAuthority("ADMIN")
        .antMatchers(HttpMethod.DELETE,"/image/**").hasAnyAuthority("ADMIN")
        .antMatchers(HttpMethod.DELETE,"/product/**").hasAnyAuthority("ADMIN")
        .antMatchers(HttpMethod.DELETE,"/category/**").hasAnyAuthority("ADMIN")
        .antMatchers(HttpMethod.PUT,"/user").hasAnyAuthority("ADMIN","CLIENT")
        .antMatchers(HttpMethod.DELETE,"/image/**").hasAnyAuthority("ADMIN")
        .antMatchers(HttpMethod.DELETE,"/product/**").hasAnyAuthority("ADMIN")
        .antMatchers(HttpMethod.DELETE,"/category/**").hasAnyAuthority("ADMIN")
        .anyRequest()
        .authenticated()
        .and()
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .authenticationProvider(aunthenticationProvider)
        .addFilterBefore(jwtauthfilter, UsernamePasswordAuthenticationFilter.class);



        return http.build();
    }
}
