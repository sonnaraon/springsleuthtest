package com.spring.sleuth.sample.controller;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.spring.sleuth.sample.service.ElkExampleService;

@RestController
public class ElkExampleController {
	private static final Logger LOG = Logger.getLogger(ElkExampleController.class.getName());
	@Resource(name = "elkExampleService")
	ElkExampleService elkExampleService;

	@Autowired
	RestTemplate restTemplete;

	@Bean
	RestTemplate restTemplate() {
		return new RestTemplate();
	}

	@RequestMapping(value = "/elkdemo")
	public String helloWorld() {
		String response = "Hello user ! " + new Date();
		LOG.log(Level.INFO, "/elkdemo - > " + response);
		LOG.info("====================");
		String rtn = elkExampleService.testServiceMethod(response);
		return rtn;
	}

	@RequestMapping(value = "/elk")
	public String helloWorld1() {
		String rtn = "";
		String response = restTemplete.exchange("http://192.168.2.167:8080/elkdemo", HttpMethod.GET, null, new ParameterizedTypeReference<String>() {
		}).getBody();
		LOG.log(Level.INFO, "/elk - > " + response);
		LOG.info("/////////////////////////");

		try {
			String exceptionrsp = restTemplete.exchange("http://192.168.2.167:8080/exception", HttpMethod.GET, null, new ParameterizedTypeReference<String>() {
			}).getBody();
			LOG.log(Level.INFO, "/elk trying to print exception - > " + exceptionrsp);
			response = response + " === " + exceptionrsp;
			rtn = elkExampleService.testServiceMethod(response);
		} catch (Exception e) {
			// exception should not reach here. Really bad practice :)
		}

		return rtn;
	}

	@RequestMapping(value = "/exception")
	public String exception() {
		String rsp = "";
		LOG.info("--------------------");
		try {
			int i = 1 / 0;
			// should get exception
		} catch (Exception e) {
			e.printStackTrace();
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			String sStackTrace = sw.toString(); // stack trace as a string
			rsp = sStackTrace;
		}
		return rsp;
	}
}