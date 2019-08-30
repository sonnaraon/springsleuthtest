package com.spring.sleuth.sample.controller;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.spring.sleuth.sample.service.ElkExampleService;

@RestController
public class ElkExampleController {
	private static final Logger LOG = Logger.getLogger(ElkExampleController.class.getName());
	@Resource(name = "elkExampleService")
	ElkExampleService elkExampleService;

	@RequestMapping(value = "/elkdemo")
	public String helloWorld() {
		String response = "Hello user ! " + new Date();
		LOG.log(Level.INFO, "/elkdemo - > " + response);
		LOG.info("====================");
		String rtn = elkExampleService.elkDemoServiceMethod(response);
		return rtn;
	}

	@RequestMapping(value = "/elk")
	public String helloWorld1() {
		System.out.println("???????????????????????????????????????????????");
		String rtn = elkExampleService.elkServiceMethod();
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