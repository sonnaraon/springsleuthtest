package kma.sample.service;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kma.sample.domain.ReturnVO;
import kma.sample.mapper.TestMapper;

@Service("testService")
@Transactional
public class TestService {

	Logger logger = LoggerFactory.getLogger(TestService.class);
	
	@Resource(name = "testMapper")
	TestMapper testMapper;
	
	public String testServiceMethod() {
		
		List<ReturnVO> rtn = testMapper.selectTest(0.5, "XXXXX");
		
		//rtn.forEach(vo -> System.out.println(vo.toString()));
		rtn.forEach(vo -> logger.info(vo.toString()));
		return rtn.toString();
		
	}
}
