package com.badminton.dao;

import com.badminton.pojo.Brand;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrandDao {
    //添加新闻
    @Insert("insert into brand (brand_id, brand_name, brand_introduce, brand_img)" +
            "values (null, #{brand_name}, #{brand_introduce}, #{brand_img})")
    void insertBrand(Brand brand);

    //删除某一条新闻
    @Delete("delete from brand where brand_id=#{id}")
    void deleteBrand(int id);

    @Select("select * from brand")
    List<Brand> selectAllBrand();
}
