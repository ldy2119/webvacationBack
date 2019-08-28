package kr.hs.dgsw.webshoppingmall.Controller;

import kr.hs.dgsw.webshoppingmall.Domain.User;
import kr.hs.dgsw.webshoppingmall.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping(value = "/api/user/users")
    public List users()
    {
        return this.userService.findAll();
    }


    @GetMapping(value = "/api/user/findById/{id}")
    public User findById(@PathVariable Long id)
    {
        return this.userService.findById(id);
    }

    @PostMapping(value = "/api/user/login")
    public User Login(@RequestBody User user)
    {
        return this.userService.Login(user);
    }

    @PostMapping(value = "/api/user/addUser")
    public Long addUser(@RequestBody User user)
    {
        return userService.add(user);
    }

    @PutMapping(value = "/api/user/modifyUser")
    public int modifyUser(@RequestBody User user)
    {
        return userService.modify(user);
    }

    @DeleteMapping(value = "/api/user/deleteUser/{id}")
    public int deleteUser(@PathVariable Long id)
    {
        return userService.deleteById(id);
    }

    @GetMapping(value = "/api/user/checkAccount/{account}")
    public User checkAccount(@PathVariable String account)
    {
        return userService.checkAccount(account);
    }
}
