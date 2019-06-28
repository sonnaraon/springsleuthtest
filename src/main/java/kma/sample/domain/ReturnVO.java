package kma.sample.domain;

public class ReturnVO {

	private String test_col1;
	private float test_col2;
	private String test_col3;

	public String getTest_col1() {
		return test_col1;
	}

	public void setTest_col1(String test_col1) {
		this.test_col1 = test_col1;
	}

	public float getTest_col2() {
		return test_col2;
	}

	public void setTest_col2(float test_col2) {
		this.test_col2 = test_col2;
	}

	public String getTest_col3() {
		return test_col3;
	}

	public void setTest_col3(String test_col3) {
		this.test_col3 = test_col3;
	}

	@Override
	public String toString() {
		return "ReturnVO [test_col1=" + test_col1 + ", test_col2=" + test_col2 + ", test_col3=" + test_col3 + "]";
	}

	
	
}
