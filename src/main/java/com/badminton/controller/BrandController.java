package com.badminton.controller;

import com.badminton.pojo.Brand;
import com.badminton.service.BrandService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("brand")
public class BrandController {
    @Autowired
    @Qualifier("BrandService")
    private BrandService brandService;

    @RequestMapping(value = "/insertBrand", method = RequestMethod.POST,produces= "application/json;charset=UTF-8")
    @ResponseBody
    public void insertNews(HttpServletRequest request,
                           HttpServletResponse response) throws IOException {
//        String brand_name = request.getParameter("brand_name");
//        String brand_introduce = request.getParameter("brand_introduce");
//        String brand_img = request.getParameter("imgLink");

        String brand_title = "品牌测试";
        String brand_introduce = "品牌介绍";
        String img = "图片";

        Brand brand = new Brand();
        brand.setBrand_name(brand_title);
        brand.setBrand_introduce(brand_introduce);
        brand.setBrand_img(img);

        brandService.insertBrand(brand);

        System.out.println("插入成功");

//        response.sendRedirect("/html/user/turn1.html");
    }

    @RequestMapping(value = "/deleteBrand",method = RequestMethod.POST, produces= "application/json;charset=UTF-8")
    @ResponseBody
    public void deleteBrand(HttpServletRequest request,HttpServletResponse response) throws IOException {
//        String brand_id = request.getParameter("brand_id");
//        int id = Integer.parseInt(brand_id);
        int id = 1;
        brandService.deleteBrand(id);
    }

    @RequestMapping(value = "/selectAllBrand",method = RequestMethod.POST, produces= "application/json;charset=UTF-8")
    @ResponseBody
    public String selectAllBrand(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        List<Brand> brands=brandService.selectAllBrand();
        ObjectMapper mapper=new ObjectMapper();
        String brandsJson=mapper.writeValueAsString(brands);
        System.out.println(brandsJson);
        return brandsJson;
    }
}
