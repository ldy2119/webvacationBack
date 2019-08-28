package kr.hs.dgsw.webshoppingmall.Service;

import kr.hs.dgsw.webshoppingmall.Domain.Post;
import kr.hs.dgsw.webshoppingmall.Domain.User;

import java.util.HashMap;
import java.util.List;

public interface PostService {
    List<Post> findAll();
    int deleteById(Long id);
    Long add(Post post);
    int modify(Post post);
    Post findById(Long id);
    List findByUserId(Long userId);
    List findByBoardId(Long boardId);
    List findCurrentPostByBoardId(Long boardId);
    List findByPageNumber(Long boardId, int pageNumber, int amountPost);

    int addShowCount(Long id);
    int addRecommendCount(Long id);
    int getCount(Long boardId);

}
