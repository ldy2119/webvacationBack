package kr.hs.dgsw.webshoppingmall.Service;

import kr.hs.dgsw.webshoppingmall.Domain.Comment;
import kr.hs.dgsw.webshoppingmall.Domain.CommentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentMapper commentMapper;

    @Override
    public List<Comment> findAll() {
        return commentMapper.findAll();
    }

    @Override
    public int deleteById(Long id) {
        return commentMapper.deleteById(id);
    }

    @Override
    public Long add(Comment comment) {
        return commentMapper.add(comment);
    }

    @Override
    public int modify(Comment comment) {
        return commentMapper.modify(comment);
    }

    @Override
    public Comment findById(Long id) {
        return commentMapper.findById(id);
    }

    @Override
    public List<Comment> findByPostId(Long postId) {
        return commentMapper.findByPostId(postId);
    }

    @Override
    public List<Comment> findByUserId(Long userId) {
        return commentMapper.findByUserId(userId);
    }
}
