package kr.hs.dgsw.webshoppingmall.Service;

import kr.hs.dgsw.webshoppingmall.Domain.User;

import java.util.List;

public interface UserService {

    List<User> findAll();
    int deleteById(Long id);
    Long add(User user);
    int modify(User user);
    User findById(Long id);
    User Login(User user);
    User checkAccount(String account);
}
