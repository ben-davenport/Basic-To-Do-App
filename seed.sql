insert into users
    (displayname, username)
VALUES
    ('alice', 'l33th4x0r'),
    ('bob', 'puppy_lover')
;

insert into todos 
    (priority, task, user_id)
values
    (1, 'feed the cat', 1),
    (2, 'pet the cat', 1),
    (3, 'worship the cat', 1),
    (10, 'go the work', 1),
    (1, 'feed the dog', 2),
    (2, 'pet the dog', 2),
    (3, 'worship the dog', 2)
;

select * from todos;