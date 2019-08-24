package com.badminton.service;

import com.badminton.pojo.News;

import java.util.List;

public interface NewsService {

    void insertNews(News news);

    void deleteNews(int id);

    List<News> selectAllNews();

    News selectNewsById(int id);
}
