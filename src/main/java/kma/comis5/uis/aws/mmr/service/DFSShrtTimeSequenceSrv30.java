package kma.comis5.uis.aws.mmr.service;

/*------------------------------------------------------------------------------
 * 프로젝트 : Advanced Forecast System - [프로젝트명]
 * 소스정보 : $Id: DFSShrtTimeSequenceSrv30.java 31613 2014-10-13 09:55:04Z shlee $$
 * 리비전   : $Rev:: 31613                 $
 * 변경일자 : $Date:: 2014-10-13 18:55:04 #$
 * 변경자   : $Author:: shlee                $
 *
 * Copyright 2011 KMA and LG CNS All rights reserved
 *----------------------------------------------------------------------------*/

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DFSShrtTimeSequenceSrv30 {
	Calendar utcCal;

	/** UTC tm */
	String utcTm;
	/** KST tm */
	String kstTm;
	/** 시간 순서 */
	int tmSeq;

	public String getKstTm() {
		return kstTm;
	}
	public void setKstTm(String kstTm) {
		this.kstTm = kstTm;
	}
	public String getUtcTm() {
		return utcTm;
	}
	public void setUtcTm(String tm) {
		this.utcTm = tm;
	}
	public int getTmSeq() {
		return tmSeq;
	}
	public void setTmSeq(int tmSeq) {
		this.tmSeq = tmSeq;
	}
	public DFSShrtTimeSequenceSrv30(){
		super();
		this.utcTm = "";
		this.kstTm = "";
		this.tmSeq = 0;
	}
	public DFSShrtTimeSequenceSrv30(Calendar utcCal) {
		super();
		this.setUtcCal(utcCal);
	}
	public DFSShrtTimeSequenceSrv30(String utcTm, int tmSeq) {
		super();
		this.utcTm = utcTm;
		this.kstTm = utcToKst(utcTm);
		this.tmSeq = tmSeq;
	}
	public DFSShrtTimeSequenceSrv30(String utcTm, String kstTm, int tmSeq) {
		super();
		this.utcTm = utcTm;
		this.kstTm = kstTm;
		this.tmSeq = tmSeq;
	}
	public String utcToKst(String utcTm){
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmm");
		try{
			Date tDate = df.parse(utcTm);
			tDate.setTime(tDate.getTime() + 1000*60*60*9);
			return df.format(tDate);
		}catch(Exception e) {
			return utcTm;
		}
	}
	public Calendar getUtcCal() {
		return utcCal;
	}
	public void setUtcCal(Calendar utcCal) {
		this.utcCal = utcCal;
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmm");
		this.utcTm = df.format(utcCal.getTime());
		utcCal.add(Calendar.HOUR_OF_DAY, 9);
		this.tmSeq = (int)((utcCal.get(Calendar.HOUR_OF_DAY)-2)/3);
		this.kstTm = df.format(utcCal.getTime());
		utcCal.add(Calendar.HOUR_OF_DAY, -9);
	}
	public Calendar getKstCal() {
		Calendar kstCal = (Calendar)this.utcCal.clone();
		kstCal.add(Calendar.HOUR_OF_DAY, 9);
		return kstCal;
	}
	public String toString() {
		return this.getKstTm() + "(KST)";
	}
}
