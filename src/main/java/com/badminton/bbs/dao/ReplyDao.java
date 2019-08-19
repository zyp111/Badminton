package com.badminton.bbs.dao;

import com.badminton.bbs.pojo.Reply;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReplyDao {
    //在回复表里根据一个帖子的ID取出底下所有相关的回复
    @Select("select * from reply where reply_post_id = #{id}")
    List<Reply> selectReplyByPostID(int id); //select a reply by reply_post_id

    //将一个回复插入回复表
    @Insert("insert into reply (reply_id, reply_post_id, reply_user_name, reply_content, reply_good_count, reply_bad_count,reply_create_time,head_img) " +
            "values (null,#{reply_post_id},#{reply_user_name},#{reply_content},#{reply_good_count},#{reply_bad_count},#{reply_create_time},#{head_img})")
    void insertReply(Reply reply);

    //有人点赞回复(根据reply_id判断是该回复得到点赞)
    @Update("update reply set reply_good_count=reply_good_count+1 where reply_id=#{id}")
    void updateReply_good_count(int id);

    //有人踩回复
    @Update("update reply set reply_bad_count=reply_bad_count+1 where reply_id=#{id}")
    void updateReply_bad_count(int id);

    //删除某一回复
    @Delete("delete from reply where reply_id=#{id}")
    void deleteAReply(int id);

    //删除某一帖子下所有回复
    @Delete("delete from reply where reply_post_id=#{id}")
    void deleteAllPostReply(int id);

}