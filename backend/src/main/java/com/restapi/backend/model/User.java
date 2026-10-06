package com.restapi.backend.model;

import java.time.LocalDateTime;
import java.util.UUID;

import com.restapi.backend.constants.Constants;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor 
@AllArgsConstructor
@Getter
@Setter
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.UUID)
    @Column(name="id", nullable=false)
    private UUID id;

    @Column(name="first_name", nullable=false, updatable=true, length = Constants.NAME_MAX_LENGTH)
    private String firstName;

    @Column(name="last_name", nullable=false, updatable=true, length = Constants.NAME_MAX_LENGTH)
    private String lastName;

    @Column(name="email", nullable=false, updatable=true, unique=true, length = Constants.EMAIL_MAX_LENGTH)
    private String email;

    @Column(name="password_hash", nullable=false, length = Constants.PASSWORD_ENTRY_MAX_LENGTH)
    private String password;

    @Column(name="created_at", nullable=false)
    private LocalDateTime createdAt;
}