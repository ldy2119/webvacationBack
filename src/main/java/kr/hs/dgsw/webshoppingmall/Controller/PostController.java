package kr.hs.dgsw.webshoppingmall.Controller;

import kr.hs.dgsw.webshoppingmall.Domain.Post;
import kr.hs.dgsw.webshoppingmall.Domain.User;
import kr.hs.dgsw.webshoppingmall.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PostController {

    @Autowired
    PostService postService;

    @GetMapping(value = "/api/post/posts")
    public List<Post> findAll() {
        return postService.findAll();
    }

    @DeleteMapping(value = "/api/post/deletePost/{id}")
    public int deleteById(@PathVariable Long id) {
        return postService.deleteById(id);
    }

    @PostMapping(value = "/api/post/addPost")
    public Long add(@RequestBody Post post) {
        return postService.add(post);
    }

    @PutMapping(value = "/api/post/modifyPost")
    public int modify(@RequestBody Post post) {
        return postService.modify(post);
    }

    @GetMapping(value = "/api/post/findPost/{id}")
    public Post findById(@PathVariable Long id) {
        return postService.findById(id);
    }

    @GetMapping(value = "/api/post/findPostByUserId/{userId}")
    public List findByUserId(@PathVariable Long userId) {
        return postService.findByUserId(userId);
    }

    @GetMapping(value = "/api/post/findPostByBoardId/{boardId}")
    public List findByBoardId(@PathVariable Long boardId) {
        return postService.findByBoardId(boardId);
    }

    @GetMapping(value = "/api/post/findCurrentPostByBoardId/{boardId}")
    public List findCurrentPostByBoardId(@PathVariable Long boardId)
    {
        return postService.findCurrentPostByBoardId(boardId);
    }

    @GetMapping(value = "/api/post/findByPageNumber/{boardId}/{pageNumber}/{amountPost}")
    public List findByPageNumber(@PathVariable Long boardId, @PathVariable int pageNumber, @PathVariable int amountPost)
    {
        return postService.findByPageNumber(boardId, pageNumber, amountPost);
    }

    @GetMapping(value = "/api/post/addShowCount/{id}")
    public int addShowCount(@PathVariable Long id) {
        return postService.addShowCount(id);
    }

    @GetMapping(value = "/api/post/addRecommendCount/{id}")
    public int addRecommendCount(@PathVariable Long id) {
        return postService.addRecommendCount(id);
    }


    @GetMapping(value = "/api/board/getCount/{boardId}")
    public int getCount(@PathVariable Long boardId)
    {
        return postService.getCount(boardId);
    }
}
