package com.spring.sleuth.sample.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Date;
import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.spring.sleuth.sample.service.ElkExampleService;

@RestController
public class ElkExampleController {
	private static final Logger LOG = LoggerFactory.getLogger(ElkExampleController.class);
	@Resource(name = "elkExampleService")
	ElkExampleService elkExampleService;

	@RequestMapping(value = "/elkdemo")
	public String helloWorld() {
		String response = "Hello user ! " + new Date();
		String rtn = elkExampleService.elkDemoServiceMethod(response);
		return rtn;
	}

	@RequestMapping(value = "/elk")
	public String helloWorld1() {
		String rtn = elkExampleService.elkServiceMethod();
		return rtn;
	}

	@RequestMapping(value = "/exception")
	public String exception() {
		String rsp = "";
		try {
			int i = 1 / 0;
			// should get exception
		} catch (Exception e) {
			//e.printStackTrace();
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			String sStackTrace = sw.toString();
			rsp = sStackTrace;
		}
		System.out.println("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
		return rsp;
	}
}