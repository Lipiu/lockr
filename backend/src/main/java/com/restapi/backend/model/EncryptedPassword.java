package com.restapi.backend.model;

import java.time.LocalDateTime;
import java.util.UUID;

import com.restapi.backend.constants.Constants;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PostUpdate;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor 
@Getter 
@Setter 
@Table(name="encrypted_password")
public class EncryptedPassword {
    @Id 
    @GeneratedValue(strategy=GenerationType.UUID)
    private UUID id;

    @Column(name="title", nullable=false, length = Constants.TITLE_MAX_LENGTH)
    private String title;

    @Column(name="username", nullable=false, length = Constants.ACCOUNT_USERNAME_MAX_LENGTH)
    private String accountUsername;

    @ManyToOne(fetch=FetchType.LAZY, optional=false)
    @JoinColumn(name="user_id", nullable=false)
    private User user;

    @Column(name="password_content", nullable=false, length = Constants.PASSWORD_ENTRY_MAX_LENGTH)
    private String passwordContent;

    @Column(name="url", nullable=true, length = Constants.URL_MAX_LENGTH)
    private String url;

    @Column(name="notes", nullable=true, length = Constants.NOTES_MAX_LENGTH)
    private String notes;

    @Column(name="created_at", nullable=false)
    private LocalDateTime createdAt;

    @Column(name="updated_at", nullable=false)
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate(){
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
    }

    @PostUpdate
    public void onUpdate(){
        updatedAt = LocalDateTime.now();
    }
}
