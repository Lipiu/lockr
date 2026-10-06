package com.restapi.backend.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.NonNull;

public record EncryptedPasswordDto(
    @NonNull UUID id,
    @NonNull String accountUsername,
    @NonNull String title,
    String url,
    String notes,
    @NonNull LocalDateTime createdAt
) {}
