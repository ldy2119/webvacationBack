package kr.hs.dgsw.webshoppingmall.Service;

import kr.hs.dgsw.webshoppingmall.Domain.Post;
import kr.hs.dgsw.webshoppingmall.Domain.PostMapper;
import kr.hs.dgsw.webshoppingmall.Domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    PostMapper postMapper;

    @Override
    public List<Post> findAll() {
        return postMapper.findAll();
    }

    @Override
    public int deleteById(Long id) {
        return postMapper.deleteById(id);
    }

    @Override
    public Long add(Post post) {

        return postMapper.add(post);
    }

    @Override
    public int modify(Post post) {

        return postMapper.modify(post);
    }

    @Override
    public Post findById(Long id) {
        return postMapper.findById(id);
    }

    @Override
    public List findByUserId(Long userId) {
        return postMapper.findByUserId(userId);
    }

    @Override
    public List findByBoardId(Long boardId) {
        return postMapper.findByBoardId(boardId);
    }

    @Override
    public List findCurrentPostByBoardId(Long boardId) {
        return postMapper.findCurrentPostByBoardId(boardId);
    }

    @Override
    public List findByPageNumber(Long boardId, int pageNumber, int amountPost) {
        return postMapper.findByPageNumber(boardId, pageNumber, amountPost);
    }

    @Override
    public int addShowCount(Long id) {
        return postMapper.addShowCount(id);
    }

    @Override
    public int addRecommendCount(Long id) {
        return postMapper.addRecommendCount(id);
    }

    @Override
    public int getCount(Long boardId) {
        return postMapper.getCount(boardId);
    }
}
