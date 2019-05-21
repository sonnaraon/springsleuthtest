/*------------------------------------------------------------------------------
 * ������Ʈ : ���������ý��� - UIS
 * �ҽ����� : $Id::                                                     $
 * ������   : $Rev::                           $
 * �������� : $Date::                          $
 * ������   : $Author::                        $
 *
 * 2019. 4. 29.
 * Copyright 2015 LG CNS, All rights reserved
 *----------------------------------------------------------------------------*/
package kma.comis5.uis.aws.mmr.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Vector;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.SftpException;

/**
 * SFTP�� �����ؼ� ���� ������ �ٿ�ε�
 *
 * @author HH
 *
 */
public class SFTPUtil {
   private Session session = null;

     private Channel channel = null;

     private ChannelSftp channelSftp = null;

     /**
      * ������ ���ῡ �ʿ��� ������ ������ �ʱ�ȭ ��Ŵ
      *
      * @param host
      *            ���� �ּ�
      * @param userName
      *            ���ӿ� ���� ���̵�
      * @param password
      *            ��й�ȣ
      * @param port
      *            ��Ʈ��ȣ
      */
     public void init(String host, String userName, String password, int port) {
         JSch jsch = new JSch();
         try {
          System.out.println("==> Connecting to " + host);
             session = jsch.getSession(userName, host, port);
             session.setPassword(password);

             java.util.Properties config = new java.util.Properties();
             config.put("StrictHostKeyChecking", "no");
             session.setConfig(config);
             session.connect();

             channel = session.openChannel("sftp");
             
             System.out.println("==> Connected to " + host);
             
             channel.connect();
         } catch (JSchException e) {
             e.printStackTrace();
         }

         channelSftp = (ChannelSftp) channel;
     }
     
     /**
      * ���ڷ� ���� ����� ���� ����Ʈ�� �����Ѵ�.
      * @param path
      * @return
      */
     public Vector< ChannelSftp.LsEntry> getFileList(String path) {
      
      Vector< ChannelSftp.LsEntry> list = null;
      try {
       System.out.println("path : "+path );
       channelSftp.cd(path);
       //System.out.println(" pwd : " + channelSftp.pwd());
       list = channelSftp.ls(".");
   } catch (SftpException e) {
    e.printStackTrace();
    return null;
   }
      
      return list;
     }
     
     /**
      * �ϳ��� ������ ���ε� �Ѵ�.
      *
      * @param dir
      *            �����ų �ּ�(����)
      * @param file
      *            ������ ����
      */
     public void upload(String dir, File file) {

         FileInputStream in = null;
         try {
             in = new FileInputStream(file);
             channelSftp.cd(dir);
             channelSftp.put(in, file.getName());
         } catch (SftpException e) {
             e.printStackTrace();
         } catch (FileNotFoundException e) {
             e.printStackTrace();
         } finally {
             try {
              if(in != null)
               in.close();
             } catch (IOException e) {
                 e.printStackTrace();
             }
         }
     }

     /**
      * �ϳ��� ������ �ٿ�ε� �Ѵ�.
      *
      * @param dir
      *            ������ ���(����)
      * @param downloadFileName
      *            �ٿ�ε��� ����
      * @param path
      *            ����� ����
      */
     public void download(String dir, String downloadFileName, String path) {
         InputStream in = null;
         FileOutputStream out = null;
         try {
             channelSftp.cd(dir);
             in = channelSftp.get(downloadFileName);
         } catch (SftpException e) {
             // TODO Auto-generated catch block
             e.printStackTrace();
         }

         try {
             out = new FileOutputStream(new File(path));
             int i;

             while ((i = in.read()) != -1) {
                 out.write(i);
             }
         } catch (IOException e) {
             // TODO Auto-generated catch block
             e.printStackTrace();
         } finally {
             try {
                 out.close();
                 in.close();
             } catch (IOException e) {
                 e.printStackTrace();
             }

         }

     }

     /**
      * �������� ������ ���´�.
      */
     public void disconnection() {
         channelSftp.quit();

     }
 }

