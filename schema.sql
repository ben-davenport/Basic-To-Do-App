create table users(
    id serial primary key,
    displayname varchar not null,
    username varchar(50) not null
);

create table todos(
    id serial primary key,
    priority integer not null,
    task varchar(100) not null,
    status boolean default false,
    user_id integer references users(id)
);
