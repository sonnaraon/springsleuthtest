package com.spring.sleuth.config;

import java.net.URL;

import javax.servlet.Filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import com.amazonaws.xray.AWSXRay;
import com.amazonaws.xray.AWSXRayRecorderBuilder;
import com.amazonaws.xray.javax.servlet.AWSXRayServletFilter;
import com.amazonaws.xray.plugins.EC2Plugin;
import com.amazonaws.xray.plugins.ElasticBeanstalkPlugin;
import com.amazonaws.xray.strategy.sampling.LocalizedSamplingStrategy;


@Configuration
public class WebConfig {
  private static final Logger logger = LoggerFactory.getLogger(WebConfig.class);

  @Bean
	MappingJackson2JsonView jsonView() {
		return new MappingJackson2JsonView();
	}
  @Bean
  public Filter TracingFilter() {
    return new AWSXRayServletFilter("springboot");
  }

  static {
    AWSXRayRecorderBuilder builder = AWSXRayRecorderBuilder.standard().withPlugin(new EC2Plugin()).withPlugin(new ElasticBeanstalkPlugin());

    URL ruleFile = WebConfig.class.getResource("/sampling-rules.json");
    builder.withSamplingStrategy(new LocalizedSamplingStrategy(ruleFile));

    AWSXRay.setGlobalRecorder(builder.build());

//    AWSXRay.beginSegment("springboot");
//    
//    AWSXRay.endSegment();
  }
}