package kma.comis5.uis.aws.mmr.controller;

import java.io.FileNotFoundException;


import javax.annotation.Resource;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import kma.comis5.uis.aws.mmr.service.AwsMmrService;
import kma.comis5.uis.common.util.UISMap;
import kma.comis5.uis.common.util.UISMapUtil;

@Controller
public class AwsMmrController {

	@Resource(name = "awsMmrService")
	private AwsMmrService awsMmrService;


	@RequestMapping(value = "/comis5/uis/aws/test/weatherman.do")
	public String WeathermanTestMain(HttpServletRequest req, HttpServletResponse res, ModelMap model) throws Exception {

		String rtnUrl = "/comis5/uis/aws/mmr/index";
		return rtnUrl;
	}

	@RequestMapping(value = "/comis5/uis/aws/mmr/retMmrWeathermanTest.kajx")
	public String retMmrWeathermanTest(HttpServletRequest req, HttpServletResponse res, ModelMap model)
			throws Exception {

		UISMap reqData = UISMapUtil.getData(req);
		UISMap result = new UISMap();
		try {
			result = awsMmrService.retrieveData(reqData);

			/* TODO DevonException throw check */
			UISMap result2 = awsMmrService.retrieveColor(reqData);
			result.set("color", result2);
		} catch (FileNotFoundException e) {
			result.setBoolean("isExisted", false);
			System.out.println(e.getMessage());
			System.out.println(e.getStackTrace());
		}
		UISMap returnData = new UISMap();
		returnData.set("result", result);
		returnData.set("input", reqData);


		model.addAttribute("input", reqData);
		model.addAttribute("data", returnData);

		return "jsonView";
	}

}