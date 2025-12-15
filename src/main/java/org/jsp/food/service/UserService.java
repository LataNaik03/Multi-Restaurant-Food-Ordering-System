package org.jsp.food.service;

import org.jsp.food.model.User;
import org.jsp.food.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public User register(User u) {
        return repo.save(u);
    }

    public Optional<User> findByEmail(String email) {
        return repo.findByEmail(email);
    }
}