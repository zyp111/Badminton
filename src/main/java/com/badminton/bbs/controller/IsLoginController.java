package com.badminton.bbs.controller;

import com.badminton.bbs.pojo.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("login")
public class IsLoginController {

    @RequestMapping(value = "/isLogin",method = RequestMethod.POST, produces= "application/json;charset=UTF-8")
    @ResponseBody
    public String isLogin(HttpServletRequest request) throws JsonProcessingException {
        HttpSession session = request.getSession();
        User user = (User)session.getAttribute("user");
        if(user == null) {
            return "";
        } else {
            ObjectMapper mapper = new ObjectMapper();
            String userJson = mapper.writeValueAsString(user);
            return userJson;
        }
    }
}
