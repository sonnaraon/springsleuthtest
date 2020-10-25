package com.spring.sleuth.interceptor;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.xray.AWSXRay;
import com.amazonaws.xray.spring.aop.AbstractXRayInterceptor;
import com.amazonaws.xray.spring.aop.XRayInterceptorUtils;

import lombok.extern.slf4j.Slf4j;

@Aspect
@Configuration
@Slf4j(topic = "SERVER")
public class AWSXRaySpringInspector extends AbstractXRayInterceptor {

	@Override
	protected Object processXRayTrace(ProceedingJoinPoint pjp) throws Throwable {
		try {
			String name = pjp.getSignature().toShortString();
			int subStringIndex = name.indexOf("(");
			if (subStringIndex > -1) {
				name = name.substring(0, subStringIndex);
			}
			AWSXRay.beginSubsegment(name);
			return XRayInterceptorUtils.conditionalProceed(pjp);
		} catch (Exception e) {
			throw e;
		} finally {
			log.trace("Ending Subsegment");
			AWSXRay.endSubsegment();
		}
	}

	@Override
	@Pointcut("within(com.test.controller..*Controller) || within(com.test.service..*Service)")
	public void xrayEnabledClasses() {
	}
}