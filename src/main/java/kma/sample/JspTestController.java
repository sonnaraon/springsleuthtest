package kma.sample;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class JspTestController {

	@RequestMapping("/hello")
	public String hello() {
		return "hello";
	}
}
