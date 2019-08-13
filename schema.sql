create table todos(
    id serial primary key,
    priority integer not null,
    task varchar(100) not null,
    status boolean default false
);

