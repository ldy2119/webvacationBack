package kr.hs.dgsw.webshoppingmall.Service;

import kr.hs.dgsw.webshoppingmall.Domain.Comment;

import java.util.List;

public interface CommentService {

    List<Comment> findAll();
    int deleteById(Long id);
    Long add(Comment comment);
    int modify(Comment comment);
    Comment findById(Long id);
    List<Comment> findByPostId(Long postId);
    List<Comment> findByUserId(Long userId);
}
