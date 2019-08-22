package com.badminton.controller;

import com.badminton.pojo.News;
import com.badminton.service.NewsService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("news")
public class NewsComtroller {

    @Autowired
    @Qualifier("NewsService")
    private NewsService newsService;

    @RequestMapping(value = "/insertNews", method = RequestMethod.GET,produces= "application/json;charset=UTF-8")
    @ResponseBody
    public void insertNews(HttpServletRequest request,
                           HttpServletResponse response) throws IOException {
//        String news_title = request.getParameter("news_title");
//        String news_content = request.getParameter("news_content");
//        Date date_create=new Date();
//        String img = request.getParameter("imgLink");

        String news_title = "新闻测试";
        String news_content = "测试内容";
        Date date_create=new Date();
        String img = "图片";

        News news = new News();
        news.setNews1_title(news_title);
        news.setNews1_content(news_content);
        news.setNews1_create_time(date_create);
        news.setNews1_img(img);

        newsService.insertNews(news);
//        response.sendRedirect("/html/user/turn1.html");
    }

    @RequestMapping(value = "/deleteNews",method = RequestMethod.GET, produces= "application/json;charset=UTF-8")
    @ResponseBody
    public void deleteANews(HttpServletRequest request,HttpServletResponse response) throws IOException {
//        String news_id = request.getParameter("post_id");
//        int id = Integer.parseInt(news_id);
        int id = 1;
        newsService.deleteNews(id);
    }

    @RequestMapping(value = "/selectAllNews",method = RequestMethod.GET, produces= "application/json;charset=UTF-8")
    @ResponseBody
    public String selectAllNews(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        List<News> newses=newsService.selectAllNews();
        ObjectMapper mapper=new ObjectMapper();
        String newsJson=mapper.writeValueAsString(newses);
        System.out.println(newsJson);
        return newsJson;
    }
}
