package com.restapi.backend.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.NonNull;

public record UserDto(
    @NonNull UUID id,
    @NonNull String firstName,
    @NonNull String lastName,
    @NonNull String email,
    @NonNull LocalDateTime createdAt
) {}


