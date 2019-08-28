package kr.hs.dgsw.webshoppingmall.Domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class User {
    private Long id;
    private String account;

    private String password;

    private String nickname;
    private String gender;
    private String imagePath;

    private LocalDateTime created;
    private LocalDateTime updated;

}
