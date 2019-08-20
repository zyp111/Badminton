package com.badminton.pojo;

import java.util.Date;

public class News {
    private int news1_id;
    private String news1_title;
    private String news1_content;
    private Date news1_create_time;
    private String news1_img;

    public int getNews1_id() {
        return news1_id;
    }

    public void setNews1_id(int news1_id) {
        this.news1_id = news1_id;
    }

    public String getNews1_title() {
        return news1_title;
    }

    public void setNews1_title(String news1_title) {
        this.news1_title = news1_title;
    }

    public String getNews1_content() {
        return news1_content;
    }

    public void setNews1_content(String news1_content) {
        this.news1_content = news1_content;
    }

    public Date getNews1_create_time() {
        return news1_create_time;
    }

    public void setNews1_create_time(Date news1_create_time) {
        this.news1_create_time = news1_create_time;
    }

    public String getNews1_img() {
        return news1_img;
    }

    public void setNews1_img(String news1_img) {
        this.news1_img = news1_img;
    }
}
