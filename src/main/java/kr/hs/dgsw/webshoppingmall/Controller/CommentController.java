package kr.hs.dgsw.webshoppingmall.Controller;

import kr.hs.dgsw.webshoppingmall.Domain.Comment;
import kr.hs.dgsw.webshoppingmall.Service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping(value = "/api/comment/comments")
    public List<Comment> findAll() {
        return commentService.findAll();
    }

    @DeleteMapping(value = "/api/comment/deleteComment/{id}")
    public int deleteById(@PathVariable Long id) {
        return commentService.deleteById(id);
    }

    @PostMapping(value = "/api/comment/addComment")
    public Long add(@RequestBody Comment comment) {
        System.out.println(comment);
        return commentService.add(comment);
    }

    @PutMapping(value = "/api/comment/modifyComment")
    public int modify(@RequestBody Comment comment) {
        return commentService.modify(comment);
    }

    @GetMapping(value = "/api/comment/findComment/{id}")
    public Comment findById(@PathVariable Long id) {
        return commentService.findById(id);
    }

    @GetMapping(value = "/api/comment/findCommentByPostId/{postId}")
    public List<Comment> findByPostId(@PathVariable Long postId) {
        return commentService.findByPostId(postId);
    }

    @GetMapping(value = "/api/comment/findCommentByUserId/{userId}")
    public List<Comment> findByUserId(@PathVariable Long userId) {
        return commentService.findByUserId(userId);
    }
}
