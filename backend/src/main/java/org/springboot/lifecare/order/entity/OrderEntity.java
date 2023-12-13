package org.springboot.lifecare.order.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springboot.lifecare.user.entity.User;

@Entity
@Table(name = "ORDER_HISTORY")
@Getter @Setter @NoArgsConstructor
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user.id")
    private User user;

    @Column(nullable = false)
    private String order;

    @Column(nullable = false)
    private Integer basePrice;

    @Column(nullable = false)
    private Integer point;

    @Column(nullable = false)
    private Integer totalPrice;

    @Column(nullable = false)
    private Integer finalPrice;
}
