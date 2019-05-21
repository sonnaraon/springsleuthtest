/*
 * @(#) LException.java
 *
 * Copyright �� LG CNS, Inc. All rights reserved.
 *
 * Do Not Erase This Comment!!! (�� �ּ����� ������ ����)
 *
 * DevOn Open Framework�� Ŭ������ ���� ������Ʈ�� ����ϴ� ��� DevOn Open Framework ���ߴ���ڿ���
 * ������Ʈ ���ĸ�Ī, ����� ����ó(Email)���� mail�� �˷��� �Ѵ�.
 *
 * �ҽ��� �����Ͽ� ����ϴ� ��� DevOn Open Framework ���ߴ���ڿ���
 * ����� �ҽ� ��ü�� ����� ������ �˷��� �Ѵ�.
 * �����ڴ� ������ �ҽ��� �����ϴٰ� �ǴܵǴ� ��� �ش� ������ �ݿ��� �� �ִ�.
 * �߿��� Idea�� �����Ͽ��ٰ� �ǴܵǴ� ��� �����Ͽ� ���� List�� �ݿ��� �� �ִ�.
 *
 * (����!) �������� ������� ����� �� �� ������
 * LG CNS �ܺη��� ������ �Ͽ����� �� �ȴ�.
 */
package kma.comis5.kaf.dopen.core.exception;

import java.io.PrintWriter;
import java.io.StringWriter;

/**
 * <pre>
 * DevOn�� ����ϰų� ������ ��� �ʿ��� ��� Exception�� �ֻ��� Ŭ�����̴�.
 * �̴� Exception chaining�� �ʿ��� �⺻���� �۾��� �����Ѵ�.
 * </pre>
 *
 * @author DevOn Open Framework, LG CNS,Inc., devon@lgcns.com
 * @since DevOn Open Framework 1.0.0
 */
public class LException extends Exception {

	private static final long serialVersionUID = 1L;

	/**
	 * Ư���� �޽��� ���� LException�� �����Ѵ�.
	 */
	public LException() {
		super();
	}

	/**
	 * Ư���� �޽����� ���� LException�� �����Ѵ�.
	 *
	 * @param s
	 *            �޽���
	 */
	public LException(String s) {
		super(s);
	}

	/**
	 * Ư���� �޽����� Throwable�� ���� LException�� �����Ѵ�.
	 *
	 * @param message
	 *            �޽���
	 * @param cause
	 *            exception chaining�� �ʿ��� Throwable
	 */
	public LException(String message, Throwable cause) {
		super(message, cause);
	}

	/**
	 * Ư���� Throwable�� ���� LException�� �����Ѵ�.
	 *
	 * @param cause
	 *            exception chaining�� �ʿ��� Throwable
	 */
	public LException(Throwable cause) {
		super(cause.getMessage(), cause);
	}

	/**
	 * LException�� rootCause�� �����ϴ� �޼ҵ��̴�.
	 *
	 * @return Throwable rootCause�� ����
	 */
	public Throwable getRootCause() {
		Throwable tempCause = getCause();

		while (tempCause != null) {
			if (tempCause.getCause() == null) {
				break;
			}
			tempCause = tempCause.getCause();
		}
		return tempCause;
	}

	/**
	 * Stack Trace�� string���·� �����ϴ� �޼ҵ��̴�.
	 *
	 * @return String Stack Trace�� string ���·� ����
	 */
	public String getStackTraceString() {
		StringWriter stringWriter = new StringWriter();
		super.printStackTrace(new PrintWriter(stringWriter));
		return stringWriter.toString();
	}

	/**
	 * Throwable�� exception chaining�� �޽����� stack trace�� ������ PrintWriter��
	 * ����Ѵ�.
	 *
	 * @param log
	 *            PrintWriter
	 * @see java.lang.Throwable
	 */
	public void printStackTrace(PrintWriter log) {
		log.println(getStackTraceString());
	}

}
