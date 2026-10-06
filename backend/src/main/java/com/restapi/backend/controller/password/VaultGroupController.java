package com.restapi.backend.controller.password;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restapi.backend.dto.request.password.CreateVaultGroupRequest;
import com.restapi.backend.dto.response.password.VaultGroupDto;
import com.restapi.backend.mapper.VaultGroupMapper;
import com.restapi.backend.model.User;
import com.restapi.backend.model.VaultGroup;
import com.restapi.backend.service.auth.UserService;
import com.restapi.backend.service.password.VaultGroupService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class VaultGroupController {
    private final VaultGroupService vaultGroupService;
    private final VaultGroupMapper vaultGroupMapper;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<VaultGroupDto> create(@Valid @RequestBody CreateVaultGroupRequest request, Authentication auth){
        User user = userService.findByEmail(auth.getName());
        VaultGroup saved = vaultGroupService.create(user, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(vaultGroupMapper.toDto(saved));
    }

    @GetMapping
    public ResponseEntity<List<VaultGroupDto>> list(Authentication auth){
        User user = userService.findByEmail(auth.getName());
        return ResponseEntity.ok(vaultGroupService.findAll(user).stream().map(vaultGroupMapper::toDto).toList());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id, Authentication auth){
        User user = userService.findByEmail(auth.getName());
        vaultGroupService.delete(user, id);
        return ResponseEntity.noContent().build();
    }
}
