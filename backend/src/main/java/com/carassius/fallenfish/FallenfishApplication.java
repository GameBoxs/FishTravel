package com.carassius.fallenfish;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class FallenfishApplication {

	public static void main(String[] args) {
		SpringApplication.run(FallenfishApplication.class, args);
	}

}
