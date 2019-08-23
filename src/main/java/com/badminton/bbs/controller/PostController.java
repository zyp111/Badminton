package com.badminton.bbs.controller;

import com.badminton.bbs.pojo.Post;
import com.badminton.bbs.pojo.User;
import com.badminton.bbs.service.PostService;
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
@RequestMapping("post")
public class PostController {
    //自动注入service
    @Autowired
    @Qualifier("PostService")
    private PostService postService;

    @RequestMapping(value = "/getAPostByID",method = RequestMethod.POST, produces= "application/json;charset=UTF-8")
    @ResponseBody
    //根据帖子的id取出关于该帖信息
    public String selectAPostByID(HttpServletRequest request, HttpServletResponse response)
            throws IOException{
        String postID=request.getParameter("post_id");
        int postId=Integer.valueOf(postID);
        Post post=postService.selectPostByPostID(postId);
        ObjectMapper mapper=new ObjectMapper();
        String postJson=mapper.writeValueAsString(post);
        String result =  postJson;
        System.out.println(result);
        return result;
    }

    @RequestMapping(value = "/getAllPostByUserName",method = RequestMethod.GET, produces= "application/json;charset=UTF-8")
    @ResponseBody
    //根据用户名取出该用户所有帖子
    public String selectAllPostByUserName(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException{
        String username=request.getParameter("post_user_name");
        List<Post> post=postService.selectAllPostByPost_user_name(username);
        ObjectMapper mapper=new ObjectMapper();
        String replyJson=mapper.writeValueAsString(post);
        String result = "{\"allPostByUserName\":" + replyJson + "}";
        System.out.println(result);
        return result;
    }


    @RequestMapping(value = "/storePost", method = RequestMethod.POST,produces= "application/json;charset=UTF-8")
    @ResponseBody
    public void insertPost(HttpServletRequest request,
                            HttpServletResponse response) throws IOException {

        int post_board_id=Integer.parseInt(request.getParameter("class"));
        HttpSession session=request.getSession();
        User user = (User)session.getAttribute("user");
        if(user==null) {
            response.sendRedirect("/bbs/html/user/add.html?status=1");
            return;
        }
        String head_img=user.getHead_img();
        String post_user_name=user.getUser_name();
        String post_title=request.getParameter("L_title");
        String post_content=request.getParameter("L_content");
        int post_reply_count=0;
        int post_status_top=0;
        int post_status_jia=0;
        Date date_create=new Date();
        Date date_update=date_create;

//        int post_board_id=2;
//        String post_user_name="我最帅";
//        String post_title="哈哈哈";
//        String post_content="kaixin";
//        int post_reply_count=10;
//        int post_status=0;
//        Date date_create=new Date();
//        Date date_update=new Date();

        Post post=new Post();
        post.setPost_board_id(post_board_id);
        post.setPost_user_name(post_user_name);
        post.setPost_title(post_title);
        post.setPost_content(post_content);
        post.setPost_reply_count(post_reply_count);
        post.setPost_status_top(post_status_top);
        post.setPost_status_jia(post_status_jia);
        post.setPost_update_time(date_update);
        post.setPost_create_time(date_create);
        post.setHead_img(head_img);
        postService.insertPost(post);
        response.sendRedirect("/bbs/html/user/turn1.html");
    }



    //置顶  根据status_top状态设置置顶或取消置顶!!!!!此处要传两个参数
    @RequestMapping(value = "/topPost",method = RequestMethod.GET, produces= "application/json;charset=UTF-8")
    @ResponseBody
    public void topPost(HttpServletRequest request,HttpServletResponse response) throws IOException {
        String post_id=request.getParameter("post_id");
        int id = Integer.parseInt(post_id);
        int status=postService.selectPostByPostID(id).getPost_status_top();
        if(status==0) {
            status=1;
        } else {
            status=0;
        }
        postService.updatePost_status_top(id,status);
        response.sendRedirect("/bbs/html/adminDetail.html?post_id="+post_id);
    }


    //加精  根据status_jiajing状态设置加精或取消加精!!!!!此处要传两个参数
    @RequestMapping(value = "/jiaPost",method = RequestMethod.GET, produces= "application/json;charset=UTF-8")
    @ResponseBody
    public void jiaPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String post_id=request.getParameter("post_id");
        int id = Integer.parseInt(post_id);
        int status=postService.selectPostByPostID(id).getPost_status_jia();
        if(status==0) {
            status=1;
        } else {
            status=0;
        }
        postService.updatePost_status_jia(id,status);
        response.sendRedirect("/bbs/html/adminDetail.html?post_id="+post_id);
    }

    /*******更改帖子内容  NO--不可改，YES--可改**************/
    //帖子ID         NO
    //论坛版块ID     YES
    //发表者名称     NO
    //帖子名称       YES
    //帖子内容       YES
    //回帖数目       NO
    //置顶           NO
    //加精           NO
    //创建时间       NO
    //更新时间       YES
    //发帖人头像     NO
    @RequestMapping(value = "/updatePost",method = RequestMethod.POST, produces= "application/json;charset=UTF-8")
    @ResponseBody
    public void updatePost(HttpServletRequest request,HttpServletResponse response) throws IOException {
        String post_id = request.getParameter("post_id");
        int id=Integer.parseInt(post_id);

        String board_id = request.getParameter("classId");
        int board=Integer.parseInt(board_id);
        String title = request.getParameter("L_title");
        String content = request.getParameter("L_content");
        Date update=new Date();
        postService.updatePost(id,board,title,content,update);
        HttpSession session = request.getSession();
        User user = (User)session.getAttribute("user");
        if(user.getUser_type()==0) {
            response.sendRedirect("/bbs/html/adminDetail.html?post_id="+post_id);
            return;
        } else {
            response.sendRedirect("/bbs/html/detail.html?post_id="+post_id);
            return;
        }

    }


    //根据id删掉一条帖子
    @RequestMapping(value = "/deleteAPost",method = RequestMethod.GET, produces= "application/json;charset=UTF-8")
    @ResponseBody
    public void deleteAPost(HttpServletRequest request,HttpServletResponse response) throws IOException {
        String post_id = request.getParameter("post_id");
        int id = Integer.parseInt(post_id);
        postService.deleteAPost(id);
        HttpSession session=request.getSession();
        User user = (User)session.getAttribute("user");
        if(user.getUser_type()==0) {
            response.sendRedirect("/bbs/html/adminIndex.html");
        } else {
            response.sendRedirect("/bbs/html/index.html");
        }
    }
    //删掉该用户所有帖子
    @RequestMapping(value = "/deleteAllPostByUser_name",method = RequestMethod.GET, produces= "application/json;charset=UTF-8")
    @ResponseBody
    public void deleteAllPostByUserName(HttpServletRequest request) throws JsonProcessingException {
        String post_user_name = request.getParameter("post_user_name");
        postService.deleteAllPost(post_user_name);
    }

    //按更新时间显示所有帖子
    @RequestMapping(value = "/showAllPostsByTime",method = RequestMethod.POST, produces= "application/json;charset=UTF-8")
    @ResponseBody
    public String showAllPostByTime() throws JsonProcessingException {
        List<Post> posts = postService.showAllPostByTime();
        ObjectMapper mapper=new ObjectMapper();
        String postsJson=mapper.writeValueAsString(posts);
        return postsJson;
    }

    //按热度（回帖数目）显示所有帖子
    @RequestMapping(value = "/showAllPostsByHot",method = RequestMethod.POST, produces= "application/json;charset=UTF-8")
    @ResponseBody
    public String showAllPostByHot() throws JsonProcessingException {
        List<Post> posts = postService.showAllPostByHot();
        ObjectMapper mapper=new ObjectMapper();
        String postsJson=mapper.writeValueAsString(posts);
        return postsJson;
    }
}

