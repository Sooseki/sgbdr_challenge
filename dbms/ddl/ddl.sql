
/* student */
create table if not exists student (
  id_student int auto_increment not null,
  email_student varchar(256) unique not null, 
  name_student varchar(256), 
  first_name_student varchar(256), 
  primary key(id_student)
);


drop trigger if exists before_insert_student;

create trigger before_insert_student
before insert
on student for each row set new.email_student = lower(trim(new.email_student));


/* file */
create table if not exists student_file (
  fileId int auto_increment not null,
  id_student int not null,
  storageKey varchar(512) not null,
  filename varchar(256),
  mimeType varchar(256),
  primary key(fileId),
<<<<<<< HEAD
  foreign key(userId) references user(userId) on delete cascade
=======
  foreign key(id_student) references student(id_student) on delete cascade
>>>>>>> origin/test_crud_request_david
);

/* exemple */
create table if not exists film (
  filmId int auto_increment not null,
  title varchar(256) not null, 
  duration int default 0,
  rentalRate decimal(6,2) not null default 0 check (rentalRate >= 0),
  primary key(filmId)
);