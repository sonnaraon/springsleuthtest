package com.spring.sleuth.sample.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.spring.sleuth.sample.service.LoggingService;

@RestController
public class LoggingController {
	@Resource(name = "loggingService")
	LoggingService loggingService;

	@RequestMapping(value = "/logging", method = RequestMethod.GET)
	public String demo() {

		String rtn = loggingService.testServiceMethod();
		return rtn;
	}
}
