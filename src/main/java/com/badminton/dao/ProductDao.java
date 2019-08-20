package com.badminton.dao;

import com.badminton.pojo.Product;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDao {
    //添加新闻
    @Insert("insert into product (product_id, product_name, product_introduce, product_img)" +
            "values (null, #{product_name}, #{product_introduce}, #{product_img})")
    void insertProduct(Product product);

    //删除某一条新闻
    @Delete("delete from product where product_id=#{id}")
    void deleteProduct(int id);

    @Select("select * from product")
    List<Product> selectAllProduct();
}
