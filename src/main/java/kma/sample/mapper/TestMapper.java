package kma.sample.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import kma.sample.domain.ReturnVO;

@Mapper
public interface TestMapper {

	public List<ReturnVO> selectTest(@Param(value = "num") double num, @Param(value = "content") String content);
}
