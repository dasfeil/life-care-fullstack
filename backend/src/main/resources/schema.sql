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
    email     varchar(255) not null,
    id        int          not null,
    join_date date         null,
    password  varchar(255) not null,
    phone_no  bigint       not null,
    user_rank tinyint      not null,
    username  varchar(255) not null,
    constraint UK_8qtpnv06elxuryeuv1ac4ximm
        unique (id),
    check (`user_rank` between 0 and 3)
);

create index IDX4uyuyektk8m5hps23pf90jl2m
    on user (id, username);

create table user_roles
(
    user_user_no bigint not null,
    roles_id     int    not null,
    constraint FKj9553ass9uctjrmh0gkqsmv0d
        foreign key (roles_id) references role (id),
    constraint FKtds36jyyrx2r80sdn0v72uk18
        foreign key (user_user_no) references user (user_no)
);

