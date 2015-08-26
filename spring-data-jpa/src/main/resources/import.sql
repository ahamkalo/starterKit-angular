insert into book (id, title) values (1, 'Pierwsza ksiazka');
insert into book (id, title) values (2, 'Druga ksiazka');
insert into book (id, title) values (3, 'Trzecia ksiazka');
insert into book (id, title) values (4, 'Czwarta ksiazka');
insert into book (id, title) values (5, 'Piata ksiazka');

insert into author (id, first_name, last_name) values (1, 'Jan', 'Kowalski');
insert into author (id, first_name, last_name) values (2, 'Piotr', 'Zielinski');
insert into author (id, first_name, last_name) values (3, 'Marek', 'Kosowski');

insert into book_author(book_id, author_id) values (1, 3);
insert into book_author(book_id, author_id) values (2, 2);
insert into book_author(book_id, author_id) values (3, 1);
insert into book_author(book_id, author_id) values (3, 2);
insert into book_author(book_id, author_id) values (3, 3);
insert into book_author(book_id, author_id) values (4, 3);
insert into book_author(book_id, author_id) values (4, 2);
insert into book_author(book_id, author_id) values (5, 2);