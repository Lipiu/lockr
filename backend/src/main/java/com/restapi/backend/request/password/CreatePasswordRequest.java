package com.restapi.backend.request.password;

import com.restapi.backend.model.EncryptedPassword;

import lombok.Data;

@Data 
public class CreatePasswordRequest {
    private String title;
    private String accountUsername;
    private EncryptedPassword password;
    private String url;
    private String notes;
}
