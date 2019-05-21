package kma.comis5;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;

@SpringBootApplication
@ImportResource("classpath:applicationContext.xml")
public class Comis5TemplateApplication {

	public static void main(String[] args) {
		SpringApplication.run(Comis5TemplateApplication.class, args);
	}

}
