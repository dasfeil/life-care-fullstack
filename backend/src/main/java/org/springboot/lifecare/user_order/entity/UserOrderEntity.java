package org.springboot.lifecare.user_order.entity;

import jakarta.persistence.*;
import org.springboot.lifecare.order.entity.OrderEntity;
import org.springboot.lifecare.user.entity.User;

@Entity
@Table(name = "USER_ORDER")
public class UserOrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user_id;

    @OneToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private OrderEntity order_id;
}
