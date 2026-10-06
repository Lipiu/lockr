package com.restapi.backend.mapper;

import org.springframework.stereotype.Component;

import com.restapi.backend.dto.response.UserDto;
import com.restapi.backend.model.User;

@Component
public class UserMapper {
    public UserDto toDto(User user){
        return new UserDto(
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            user.getCreatedAt()
        );
    }
}
