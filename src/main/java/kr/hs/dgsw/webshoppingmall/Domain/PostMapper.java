package kr.hs.dgsw.webshoppingmall.Domain;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface PostMapper {

    List<Post> findAll();
    int deleteById(@Param("id") Long id);
    Long add(Post post);
    int modify(Post post);
    Post findById(@Param("id") Long id);
    List findByUserId(@Param("userId") Long userId);
    List findByBoardId(@Param("boardId") Long boardId);
    List findCurrentPostByBoardId(@Param("boardId") Long boardId);
    List findByPageNumber(@Param("boardId") Long boardId, @Param("pageNumber") long pageNumber, @Param("amountPost") long amountPost);

    int addShowCount(@Param("id") Long id);
    int addRecommendCount(@Param("id") Long id);

    int getCount(@Param("boardId") Long boardId);

}
