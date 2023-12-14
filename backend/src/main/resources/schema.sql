create table orders
(
    id          bigint       not null
        primary key,
    base_price  int          not null,
    final_price int          not null,
    name        varchar(255) not null,
    point       int          not null,
    total_price int          not null
);

create table orders_seq
(
    next_val bigint null
);

create table role
(
    id        int auto_increment
        primary key,
    role_name enum ('USER', 'ADMIN') null
);

create table user
(
    user_no   bigint auto_increment
        primary key,
    id        int          not null,
    password  varchar(255) not null,
    user_rank tinyint      not null,
    username  varchar(255) not null,
    constraint UK_8qtpnv06elxuryeuv1ac4ximm
        unique (id),
    check (`user_rank` between 0 and 3)
);

create index IDX4uyuyektk8m5hps23pf90jl2m
    on user (id, username);

create table user_order
(
    id       bigint not null
        primary key,
    order_id bigint null,
    user_id  int    null,
    constraint UK_t5ah1x4wm9314qclf90dy0lyu
        unique (order_id),
    constraint FKj86u1x7csa8yd68ql2y1ibrou
        foreign key (user_id) references user (id),
    constraint FKrlglekn12wx5o456laekbv32u
        foreign key (order_id) references orders (id)
);

create table user_order_seq
(
    next_val bigint null
);

create table user_roles
(
    user_user_no bigint not null,
    roles_id     int    not null,
    constraint FKj9553ass9uctjrmh0gkqsmv0d
        foreign key (roles_id) references role (id),
    constraint FKtds36jyyrx2r80sdn0v72uk18
        foreign key (user_user_no) references user (user_no)
);

