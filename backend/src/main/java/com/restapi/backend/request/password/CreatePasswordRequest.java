package com.restapi.backend.request.password;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data 
public class CreatePasswordRequest {
    @NotBlank private String title;
    @NotBlank private String accountUsername;
    @NotBlank private String password;
    @NotBlank private String url;
    @NotBlank private String notes;
}
