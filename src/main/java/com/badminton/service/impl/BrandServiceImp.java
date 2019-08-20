package com.badminton.service.impl;

import com.badminton.dao.BrandDao;
import com.badminton.pojo.Brand;
import com.badminton.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT)
@Service("BrandService")
public class BrandServiceImp implements BrandService {
    @Autowired
    BrandDao brandDao;

    @Override
    public void insertBrand(Brand brand) {
        brandDao.insertBrand(brand);
    }

    @Override
    public void deleteBrand(int id) {
        brandDao.deleteBrand(id);
    }

    @Override
    public List<Brand> selectAllBrand() {
        return brandDao.selectAllBrand();
    }
}
