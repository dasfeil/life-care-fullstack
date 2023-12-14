package org.springboot.lifecare.order.dao;

import org.springboot.lifecare.order.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDAO extends JpaRepository<OrderEntity, Integer> {
}
