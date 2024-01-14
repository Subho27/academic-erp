package com.example.academicerp.Utility;

import com.example.academicerp.Entities.Employee;
import com.example.academicerp.Entities.User;
import com.example.academicerp.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserUtility {

    @Autowired
    public UserRepository userRepository;

    public Optional<User> getUser(int id) {
        return userRepository.findById(id);
    }

    public User addUser(User user) { return userRepository.save(user); }

    public List<User> getAllUser() { return (List<User>) userRepository.findAll(); }

    public Employee validateUser(String email, String password) { return userRepository.validateUser(email, password); }

    public User finUserByEmail(String email) { return userRepository.finUserByEmail(email); }
}
