package com.badminton.service;

import com.badminton.pojo.Brand;

import java.util.List;

public interface BrandService {

    void insertBrand(Brand brand);

    void deleteBrand(int id);

    List<Brand> selectAllBrand();
}
