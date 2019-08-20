package com.badminton.service;

import com.badminton.pojo.Product;

import java.util.List;

public interface ProductService {

    void insertProduct(Product product);

    void deleteProduct(int id);

    List<Product> selectAllProduct();
}
