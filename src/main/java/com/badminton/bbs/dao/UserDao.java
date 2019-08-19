package com.badminton.bbs.dao;

import com.badminton.bbs.pojo.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao {
    @Select("select * from user where user_email=#{userEmail}")
    User selectUserByEmail(String userEmail);

    @Select("select * from user where user_name=#{userName}")
    User selectUserByName(String userName);

    @Insert("insert into user (user_id, user_name,password, user_email, user_sex, user_phone,user_job,user_job_place,create_time,user_type,user_state,credit,user_level,ex,head_img) " +
            "values (null,#{user_name},#{password},#{user_email},null,#{user_phone},#{user_job},#{user_job_place},#{create_time},#{user_type},#{user_state},#{credit},#{user_level},#{ex},#{head_img})")
    void insertUser(User user);
}
