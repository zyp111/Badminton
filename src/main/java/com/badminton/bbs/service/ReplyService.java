package com.badminton.bbs.service;

import com.badminton.bbs.pojo.Reply;

import java.util.List;

public interface ReplyService {
    /************ 回复框*************/
    //根据post_id显示所有相关回复内容
    List<Reply>selectAllReplyByPostID(int id);

    //将一个回复插入回复表
    void insertReply(Reply reply);

    //有人点赞回复(根据reply_id判断是该回复得到点赞)
    void updateReply_good_count(int id);

    //有人踩回复
    void updateReply_bad_count(int id);

    //删除某一回复
    void deleteAReply(int id);

    //删除某一帖子下所有回复
    void deleteAllPostReply(int id);
}
