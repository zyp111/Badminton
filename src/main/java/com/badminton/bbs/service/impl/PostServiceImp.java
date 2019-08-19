package com.badminton.bbs.service.impl;

import com.badminton.bbs.dao.PostDao;
import com.badminton.bbs.pojo.Post;
import com.badminton.bbs.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT)
@Service("PostService")
public class PostServiceImp implements PostService {
    //Dao层是自动注入
    @Autowired
    PostDao postDao;

    //根据post_id显示一条帖子内容
    @Override
    public Post selectPostByPostID(int id){
        return postDao.selectPostByPostID(id);
    }

    //根据用户名显示该用户所有帖子
    @Override
    public List<Post>selectAllPostByPost_user_name(String post_user_name){
        return postDao.selectAllPostByPost_user_name(post_user_name);
    }

    //将一条帖子插入
    @Override
    public void insertPost(Post post){
        postDao.insertPost(post);
    }

    //有人回帖
    @Override
    public void updatePost_reply_count(int id, Date time){
        postDao.updatePost_reply_count(id,time);
    }


    //置顶和加精操作
    @Override
    public void updatePost_status_top(int id,int status){
        postDao.updatePost_status_top(id,status);
    }

    @Override
    public void updatePost_status_jia(int id,int status){postDao.updatePost_status_jia(id,status);}

    //更改帖子内容
    @Override
    public void updatePost(int id,int board_id,String title,String content,Date update_time){
        postDao.updatePost(id,board_id,title,content,update_time);
    }

    //删除某一条帖子
    @Override
    public void deleteAPost(int id){
        postDao.deleteAPost(id);
    }

    //删除某一用户所有的帖子
    @Override
    public void deleteAllPost(String name){
        postDao.deleteAllPost(name);
    }

    @Override
    public List<Post> showAllPostByTime() {
        return postDao.selectAllPostsByTime();
    }

    @Override
    public List<Post> showAllPostByHot() {
        return postDao.selectAllPostsByHot();
    }

    @Override
    public void updatePost_reply_countdel(int id) {
        postDao.updatePost_reply_countdel(id);
    }
}
