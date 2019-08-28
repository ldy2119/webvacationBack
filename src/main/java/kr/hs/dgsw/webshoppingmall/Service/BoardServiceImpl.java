package kr.hs.dgsw.webshoppingmall.Service;

import kr.hs.dgsw.webshoppingmall.Domain.Board;
import kr.hs.dgsw.webshoppingmall.Domain.BoardMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    BoardMapper boardMapper;

    @Override
    public List<Board> findAll() {
        return boardMapper.findAll();
    }

    @Override
    public int deleteById(Long id) {
        return boardMapper.deleteById(id);
    }

    @Override
    public Long add(Board board) {
        return boardMapper.add(board);
    }

    @Override
    public int modify(Board board) {
        return boardMapper.modify(board);
    }

    @Override
    public Board findById(Long id) {
        return boardMapper.findById(id);
    }

    @Override
    public int getCount(Long id) {
        return boardMapper.getCount(id);
    }
}
