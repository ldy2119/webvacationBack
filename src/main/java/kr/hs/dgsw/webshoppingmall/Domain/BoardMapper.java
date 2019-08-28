package kr.hs.dgsw.webshoppingmall.Domain;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BoardMapper {

    List<Board> findAll();
    int deleteById(@Param("id") Long id);
    Long add(Board board);
    int modify(Board board);
    Board findById(@Param("id") Long id);
    int getCount(@Param("id") Long id);
}
