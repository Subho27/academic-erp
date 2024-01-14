package com.example.academicerp.Services;

import com.example.academicerp.DTO.UserDto;
import com.example.academicerp.Entities.User;

import java.util.List;

public interface UserService {

    void saveUser(UserDto userDto);

    User FindUserByEmail(String email);

    List<UserDto> findAllUsers();
}
