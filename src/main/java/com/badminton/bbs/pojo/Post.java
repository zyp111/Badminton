package com.badminton.bbs.pojo;

import java.util.Date;

public class Post {
    private int post_id;

    private int post_board_id;

    private String post_user_name;

    private String post_title;

    private  String post_content;

    private int post_reply_count;

    private int post_status_top;

    private int post_status_jia;

    private Date post_create_time;

    private Date post_update_time;

    public String getHead_img() {
        return head_img;
    }

    public void setHead_img(String head_img) {
        this.head_img = head_img;
    }

    private String head_img;

    public int getPost_id() {
        return post_id;
    }

    public void setPost_id(int post_id) {
        this.post_id = post_id;
    }

    public int getPost_board_id() {
        return post_board_id;
    }

    public void setPost_board_id(int post_board_id) {
        this.post_board_id = post_board_id;
    }

    public String getPost_user_name() {
        return post_user_name;
    }

    public void setPost_user_name(String post_user_name) {
        this.post_user_name = post_user_name;
    }

    public String getPost_title() {
        return post_title;
    }

    public void setPost_title(String post_title) {
        this.post_title = post_title;
    }

    public String getPost_content() {
        return post_content;
    }

    public void setPost_content(String post_content) {
        this.post_content = post_content;
    }

    public int getPost_reply_count() {
        return post_reply_count;
    }

    public void setPost_reply_count(int post_reply_count) {
        this.post_reply_count = post_reply_count;
    }

    public int getPost_status_top() { return post_status_top; }

    public void setPost_status_top(int post_status_top) { this.post_status_top = post_status_top; }

    public int getPost_status_jia() { return post_status_jia; }

    public void setPost_status_jia(int post_status_jia) { this.post_status_jia = post_status_jia; }

    public Date getPost_create_time() {
        return post_create_time;
    }

    public void setPost_create_time(Date post_create_time) {
        this.post_create_time = post_create_time;
    }

    public Date getPost_update_time() {
        return post_update_time;
    }

    public void setPost_update_time(Date post_update_time) {
        this.post_update_time = post_update_time;
    }
}
