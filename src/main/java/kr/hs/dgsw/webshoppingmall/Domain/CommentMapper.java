package kr.hs.dgsw.webshoppingmall.Domain;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CommentMapper {

    List<Comment> findAll();
    int deleteById(@Param("id") Long id);
    Long add(Comment comment);
    int modify(Comment comment);
    Comment findById(@Param("id") Long id);
    List<Comment> findByPostId(@Param("postId") Long postId);
    List<Comment> findByUserId(@Param("userId") Long userId);
}
