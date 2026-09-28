package com.restapi.backend.auth.request;

import com.restapi.backend.constants.Constants;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.ToString;

@Data
public class RegisterRequest {
    @Email(message = "Must be a well-formed email address")
    @NotBlank(message = "Email must not be blank")
    @Size(max = Constants.EMAIL_MAX_LENGTH, message = "Email max allowed: " + Constants.EMAIL_MAX_LENGTH)
    private String email;

    @NotBlank(message = "Password must not be blank")
    @ToString.Exclude
    @Size(min = Constants.PASSWORD_MIN_LENGTH, max = Constants.PASSWORD_MAX_LENGTH, 
          message = "Password must contain min: " + Constants.PASSWORD_MIN_LENGTH +
                    " characters, max: " + Constants.PASSWORD_MAX_LENGTH + " characters")
    private String password;
}