package com.restapi.backend.dto.response.password;

import java.util.UUID;

public record VaultGroupDto(
    UUID id,
    String name,
    UUID parentId
) {}
