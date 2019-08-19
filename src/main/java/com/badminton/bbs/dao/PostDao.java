package com.badminton.bbs.dao;

import com.badminton.bbs.pojo.Post;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PostDao {
    //根据帖子的用户名取出该用户所有的帖子
    @Select("select * from post where post_user_name= #{name}")
    List<Post> selectAllPostByPost_user_name(String name);

    //根据帖子的id取出帖子信息
    @Select("select * from post where post_id= #{id}")
    Post selectPostByPostID(int id); //select a post by post_id

    //将一个帖子插入表中
    @Insert("insert into post (post_id, post_board_id, post_user_name, post_title, post_content, post_reply_count,post_status_top,post_status_jia,post_create_time,post_update_time,head_img) " +
            "values (null,#{post_board_id},#{post_user_name},#{post_title},#{post_content},#{post_reply_count},#{post_status_top},#{post_status_jia},#{post_create_time},#{post_update_time},#{head_img})")
    void insertPost(Post post);

    //有人回帖，表内回帖数加一并且要更新时间
    @Update("update post set post_reply_count=post_reply_count+1, post_update_time=#{time} where post_id=#{id}")
    void updatePost_reply_count(@Param("id") int id, @Param("time") Date time);

    //置顶 设置status为0为正常，为1是置顶
    @Update("update post set post_status_top=#{status} where post_id=#{id}")
    void updatePost_status_top(@Param("id") int id, @Param("status") int status);

    //加精  设置status为0为正常，为1是加精
    @Update("update post set post_status_jia=#{status} where post_id=#{id}")
    void updatePost_status_jia(@Param("id") int id, @Param("status") int status);

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
    //发帖人头像     YES
    @Update("update post set " +

            "post_board_id=#{board_id}," +
            "post_title=#{title}," +
            "post_content=#{content}," +
            "post_update_time=#{update_time} " +
            "where post_id=#{id}")
    void updatePost(@Param("id") int id, @Param("board_id") int board_id, @Param("title") String title,
                    @Param("content") String content, @Param("update_time") Date update_time);

    //删除某一条贴
    @Delete("delete from post where post_id=#{id}")
    void deleteAPost(int id);

    //删除某一作者所有帖子
    @Delete("delete from post where post_user_name=#{name}")
    void deleteAllPost(String name);

    @Select("select * from post order by post_update_time desc")
    List<Post> selectAllPostsByTime();

    @Select("select * from post order by post_reply_count desc")
    List<Post> selectAllPostsByHot();

    //删除某个回复
    @Update("update post set post_reply_count=post_reply_count-1 where post_id=#{id}")
    void updatePost_reply_countdel(@Param("id") int id);
}