package com.example.academicerp.Services;

import com.example.academicerp.Entities.Department;
import com.example.academicerp.Entities.Employee;
import com.example.academicerp.Entities.User;
import com.example.academicerp.Repositories.DepartmentRepository;
import com.example.academicerp.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.academicerp.DTO.UserDto;

import javax.management.relation.Role;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DepartmentRepository departmentRepository;
    private PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository,
                           DepartmentRepository roleRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.departmentRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void saveUser(UserDto userDto) {
       User user = new User();
       String encrypted = passwordEncoder.encode(userDto.getPassword());
       user.setPassword(encrypted);
       user.setActive(userDto.getActive());
       user.setExpired(userDto.getExpired());
       user.setEmployee(userDto.getEmployee());
       userRepository.save(user);
    }

    @Override
    public User FindUserByEmail(String email) {
        return userRepository.finUserByEmail(email);
    }

    @Override
    public List<UserDto> findAllUsers() {
        List<User> users = (List<User>) userRepository.findAll();
        return users.stream()
                .map((user) -> mapToUserDto(user))
                .collect(Collectors.toList());
    }

    private UserDto mapToUserDto(User user){
        UserDto userDto = new UserDto();
        userDto.setFirstName(user.getEmployee().getFirst_name());
        userDto.setLastName(user.getEmployee().getLast_name());
        userDto.setEmail(user.getEmployee().getEmail());
        return userDto;
    }

    private Department checkRoleExist() {
        Department department = new Department();
        department.setName("ADMIN");
        department.setCapacity(2L);
        return departmentRepository.save(department);
    }

    public boolean Authenticate(String username, String password) {
        User user = userRepository.finUserByEmail(username);
        return passwordEncoder.matches(password, user.getPassword());
    }
}
