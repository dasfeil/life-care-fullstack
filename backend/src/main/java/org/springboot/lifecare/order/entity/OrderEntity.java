package org.springboot.lifecare.order.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springboot.lifecare.user_order.entity.UserOrderEntity;

@Entity
@Table(name = "ORDERS", uniqueConstraints = {@UniqueConstraint(columnNames = "id")})
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer basePrice;

    @Column(nullable = false)
    private Integer point;

    @Column(nullable = false)
    private Integer totalPrice;

    @Column(nullable = false)
    private Integer finalPrice;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "order_id")
    private UserOrderEntity userOrderEntity;
}
