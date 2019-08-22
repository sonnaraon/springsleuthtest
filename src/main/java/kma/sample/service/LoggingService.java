package kma.sample.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Service("loggingService")
@Transactional
public class LoggingService {
	Logger logger = LoggerFactory.getLogger(LoggingService.class);

	@Autowired
	private RestTemplate restTemplate;
	
	@Bean
	public RestTemplate getRestTemplate() {
		return new RestTemplate();
	}

	public String testServiceMethod() {
		logger.info("###################################################");
		System.out.println("==================================================");
		return restTemplate.toString();

	}
}
