package com.restapi.backend.request.auth;

import com.restapi.backend.constants.Constants;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.ToString;

@Data
public class RegisterRequest {
    @NotBlank(message = "First name cannot be blank")
    @Size(max = Constants.NAME_MAX_LENGTH, message = "Name max size allowed: " + Constants.NAME_MAX_LENGTH)
    private String firstName;

    @NotBlank(message = "Last name cannot be blank")
    @Size(max = Constants.NAME_MAX_LENGTH, message = "Name max size allowed: " + Constants.NAME_MAX_LENGTH)
    private String lastName;

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