package kr.hs.dgsw.webshoppingmall.Service;

import kr.hs.dgsw.webshoppingmall.Domain.Board;

import java.util.List;

public interface BoardService {

    List<Board> findAll();
    int deleteById(Long id);
    Long add(Board board);
    int modify(Board board);
    Board findById(Long id);
    int getCount(Long id);
}
