package com.integrador.Proyecto_Integrador_G2.validator;

public class BookingDTOValidationError {

    private String fieldName;
    private String message;

    public BookingDTOValidationError(String fieldName, String message) {
        this.fieldName = fieldName;
        this.message = message;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}

