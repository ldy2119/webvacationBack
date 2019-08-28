package kr.hs.dgsw.webshoppingmall.Domain;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {

    @Select("select id, account, nickname, gender, imagePath, created, updated from user")
    List<User> findAll();

    @Delete("delete from user where id=#{id}")
    int deleteById(@Param("id") Long id);

    Long add(User user);
    int modify(User user);
    User findById(@Param("id") Long id);

    User Login(User user);
    User checkAccount(@Param("account") String account);

}
