package kr.hs.dgsw.webshoppingmall.Controller;

import kr.hs.dgsw.webshoppingmall.Domain.Board;
import kr.hs.dgsw.webshoppingmall.Service.BoardService;
import kr.hs.dgsw.webshoppingmall.Service.PostService;
import kr.hs.dgsw.webshoppingmall.Service.UserService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
public class BoardController {

    @Autowired
    BoardService boardService;

    @GetMapping(value = "/api/board/boards")
    public List<Board> findAll()
    {
        return  boardService.findAll();
    }

    @DeleteMapping(value = "/api/board/deleteBoard/{id}")
    public int deleteById(@PathVariable Long id)
    {
        return boardService.deleteById(id);
    }

    @PostMapping(value = "/api/board/addBoard")
    public Long add(@RequestBody Board board)
    {
        return boardService.add(board);
    }

    @PutMapping(value = "/api/board/modifyBoard")
    public int modify(@RequestBody Board board)
    {
        return boardService.modify(board);
    }

    @GetMapping(value = "/api/board/findBoard/{id}")
    public Board findById(@PathVariable Long id)
    {
        return boardService.findById(id);
    }

}
