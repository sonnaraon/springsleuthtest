package kma.sample.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LinkController {

	private static Logger logger = LoggerFactory.getLogger(LinkController.class);
	
	@RequestMapping(value = "/sample/logExternalLink.do", method = RequestMethod.GET)
	public String logExternalLink() {
		
		return "sample/linkTest";
	}
	
	@RequestMapping(value = "/sample/linkClicked.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, String> linkClicked(@RequestParam(value="systemName") String systemName, ModelMap model) {
		
		logger.debug("Logging Request for " + systemName);
		
		Map<String, String> rtn = new HashMap<String, String>();
		rtn.put("rtnUrl", "http://192.168.2.129:6060");
		
		return rtn;
	}
}
