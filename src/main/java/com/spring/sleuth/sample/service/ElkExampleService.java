package com.spring.sleuth.sample.service;

import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.amazonaws.xray.proxies.apache.http.HttpClientBuilder;
import com.amazonaws.xray.spring.aop.XRayEnabled;

@Service("elkExampleService")
@Transactional
@XRayEnabled
public class ElkExampleService {
	private static final Logger logger = LoggerFactory.getLogger(ElkExampleService.class);

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate(clientHttpRequestFactory());
	}

	private HttpComponentsClientHttpRequestFactory clientHttpRequestFactory() {
		PoolingHttpClientConnectionManager manager = new PoolingHttpClientConnectionManager();
		manager.setDefaultMaxPerRoute(500);
		manager.setMaxTotal(50);

		HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
		CloseableHttpClient httpClient = HttpClientBuilder.create().setConnectionManager(manager).build();
		factory.setHttpClient(httpClient);
		return factory;
	}

//	@Autowired
//	private RestTemplate restTemplate;
//
//	@Bean
//	public RestTemplate getRestTemplate() {
//		return new RestTemplate();
//	}
//
//	public String elkDemoServiceMethod(String response) {
//		logger.info("sleuth elk Demo : ################################################### " + response);
//		return response;
//	}
//
//	public String elkServiceMethod() {
//		String response = restTemplate.exchange("http://springboot2.default:8080/elkdemo", HttpMethod.GET, null,
//				new ParameterizedTypeReference<String>() {
//				}).getBody();
//
//		try {
//			String exceptionrsp = restTemplate.exchange("http://springboot2.default:8080/exception", HttpMethod.GET,
//					null, new ParameterizedTypeReference<String>() {
//					}).getBody();
//			response = response + " ================= " + exceptionrsp;
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		logger.info("sleuth elk : ################################################### " + response);
//		return response;
//	}
}
