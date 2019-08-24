package com.badminton.controller;

import com.badminton.pojo.Product;
import com.badminton.service.ProductService;
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
import java.util.List;

@Controller
@RequestMapping("product")
public class ProductController {
    @Autowired
    @Qualifier("ProductService")
    private ProductService productService;

    @RequestMapping(value = "/insertProduct", method = RequestMethod.POST,produces= "application/json;charset=UTF-8")
    @ResponseBody
    public void insertNews(HttpServletRequest request,
                           HttpServletResponse response) throws IOException {
//        String product_name = request.getParameter("product_name");
//        String product_introduce = request.getParameter("product_introduce");
//        String product_img = request.getParameter("imgLink");

        String product_title = "产品测试";
        String product_introduce = "产品介绍";
        String img = "图片";

        Product product = new Product();
        product.setProduct_name(product_title);
        product.setProduct_introduce(product_introduce);
        product.setProduct_img(img);
        productService.insertProduct(product);

        System.out.println("插入成功");

//        response.sendRedirect("/html/user/turn1.html");
    }

    @RequestMapping(value = "/deleteProduct",method = RequestMethod.POST, produces= "application/json;charset=UTF-8")
    @ResponseBody
    public void deleteProduct(HttpServletRequest request,HttpServletResponse response) throws IOException {
//        String product_id = request.getParameter("product_id");
//        int id = Integer.parseInt(product_id);
        int id = 1;
        productService.deleteProduct(id);
    }

    @RequestMapping(value = "/selectAllProduct",method = RequestMethod.POST, produces= "application/json;charset=UTF-8")
    @ResponseBody
    public String selectAllProduct(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        List<Product> products=productService.selectAllProduct();
        ObjectMapper mapper=new ObjectMapper();
        String productsJson=mapper.writeValueAsString(products);
        System.out.println(productsJson);
        return productsJson;
    }
}
