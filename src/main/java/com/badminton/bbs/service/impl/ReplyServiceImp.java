package com.badminton.bbs.service.impl;

import com.badminton.bbs.dao.ReplyDao;
import com.badminton.bbs.pojo.Reply;
import com.badminton.bbs.service.ReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT)
@Service("ReplyService")
public class ReplyServiceImp implements ReplyService {
    //Dao层是自动注入
    @Autowired
    private ReplyDao replyDao;

    @Override
    public List<Reply> selectAllReplyByPostID(int id){
        return replyDao.selectReplyByPostID(id);
    }

    //将一个回复插入回复表
    @Override
    public void insertReply(Reply reply){
        replyDao.insertReply(reply);
    }



    //有人点赞回复(根据reply_id判断是该回复得到点赞)
    @Override
    public void updateReply_good_count(int id){
        replyDao.updateReply_good_count(id);
    }

    //有人踩回复
    @Override
    public void updateReply_bad_count(int id){
        replyDao.updateReply_bad_count(id);
    }

    //删除某一回复
    @Override
    public void deleteAReply(int id){
        replyDao.deleteAReply(id);
    }

    //删除某一帖子下所有回复
    @Override
    public void deleteAllPostReply(int id){
        replyDao.deleteAllPostReply(id);
    }
}
