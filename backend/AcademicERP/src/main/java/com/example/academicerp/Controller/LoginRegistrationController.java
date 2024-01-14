package com.example.academicerp.Controller;

import com.example.academicerp.DTO.LoginDTO;
import com.example.academicerp.DTO.RegistrationDTO;
import com.example.academicerp.DTO.UserDto;
import com.example.academicerp.Entities.Department;
import com.example.academicerp.Entities.Employee;
import com.example.academicerp.Entities.User;
import com.example.academicerp.Services.UserServiceImpl;
import com.example.academicerp.Utility.DepartmentUtility;
import com.example.academicerp.Utility.EmployeeUtility;
import com.example.academicerp.Utility.UserUtility;
import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/handle")
public class LoginRegistrationController {

    @Autowired
    public DepartmentUtility departmentUtility;
    @Autowired
    public EmployeeUtility employeeUtility;
    @Autowired
    public UserUtility userUtility;
    @Autowired
    private UserServiceImpl userService;

    @PostMapping(value = "/register")
    public ResponseEntity<?> RegisterUser(@RequestBody RegistrationDTO registrationDTO) {
        try {
            boolean validDepartment = validateDepartment(registrationDTO.getDepartment());
            if(!validDepartment) return ResponseEntity.status(500).body("Invalid department provided.");

            boolean validEmployee = validateEmployee(registrationDTO.getEmail());
            if(!validEmployee) return ResponseEntity.status(500).body("Invalid employee details provided.");

            // Get Department
            Optional<Department> department = departmentUtility.getDepartment(Integer.parseInt(registrationDTO.getDepartment()));
            int count = employeeUtility.getDepartmentCount(Integer.parseInt(registrationDTO.getDepartment()));
            if(department.get().getCapacity() <= count){
                return ResponseEntity.status(500).body("Department strength has reached maximum.");
            }

            // Add Employee
            Employee employee = new Employee();
            employee.setEmail(registrationDTO.getEmail());
            employee.setFirst_name(registrationDTO.getFirst_name());
            employee.setLast_name(registrationDTO.getLast_name());
            employee.setTitle(registrationDTO.getTitle());
            employee.setPath(registrationDTO.getPath());
            employee.setDepartment(department.get());
            employee = employeeUtility.addEmployee(employee);
            if(employee == null || employee.getId() == 0) {
                return ResponseEntity.status(500).body("Employee could not be added.");
            }

            // Add User
            UserDto userDto = new UserDto();
            userDto.setEmployee(employee);
            userDto.setActive(true);
            userDto.setExpired(false);
            userDto.setPassword(registrationDTO.getPassword());
            userService.saveUser(userDto);

            return ResponseEntity.of(Optional.of(userDto));
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body("There is an Exception.");
        }
    }

    private boolean validateDepartment(String id) {
        try {
            int did = Integer.parseInt(id);
            return departmentUtility.existDepartment(did);
        }
        catch (Exception e) {
            return false;
        }
    }

    private boolean validateEmployee(String email) {
        try {
            Employee employee = employeeUtility.getEmployeeByEmail(email);
            if(employee == null || employee.getId() == 0) {
                return true;
            }
            return false;
        }
        catch (Exception e) {
            return false;
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(HttpServletRequest request, @RequestBody LoginDTO loginDTO) {
        String username = loginDTO.getEmail();
        String password = loginDTO.getPassword();

        boolean valid = userService.Authenticate(username, password);

        if (valid) {
            User user = userUtility.finUserByEmail(loginDTO.getEmail());
            if(user.getActive()){
                Employee employee = employeeUtility.getEmployeeByEmail(loginDTO.getEmail());
                return ResponseEntity.ok(employee);
            }
            else {
                return ResponseEntity.status(500).body("Your profile is not active. Contact Admin.");
            }
        } else {
            return ResponseEntity.status(500).body("There is an Exception.");
        }
    }



    @GetMapping(value = "/getSession")
    public ResponseEntity<String> getSession(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        if(session == null) {
            return ResponseEntity.status(500).body("No session has started.");
        }
        else{
            return ResponseEntity.ok(session.getAttribute("user").toString());
        }
    }

    @PostMapping("/logout")
    public String logout(HttpServletRequest request, HttpSession session) {
        if (session != null) {
            session.invalidate();
        }
        return "ResponseEntity.ok(Logout successful)";
    }

}
