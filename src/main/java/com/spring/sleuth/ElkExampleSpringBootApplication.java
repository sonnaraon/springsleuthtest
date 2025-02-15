package com.spring.sleuth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
//@EnableAspectJAutoProxy
@EnableAutoConfiguration(exclude = { DataSourceAutoConfiguration.class })
public class ElkExampleSpringBootApplication {

	public static void main(String[] args) {
		SpringApplication.run(ElkExampleSpringBootApplication.class, args);
	}
}