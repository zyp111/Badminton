package com.badminton.bbs.controller;

import com.badminton.bbs.pojo.Reply;
import com.badminton.bbs.pojo.User;
import com.badminton.bbs.service.PostService;
import com.badminton.bbs.service.ReplyService;
import com.fasterxml.jackson.core.JsonProcessingException;
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
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("reply")
public class ReplyController {
    //自动注入service
    @Autowired
    @Qualifier("ReplyService")
    private ReplyService replyService;

    @Autowired
    @Qualifier("PostService")
    private PostService postService;

    @RequestMapping(value = "/getReplyByPostID",method = RequestMethod.POST, produces= "application/json;charset=UTF-8")
    @ResponseBody
    //根据帖子的id即reply_post_id取出关于该帖所有的回复
    public String selectAllReplyByPostID(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException{
        String postID=request.getParameter("post_id");
        int postId=Integer.valueOf(postID);
        List<Reply> rly=replyService.selectAllReplyByPostID(postId);
        if(rly==null||rly.size()==0||rly.isEmpty()) {
            return "";
        } else {
            ObjectMapper mapper = new ObjectMapper();
            String replyJson = mapper.writeValueAsString(rly);
            String result = replyJson;
            System.out.println(result);
            return result;
        }
    }

    @RequestMapping(value = "/storeReply", method = RequestMethod.POST,produces= "application/json;charset=UTF-8")
    @ResponseBody
    public void insertReply(HttpServletRequest request,
                            HttpServletResponse response) throws IOException {
        HttpSession session=request.getSession();
        User user=(User)session.getAttribute("user");
        int reply_post_id=Integer.parseInt(request.getParameter("reply_post_id"));
        if(user==null) {
            response.sendRedirect("/html/detail.html?post_id="+reply_post_id+"&status=1");
            return;
        }
        String reply_user_name=user.getUser_name();
        String reply_content=request.getParameter("reply_content");
        Date reply_create_time=new Date();
       // SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //String updateTime = formatter.format(reply_create_time);
        int reply_good_count=0;
        int reply_bad_count=0;
        String head_img=user.getHead_img();

        Reply reply=new Reply();

        reply.setReply_post_id(reply_post_id);
        reply.setReply_user_name(reply_user_name);
        reply.setReply_content(reply_content);
        reply.setReply_create_time(reply_create_time);
        reply.setReply_good_count(reply_good_count);
        reply.setReply_bad_count(reply_bad_count);
        reply.setHead_img(head_img);

        replyService.insertReply(reply);



        //前往数据库更改post表的回帖数和更新时间直接调用postService
        postService.updatePost_reply_count(reply_post_id,reply_create_time);
        if(user.getUser_type()==0) {
            response.sendRedirect("/html/adminDetail.html?post_id="+reply_post_id);
        } else {
            response.sendRedirect("/html/detail.html?post_id=" + reply_post_id);
        }
    }

    //根据回复id删一条回复
    @RequestMapping(value = "/deleteAReply",method = RequestMethod.GET, produces= "application/json;charset=UTF-8")
    @ResponseBody
    public void deleteAReply(HttpServletRequest request,HttpServletResponse response) throws IOException {
        String reply_id=request.getParameter("reply_id");
        int id=Integer.parseInt(reply_id);
        int post_id=Integer.parseInt(request.getParameter("post_id"));
        replyService.deleteAReply(id);
        postService.updatePost_reply_countdel(post_id);
        HttpSession session=request.getSession();
        User user=(User)session.getAttribute("user");
        if(user.getUser_type()==0) {
            response.sendRedirect("/html/adminDetail.html?post_id="+post_id);
        } else {
            response.sendRedirect("/html/detail.html?post_id="+post_id);
        }
    }

    //根据post删所有回复
    @RequestMapping(value = "/deleteReplyByPost",method = RequestMethod.GET, produces= "application/json;charset=UTF-8")
    @ResponseBody
    public void deleteReplyByPost(HttpServletRequest request) throws JsonProcessingException {
        String reply_id=request.getParameter("reply_post_id");
        int id=Integer.parseInt(reply_id);
        replyService.deleteAllPostReply(id);
    }


}

