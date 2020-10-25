package com.spring.sleuth.config;

import java.net.URL;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import com.amazonaws.xray.AWSXRay;
import com.amazonaws.xray.AWSXRayRecorderBuilder;
import com.amazonaws.xray.plugins.EC2Plugin;
import com.amazonaws.xray.plugins.ECSPlugin;
import com.amazonaws.xray.plugins.EKSPlugin;
import com.amazonaws.xray.strategy.sampling.LocalizedSamplingStrategy;

@Configuration
public class WebConfig implements ServletContextListener{

	@Bean
	MappingJackson2JsonView jsonView() {
		return new MappingJackson2JsonView();
	}
	
	static {
	    AWSXRayRecorderBuilder builder = AWSXRayRecorderBuilder.standard().withPlugin(new EC2Plugin()).withPlugin(new ECSPlugin()).withPlugin(new EKSPlugin());

	    URL ruleFile = WebConfig.class.getResource("/sampling-rules.json");
	    builder.withSamplingStrategy(new LocalizedSamplingStrategy(ruleFile));

	    AWSXRay.setGlobalRecorder(builder.build());
	  }
	
	@Override
    public void contextDestroyed(ServletContextEvent event) { }
}
