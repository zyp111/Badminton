package com.badminton.dao;

import com.badminton.pojo.News;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsDao {
    //添加新闻
    @Insert("insert into news1 (news1_id, news1_title, news1_content, news1_create_time, news1_img)" +
    "values (null, #{news1_title}, #{news1_content}, #{news1_create_time},#{news1_img})")
    void insertNews(News news);

    //删除某一条新闻
    @Delete("delete from news1 where news1_id=#{id}")
    void deleteANews(int id);

    @Select("select * from news1")
    List<News> selectAllNews();

    @Select("select * from news1 where news1_id = #{id}")
    News selectNewsById(int id);
}
