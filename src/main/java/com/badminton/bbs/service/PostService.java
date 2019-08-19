package com.badminton.bbs.service;

import com.badminton.bbs.pojo.Post;

import java.util.Date;
import java.util.List;

public interface PostService {
    /************ 帖子*************/
    //根据post_id显示一条帖子内容
    Post selectPostByPostID(int id);

    //根据用户名显示该用户所有帖子
    List<Post>selectAllPostByPost_user_name(String post_user_name);

    //将一条帖子插入
    void insertPost(Post post);

    //有人回帖  注意要同时修改时间和回帖数
    void updatePost_reply_count(int id, Date time);

    //置顶
    void updatePost_status_top(int id, int status);

    //加精
    void updatePost_status_jia(int id, int status);

    //更改帖子内容
    void updatePost(int id, int board_id, String title, String content, Date update_time);

    //删除某一条帖子
    void deleteAPost(int id);

    //删除某一用户所有的帖子
    void deleteAllPost(String name);

    //根据时间排序所有帖子
    List<Post> showAllPostByTime();

    List<Post> showAllPostByHot();

    void updatePost_reply_countdel(int id);
}

