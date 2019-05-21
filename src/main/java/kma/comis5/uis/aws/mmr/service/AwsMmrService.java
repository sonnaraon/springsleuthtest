/*------------------------------------------------------------------------------
 * ������Ʈ : ���������ý��� - UIS
 * �ҽ����� : $Id::                                                     $
 * ������   : $Rev::                           $
 * �������� : $Date::                          $
 * ������   : $Author::                        $
 *
 * 2019. 4. 25.
 * Copyright 2015 LG CNS, All rights reserved
 *----------------------------------------------------------------------------*/
package kma.comis5.uis.aws.mmr.service;

import java.io.FileNotFoundException;

import kma.comis5.uis.common.util.UISMap;


/**
 * <pre>
 * ���׿��� interface
 * @author Royeon Kim
 * @since 2019. 04. 25.
 * @version 1.0
 * @Modification
 * ������          ������          		��������
 * ------------  ---------------   ------------------------------------------------------
 * 2019. 04. 25.  Royeon Kim	   	���� ����
 * </pre>
 */
public interface AwsMmrService {
	public UISMap retrieveData(UISMap input) throws Exception;
	
	public float[] retrieveSvcDstTplShrtData(UISMap param) throws Exception;
	
//	public UISMap retrieveColor(UISMap param) throws DevonException, FileNotFoundException;
	public UISMap retrieveColor(UISMap param) throws FileNotFoundException, Exception;
	
	public UISMap getColorTable(String fileName, int lvl_code, int MM);
}
