package kr.hs.dgsw.webshoppingmall.Controller;

import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URLConnection;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.UUID;

@RestController
public class AttachmentController {

    @PostMapping("/attachment")
    public String upload(@RequestPart MultipartFile uploadFile)
    {
        String storedPath = "C:/Users/Quote/IdeaProjects/webshoppingmall/src/main/resources/images/"
                + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd."))
                + UUID.randomUUID().toString() + "_"
                + uploadFile.getOriginalFilename();

        try
        {
            File destFile = new File(storedPath);
            destFile.getParentFile().mkdirs();
            uploadFile.transferTo(destFile);
            String originName = destFile.getName();
            return originName;
        }
        catch(Exception e)
        {

        }
        return null;
    }

    @GetMapping("/attachment/{id}")
    public void download(@PathVariable String id, HttpServletRequest request, HttpServletResponse response){
        try {
//            String fileName = id + Calendar.getInstance().toString();
            String fileName = id;
            String filepath = "C:\\Users\\Quote\\IdeaProjects\\webshoppingmall\\src\\main\\resources\\images\\" + fileName;

            File file = new File(filepath);
            if (file.exists() == false) return;
            String mimeType = URLConnection.guessContentTypeFromName(file.getName());
            if (mimeType == null) {
                mimeType = "application/octet-stream";
            }
            response.setContentType(mimeType);
            response.setHeader("Content-Desposition", "inline; filename=\""
            + id);

            response.setContentLength((int) file.length());
            InputStream is = new BufferedInputStream(new FileInputStream(file));
            FileCopyUtils.copy(is, response.getOutputStream());
        }catch(Exception ex){
            System.out.println(ex.getMessage());
        }
    }
}
