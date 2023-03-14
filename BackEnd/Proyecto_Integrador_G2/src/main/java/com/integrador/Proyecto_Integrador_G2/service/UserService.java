package com.integrador.Proyecto_Integrador_G2.service;

import com.integrador.Proyecto_Integrador_G2.entity.User;
import com.integrador.Proyecto_Integrador_G2.repository.UserRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService{

    private static final Logger LOGGER = Logger.getLogger(UserService.class);

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User userDTO){
        LOGGER.info("User was created: "+userDTO.getId());
        return userRepository.save(userDTO);
    }

    public List<User> searchAllUser(){
        LOGGER.info("All users were searched: ");
       return userRepository.findAll();

    }

    public Optional<User> searchUser(Long id){
        LOGGER.info("A user with ID was searched: "+ id);
        return userRepository.findById(id);

    }

    public void updateUser(User user){
        LOGGER.warn("The user with ID "+user.getId()+" has been updated");
        userRepository.save(user);
    }

    public void deleteUser(Long id){
        LOGGER.warn("The user with ID has been removed: "+id);
        userRepository.deleteById(id);
    }

   /* private UserDTO userToUserDTO(User user){
        ///////////////////////////////////////
        UserDTO respuesta = new UserDTO();
        ///////////////////////////////////////
        respuesta.setId(user.getId());
        respuesta.setName(user.getName());
        respuesta.setLastName(user.getLastName());
        respuesta.setEmail(user.getEmail());
        respuesta.setPassword(user.getPassword());
        respuesta.setCity(user.getCity());
        respuesta.setRol_id(user.getRol().getId());
        respuesta.setBooking(user.getBooking());
        ///////////////////////////////////////
        return respuesta;
    }

    private User userDTOToUser(UserDTO userDTO){
        User respuesta = new User();
        ///////////////////////////////////////
        Rol rol = new Rol();
        rol.setId(userDTO.getRol_id());
        ///////////////////////////////////////
        respuesta.setName(userDTO.getName());
        respuesta.setLastName(userDTO.getLastName());
        respuesta.setEmail(userDTO.getEmail());
        respuesta.setPassword(userDTO.getPassword());
        respuesta.setCity(userDTO.getCity());
        ///////////////////////////////////////
        respuesta.setRol(rol);
        return respuesta;
    }*/
public Optional<User> validateUser(String email){
        return userRepository.findByEmail(email);
}

}
