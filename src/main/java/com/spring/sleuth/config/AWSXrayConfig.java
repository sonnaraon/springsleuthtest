package com.spring.sleuth.config;

import java.net.InetAddress;
import java.net.URL;
import java.net.UnknownHostException;

import javax.annotation.PostConstruct;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import com.amazonaws.xray.AWSXRay;
import com.amazonaws.xray.AWSXRayRecorder;
import com.amazonaws.xray.AWSXRayRecorderBuilder;
import com.amazonaws.xray.javax.servlet.AWSXRayServletFilter;
import com.amazonaws.xray.plugins.EC2Plugin;
import com.amazonaws.xray.strategy.ContextMissingStrategy;
import com.amazonaws.xray.strategy.DefaultStreamingStrategy;
import com.amazonaws.xray.strategy.sampling.LocalizedSamplingStrategy;

@Component
public class AWSXrayConfig {
	@PostConstruct
	public void init() {
		AWSXRayRecorderBuilder builder = AWSXRayRecorderBuilder.standard().withPlugin(new EC2Plugin());
		URL ruleFile = AWSXrayConfig.class.getResource("/sampling-rules.json");
		builder.withSamplingStrategy(new LocalizedSamplingStrategy(ruleFile));
		builder.withContextMissingStrategy(new IgnoreContextMissingStrategy());
		// Exception while sending segment over UDP 에러 해결을 위해 추가함
		builder.withStreamingStrategy(new DefaultStreamingStrategy(30));
		AWSXRayRecorder globalRecorder = builder.build();
		AWSXRay.setGlobalRecorder(globalRecorder);
	}

//	@Bean
//	public Filter TracingFilter() {
//		String from = null;
//		try {
//			// 해당 서버의 hostname을 모니터링 대상 어플리케이션(or 서버) 이름으로 지정함
//			from = InetAddress.getLocalHost().getHostName();
//		} catch (UnknownHostException e) {
//			from = "serverName";
//		}
//		return new AWSXRayServletFilter(from);
//	}
	@Bean
	public FilterRegistrationBean TracingFilter() {
		String from = null;
		try {
			from = InetAddress.getLocalHost().getHostName();
		} catch (UnknownHostException e) {
			from = "serverName";
		}
		FilterRegistrationBean registration = new FilterRegistrationBean();
		registration.setFilter(new AWSXRayServletFilter(from));
		registration.addUrlPatterns("/*");
		return registration;
	}

	// context Missing 에러 해결을 위해 추가함
	public class IgnoreContextMissingStrategy implements ContextMissingStrategy {
		public IgnoreContextMissingStrategy() {
		}

		@Override
		public void contextMissing(String message, Class<? extends RuntimeException> exceptionClass) {
		}
	}
}