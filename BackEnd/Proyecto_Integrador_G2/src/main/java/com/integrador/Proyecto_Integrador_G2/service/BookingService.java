package com.integrador.Proyecto_Integrador_G2.service;

import com.integrador.Proyecto_Integrador_G2.dto.BookingDTO;
import com.integrador.Proyecto_Integrador_G2.entity.Booking;
import com.integrador.Proyecto_Integrador_G2.entity.Product;
import com.integrador.Proyecto_Integrador_G2.entity.User;
import com.integrador.Proyecto_Integrador_G2.repository.BookingRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    private static final Logger LOGGER = Logger.getLogger(BookingService.class);

    private final BookingRepository bookingRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public BookingDTO createBooking(BookingDTO bookingDTO){
        LOGGER.info("Booking was created: "+bookingDTO.getId());
        Booking bookingCreate = bookingRepository.save(bookingDTOToBooking(bookingDTO));
        return bookingToBookingDTO(bookingCreate);
    }

    public List<Booking> searchAllBooking(){
        LOGGER.info("All bookings were searched: ");
        return bookingRepository.findAll();
    }

    public Optional<Booking> searchBooking(Long id){
        LOGGER.info("A booking with ID was searched: "+id);
        return bookingRepository.findById(id);

    }

    public List<Booking> searchBookingByUser(Long id){
        LOGGER.info("The user's bookings with ID "+ id +" were searched:");
        return bookingRepository.findByUser_idLike(id);
    }

    public void deleteBooking(Long id){
        LOGGER.warn("The booking with ID has been removed: "+id);
        bookingRepository.deleteById(id);
    }

    private BookingDTO bookingToBookingDTO(Booking booking){
        ///////////////////////////////////////
        BookingDTO respuesta = new BookingDTO();
        ///////////////////////////////////////
        respuesta.setId(booking.getId());
        respuesta.setStartHour(booking.getStartHour());
        respuesta.setStartDate(booking.getStartDate());
        respuesta.setEndDate(booking.getEndDate());
        respuesta.setProducts_id(booking.getProduct().getId());
        respuesta.setUser_id(booking.getUser().getId());
        ////////////////////////////////////////
        return respuesta;
    }

    private Booking bookingDTOToBooking(BookingDTO bookingDTO){
        Booking respuesta = new Booking();
        ////////////////////////////////////////
        Product product = new Product();
        User user = new User();
        product.setId(bookingDTO.getProducts_id());
        user.setId(bookingDTO.getUser_id());
        ////////////////////////////////////////
        respuesta.setStartHour(bookingDTO.getStartHour());
        respuesta.setStartDate(bookingDTO.getStartDate());
        respuesta.setEndDate(bookingDTO.getEndDate());
        ////////////////////////////////////////
        respuesta.setProduct(product);
        respuesta.setUser(user);
        return respuesta;
    }
}
