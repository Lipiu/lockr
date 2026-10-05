package com.restapi.backend.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.NonNull;

public record EncryptedPasswordDto(
    @NonNull UUID id,
    @NonNull String title,
    @NonNull String url,
    @NonNull String notes,
    @NonNull LocalDateTime createdAt
) {}
