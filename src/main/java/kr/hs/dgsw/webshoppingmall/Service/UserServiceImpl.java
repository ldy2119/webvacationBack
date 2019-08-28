package kr.hs.dgsw.webshoppingmall.Service;

import kr.hs.dgsw.webshoppingmall.Domain.User;
import kr.hs.dgsw.webshoppingmall.Domain.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;

    @Override
    public List<User> findAll() {
        return userMapper.findAll();
    }

    @Override
    public int deleteById(Long id) {
        return this.userMapper.deleteById(id);
    }

    @Override
    public Long add(User user) {
        return this.userMapper.add(user);
    }

    @Override
    public int modify(User user) {
        return this.userMapper.modify(user);
    }

    @Override
    public User findById(Long id) {
        return this.userMapper.findById(id);
    }

    @Override
    public User Login(User user) {
        return this.userMapper.Login(user);
    }

    @Override
    public User checkAccount(String account) {
        return userMapper.checkAccount(account);
    }
}
