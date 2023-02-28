package com.integrador.Proyecto_Integrador_G2.exception;

public class BadRequestException extends Exception {
    public BadRequestException(String message) {
        super(message);
    }

    public BadRequestException(String message, Throwable e) {
        super(message, e);}

}
