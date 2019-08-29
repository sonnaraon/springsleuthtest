package com.spring.sleuth.sample.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Service("elkExampleService")
@Transactional
public class ElkExampleService {
	Logger logger = LoggerFactory.getLogger(ElkExampleService.class);

	@Autowired
	private RestTemplate restTemplate;
	
	@Bean
	public RestTemplate getRestTemplate() {
		return new RestTemplate();
	}

	public String testServiceMethod(String response) {
		logger.info("sleuth : ################################################### " + response);
		System.out.println("==================================================");
		return response;
	}
}
