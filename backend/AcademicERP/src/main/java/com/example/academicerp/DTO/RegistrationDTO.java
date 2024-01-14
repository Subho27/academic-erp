package com.example.academicerp.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class RegistrationDTO {
    private String email;
    private String first_name;
    private String last_name;
    private String title;
    private String path;
    private String department;
    private String password;
}
