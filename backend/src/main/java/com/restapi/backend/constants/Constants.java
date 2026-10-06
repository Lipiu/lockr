package com.restapi.backend.constants;

import lombok.NoArgsConstructor;

@NoArgsConstructor 
public class Constants {
    // Auth
    public static final int NAME_MAX_LENGTH = 100;
    public static final int EMAIL_MAX_LENGTH = 100;
    public static final int PASSWORD_MIN_LENGTH = 8;
    public static final int PASSWORD_MAX_LENGTH = 64;
    public static final int PASSWORD_MAX_BYTES = 72;

    // Encryption
    public static final int KEY_BYTES_VAULT = 32;
    public static final int GCM_IV_BYTES = 12;
    public static final int GCM_TAG_BITS = 128;
    public static final int GCM_TAG_BYTES = 16;

    // Password Entry
    public static final int TITLE_MAX_LENGTH = 100;
    public static final int ACCOUNT_USERNAME_MAX_LENGTH = 32;
    public static final int PASSWORD_ENTRY_MIN_LENGTH = 8;
    public static final int PASSWORD_ENTRY_MAX_LENGTH = 64;
    public static final int URL_MAX_LENGTH = 1500;
    public static final int NOTES_MAX_LENGTH = 50;

    public static final String DUPLICATE_EMAIL_MESSAGE = "Email already in use";
}
