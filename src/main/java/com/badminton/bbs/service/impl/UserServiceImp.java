package com.badminton.bbs.service.impl;

import com.badminton.bbs.dao.UserDao;
import com.badminton.bbs.pojo.User;
import com.badminton.bbs.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT)
@Service("UserService")
public class UserServiceImp implements UserService {
    @Autowired
    UserDao userDao;

    @Override
    public User selectUserByEmail(String userEmail) {
        return userDao.selectUserByEmail(userEmail);
    }

    @Override
    public User selectUserByName(String userName){return userDao.selectUserByName(userName);}

    @Override
    public void insertUser(User user) {
        userDao.insertUser(user);
    }
}
