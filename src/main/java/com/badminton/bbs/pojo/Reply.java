package com.badminton.bbs.pojo;


import java.util.Date;

public class Reply {

    private int reply_id;

    private int reply_post_id;

    private String reply_user_name;

    private  String reply_content;

    private int reply_good_count=0;

    private  int reply_bad_count=0;

    private Date reply_create_time=null;

    private String head_img;

    public String getHead_img() {
        return head_img;
    }

    public void setHead_img(String head_img) {
        this.head_img = head_img;
    }

    public int getReply_id() {
        return reply_id;
    }

    public void setReply_id(int reply_id) {
        this.reply_id = reply_id;
    }

    public int getReply_post_id() {
        return reply_post_id;
    }

    public void setReply_post_id(int reply_post_id) {
        this.reply_post_id = reply_post_id;
    }

    public String getReply_user_name() {
        return reply_user_name;
    }

    public void setReply_user_name(String reply_user_name) {
        this.reply_user_name = reply_user_name;
    }

    public String getReply_content() {
        return reply_content;
    }

    public void setReply_content(String reply_content) {
        this.reply_content = reply_content;
    }

    public int getReply_good_count() {
        return reply_good_count;
    }

    public void setReply_good_count(int reply_good_count) {
        this.reply_good_count = reply_good_count;
    }

    public int getReply_bad_count() {
        return reply_bad_count;
    }

    public void setReply_bad_count(int reply_bad_count) {
        this.reply_bad_count = reply_bad_count;
    }

    public Date getReply_create_time() {
        return reply_create_time;
    }

    public void setReply_create_time(Date reply_create_time) {
        this.reply_create_time = reply_create_time;
    }


}
