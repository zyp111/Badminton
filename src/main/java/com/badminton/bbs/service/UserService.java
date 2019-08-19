package com.badminton.bbs.service;

import com.badminton.bbs.pojo.User;

public interface UserService {
    User selectUserByEmail(String userEmail);

    User selectUserByName(String userName);

    void insertUser(User user);
}
