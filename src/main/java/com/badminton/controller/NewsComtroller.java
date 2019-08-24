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
        String news_content = "吉隆坡15日消息，参加世锦赛的大马球员，已在教练总监黄综翰的带领下，出发前往瑞士巴塞尔。黄综翰表示，即使李梓嘉还没有能力冲击奖牌，但他希望小李至少都能杀进8强。"+
                "在李宗伟退役之前，大马男单总是夺冠热门之一。如今虽没有了“老李”，但小李（李梓嘉）最近进步很明显，黄综翰对他充满了期待。"+
                "黄综翰说：“目前，虽然李梓嘉还没有足够的能力去冲击奖牌，但我希望小李至少能杀进8强，以便获得向日本的世界第一兼卫冕冠军桃田贤斗讨教的机会。”";
        Date date_create=new Date();
        String img = "../res/static/img/news_img1.jpg";

        News news = new News();
        news.setNews1_title(news_title);
        news.setNews1_content(news_content);
        news.setNews1_create_time(date_create);
        news.setNews1_img(img);

        newsService.insertNews(news);
//        response.sendRedirect("/html/user/turn1.html");
    }

    @RequestMapping(value = "/deleteNews",method = RequestMethod.POST, produces= "application/json;charset=UTF-8")
    @ResponseBody
    public void deleteANews(HttpServletRequest request,HttpServletResponse response) throws IOException {
//        String news_id = request.getParameter("post_id");
//        int id = Integer.parseInt(news_id);
        int id = 1;
        newsService.deleteNews(id);
    }

    @RequestMapping(value = "/selectAllNews",method = RequestMethod.POST, produces= "application/json;charset=UTF-8")
    @ResponseBody
    public String selectAllNews(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        List<News> newses=newsService.selectAllNews();
        ObjectMapper mapper=new ObjectMapper();
        String newsJson=mapper.writeValueAsString(newses);
        System.out.println(newsJson);
        return newsJson;
    }

    @RequestMapping(value = "/selectNewsById",method = RequestMethod.POST, produces= "application/json;charset=UTF-8")
    @ResponseBody
    public String selectNewsById(HttpServletRequest request, HttpServletResponse response)
        throws IOException, ServletException {
        String news_id = request.getParameter("newsId");
        int id = Integer.parseInt(news_id);
        News news = newsService.selectNewsById(id);
        ObjectMapper mapper = new ObjectMapper();
        String newsJson = mapper.writeValueAsString(news);
        return newsJson;
    }
}
