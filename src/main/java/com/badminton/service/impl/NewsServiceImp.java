package com.badminton.service.impl;

import com.badminton.dao.NewsDao;
import com.badminton.pojo.News;
import com.badminton.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT)
@Service("NewsService")
public class NewsServiceImp implements NewsService {

    @Autowired
    NewsDao newsDao;

    @Override
    public void insertNews(News news) {
        newsDao.insertNews(news);
    }

    @Override
    public void deleteNews(int id) {
        newsDao.deleteANews(id);
    }

    @Override
    public List<News> selectAllNews() {
        return newsDao.selectAllNews();
    }

    @Override
    public News selectNewsById(int id) {
        return newsDao.selectNewsById(id);
    }
}
