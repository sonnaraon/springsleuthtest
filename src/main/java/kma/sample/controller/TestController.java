package kma.sample.controller;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import kma.sample.service.TestService;

@RestController
public class TestController {

	@Resource(name = "testService")
	TestService testService;
	
	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public String demo() {
		
		String rtn = testService.testServiceMethod();
		return rtn;
	}
}
