package com.restapi.backend.constants;

import lombok.NoArgsConstructor;

@NoArgsConstructor 
public class Constants {
    public static final int PASSWORD_MIN_LENGTH = 12;
    public static final int PASSWORD_MAX_LENGTH = 64;
    public static final int PASSWORD_MAX_BYTES = 72;
    public static final int EMAIL_MAX_LENGTH = 100;
    public static final int NAME_MAX_LENGTH = 100;

    public static final String DUPLICATE_EMAIL_MESSAGE = "Email already in use";
}
