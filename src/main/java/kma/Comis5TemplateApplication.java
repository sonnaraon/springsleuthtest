package kma;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.context.annotation.ImportResource;

@SpringBootApplication
@ImportResource("classpath:applicationContext.xml")
@EnableAutoConfiguration(exclude={MongoAutoConfiguration.class})
public class Comis5TemplateApplication {

	public static void main(String[] args) {
		SpringApplication.run(Comis5TemplateApplication.class, args);
		
		System.out.println("Code Modified");
	}

}
