package com.spring.sleuth.config;

import java.net.URL;

import javax.servlet.Filter;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import com.amazonaws.xray.AWSXRay;
import com.amazonaws.xray.AWSXRayRecorderBuilder;
import com.amazonaws.xray.javax.servlet.AWSXRayServletFilter;
import com.amazonaws.xray.plugins.EC2Plugin;
import com.amazonaws.xray.plugins.ElasticBeanstalkPlugin;
import com.amazonaws.xray.strategy.sampling.CentralizedSamplingStrategy;

@Configuration
public class WebConfig implements ServletContextListener {

	@Bean
	MappingJackson2JsonView jsonView() {
		return new MappingJackson2JsonView();
	}

	@Bean
	public Filter TracingFilter() {
		return new AWSXRayServletFilter("springboot");
	}

	@Override
  public void contextInitialized(ServletContextEvent event) {
    AWSXRayRecorderBuilder builder = AWSXRayRecorderBuilder.standard().withPlugin(new EC2Plugin()).withPlugin(new ElasticBeanstalkPlugin());

    URL ruleFile = WebConfig.class.getResource("/sampling-rules.json");
    builder.withSamplingStrategy(new CentralizedSamplingStrategy(ruleFile));

    AWSXRay.setGlobalRecorder(builder.build());

//    AWSXRay.beginSegment("springboot");
//    
//    AWSXRay.endSegment();
  }
}