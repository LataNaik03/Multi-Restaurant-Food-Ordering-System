package org.jsp.food;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(
    scanBasePackages = "org.jsp.food",
    exclude = { SecurityAutoConfiguration.class } // ✅ Disable Spring Security login
)
@EnableJpaRepositories(basePackages = "org.jsp.food.repository")
@EntityScan(basePackages = "org.jsp.food.model")
public class FoodApplication {

    public static void main(String[] args) {
        SpringApplication.run(FoodApplication.class, args);
    }
}
