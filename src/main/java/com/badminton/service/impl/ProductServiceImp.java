package com.badminton.service.impl;

import com.badminton.dao.ProductDao;
import com.badminton.pojo.Product;
import com.badminton.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT)
@Service("ProductService")
public class ProductServiceImp implements ProductService {
    @Autowired
    ProductDao productDao;

    @Override
    public void insertProduct(Product product) {
        productDao.insertProduct(product);
    }

    @Override
    public void deleteProduct(int id) {
        productDao.deleteProduct(id);
    }

    @Override
    public List<Product> selectAllProduct() {
        return productDao.selectAllProduct();
    }
}
