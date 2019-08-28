package kr.hs.dgsw.webshoppingmall.Domain;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Post {
    private Long id;

    private Long userId;
    private Long boardId;
    private String title;
    private String content;
    private Long recommendedCount;
    private Long showCount;
    private LocalDateTime created;
    private LocalDateTime updated;
}
