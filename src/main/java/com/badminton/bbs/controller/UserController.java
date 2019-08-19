package com.badminton.bbs.controller;

import com.badminton.bbs.pojo.User;
import com.badminton.bbs.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@RequestMapping("user")
public class UserController {
    @Autowired
    @Qualifier("UserService")
    private UserService userService;

    @RequestMapping(value = "/loginOut",method = RequestMethod.GET, produces= "application/json;charset=UTF-8")
    @ResponseBody
    public void loginOut(HttpServletRequest request,HttpServletResponse response) throws IOException {
        HttpSession session=request.getSession();
        session.removeAttribute("user");
        response.sendRedirect("/html/index.html");
    }
    @RequestMapping(value = "/loginUser",method = RequestMethod.POST, produces= "application/json;charset=UTF-8")
    @ResponseBody
    public void login(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String email = request.getParameter("U_email");
        String password = request.getParameter("U_password");
        User user = userService.selectUserByEmail(email);
        ObjectMapper mapper=new ObjectMapper();
        String res=mapper.writeValueAsString(user);
        System.out.print(res);
        if(user == null) {
            response.sendRedirect("/html/user/login.html?status=1");
        } else {
            if(password.equals(user.getPassword())) {
                HttpSession session = request.getSession();
                session.setAttribute("user",user);
                int userType=user.getUser_type();
                if(userType==0) {
                    response.sendRedirect("/html/adminIndex.html");
                } else {
                    response.sendRedirect("/html/index.html");
                }
            } else {
                response.sendRedirect("/html/user/login.html?status=2");
            }
        }
    }

    @RequestMapping(value = "/regUser",method = RequestMethod.POST, produces= "application/json;charset=UTF-8")
    @ResponseBody
    public void registerUser(HttpServletRequest request,HttpServletResponse response) throws IOException {
        String userName = request.getParameter("U_name");
        String userEmail = request.getParameter("U_email");
        String userPassword=request.getParameter("U_password");
        String userPhone = request.getParameter("U_phone");
        String userJob = request.getParameter("U_job");
        String userJobPlace = request.getParameter("U_jobplace");

        //判断用户名和密码是否有重复的
        User user_E= userService.selectUserByEmail(userEmail);
        User user_N=userService.selectUserByName(userName);

        if(user_E==null&&user_N==null){
            User user = new User();
            user.setUser_name(userName);
            user.setPassword(userPassword);
            user.setUser_email(userEmail);
            user.setUser_phone(userPhone);
            user.setUser_job(userJob);
            user.setUser_job_place(userJobPlace);
            Date currentTime = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String dateString = formatter.format(currentTime);
            ParsePosition pos = new ParsePosition(8);
            Date currentTime_2 = formatter.parse(dateString, pos);
            user.setCreate_time(currentTime);
            user.setUser_type(1);
            user.setUser_state(0);
            user.setCredit(0);
            user.setUser_level(0);
            user.setEx(0);
            int i=(int) (Math.random() * 12 + 1);
            user.setHead_img(i+".jpg");
            userService.insertUser(user);
            response.sendRedirect("/html/user/turn.html");
        }else if(user_E==null&&user_N!=null){
            //提示用户名已经存在，先返回注册页面，传一个参数过去作为标记
            response.sendRedirect("/html/user/register.html?Exist=1");
        }else if(user_E!=null&&user_N==null){
            //提示邮箱已经存在，先返回注册页面，传一个参数过去作为标记
            response.sendRedirect("/html/user/register.html?Exist=2");
        }else if(user_E!=null&&user_N!=null){
            //提示邮箱和用户名都已经存在，先返回注册页面，传一个参数过去作为标记
            response.sendRedirect("/html/user/register.html?Exist=3");
        }



    }
}
