package com.spring.sleuth.sample.service;

import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Service("elkExampleService")
@Transactional
public class ElkExampleService {
	private static final Logger logger = Logger.getLogger(ElkExampleService.class.getName());

	@Autowired
	private RestTemplate restTemplate;
	
	@Bean
	public RestTemplate getRestTemplate() {
		return new RestTemplate();
	}
	
	public String elkDemoServiceMethod(String response) {
		logger.info("sleuth elk Demo : ################################################### " + response);
		System.out.println("==================================================");
		return response;
	}

	public String elkServiceMethod() {
		logger.info("########################################################################################");
		String response = restTemplate.exchange("http://localhost:8080/elkdemo", HttpMethod.GET, null, new ParameterizedTypeReference<String>() {
		}).getBody();
		logger.log(Level.INFO, "/elk - > " + response);
		logger.info("/////////////////////////");

		try {
			String exceptionrsp = restTemplate.exchange("http://localhost:8080/exception", HttpMethod.GET, null, new ParameterizedTypeReference<String>() {
			}).getBody();
			logger.log(Level.INFO, "/elk trying to print exception - > " + exceptionrsp);
			response = response + " === " + exceptionrsp;
		} catch (Exception e) {
			// exception should not reach here. Really bad practice :)
		}
		logger.info("sleuth elk : ################################################### " + response);
		System.out.println("==================================================");
		return response;
	}
}
