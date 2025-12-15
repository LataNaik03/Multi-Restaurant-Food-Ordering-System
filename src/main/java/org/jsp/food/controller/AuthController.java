package org.jsp.food.controller;

import org.jsp.food.data.LoginRequest;
import org.jsp.food.data.RegisterRequest;
import org.jsp.food.model.User;
import org.jsp.food.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // ✅ Register API
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        // Check if email already exists
        if (userService.findByEmail(req.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered");
        }

        // Create new user
        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(req.getPassword()); // (Note: plain text only for demo)
        user.setRole("USER");

        // Save and return the registered user
        return ResponseEntity.ok(userService.register(user));
    }

    // ✅ Login API (Fixed)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        Optional<User> optUser = userService.findByEmail(req.getEmail());

        if (optUser.isPresent()) {
            User user = optUser.get();

            if (user.getPassword().equals(req.getPassword())) {
                // ✅ Return full user object without password
                User safeUser = new User();
                safeUser.setId(user.getId());
                safeUser.setName(user.getName());
                safeUser.setEmail(user.getEmail());
                safeUser.setRole(user.getRole());

                return ResponseEntity.ok(safeUser); // <--- MAIN FIX
            }
        }

        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
