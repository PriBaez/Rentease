create database sdgav_2
go

use sdgav_2
go

create table properties(
id 					int identity(1,1) primary key not null,
created_at 			datetime not null,
seller_id 			int not null,
titulo 				varchar(50) not null,
price 				float not null,
area_total 			float not null
status				bit not null
type_of_exchange	int not null
);
go

create table properties_images(
id 				int identity(1,1) primary key not null,
property_id 	int not null,
image 			varbinary(max) not null,
upload_at 		datetime default GETDATE() not null
);
go

create table properties_attributes(
property_id		int not null,
id_attribute	int not null,
quantity		float not null
);
go

create table attributes(
id			int identity(1,1) primary key not null,
description	int not null,
status		bit not null
);
go

create table users(
id 			int identity(1,1) primary key not null,
name 		varchar(80) not null,
pwd 		varchar(max) not null,
email 		varchar(50) not null,
phone 		varchar(11) not null,
created_at 	datetime default GETDATE() not null,
role 		int not null
);
go

create table users_rating(
id 				int identity(1,1) primary key not null,
rating_from 	int not null,
rating_to 		int not null,
score 			int CHECK(score <= 5) not null,
comment 		varchar(max) not null
);
go

create table roles(
id 		int identity(1,1) primary key not null,
name 	varchar(50) not null
);
go

create table roles_operations(
id			int identity(1,1) primary key not null,
role_id 		int not null,
operation_id 	int not null
);
go

create table operations(
id 		int identity(1,1) primary key not null,
name 	varchar(50) not null
);
go

create table users_saves(
id 				int identity(1,1) primary key not null,
user_id 		int not null,
property_id 	int not null,
create_at 		datetime default GETDATE() not null
);
go

create table users_favorites(
id 				int identity(1,1) primary key not null,
user_id 		int not null,
property_id 	int not null,
create_at 		datetime default GETDATE() not null
);
go

create table comments(
id 				int identity(1,1) primary key not null,
property_id		int not null,
user_id 		int not null,
related_comment int not null,
created_at 		datetime not null,
comment 		varchar(max) not null,
score 			int not null
);
go

create table offers(
id 				int identity(1,1) primary key not null, property_idint not null,
user_id 		int not null,
quantity		float not null,
status 			bit not null,
is_accepted     bit not null,
);
go

create table type_of_exchanges(
id 				int identity(1,1) primary key not null,
name            varchar(30) not null,
);
go

create table offers_accepted(
	id int identity(1,1) primary key not null, 
	seller_id int not null, 
	renter_id int not null, 
	quantity int not null,  
	accepted_at datetime not null
);
go

alter table offers_accepted add constraint FK_offers_seller_id foreign key(seller_id) references users(id)
go
alter table offers_accepted add constraint FK_offers_renter_id foreign key(seller_id) references users(id)
go
alter table properties add constraint FK_property_type_of_exchange foreign key(type_of_exchange) references type_of_exchanges(id)
go
alter table offers add constraint FK_property_offers foreign key(property_id) references properties(id)
go
alter table offers add constraint FK_user_offers foreign key(user_id) references users(id)
go
alter table properties_attributes add constraint FK_attributes_propertiesAttributes foreign key(id_attribute) references attributes(id)
go
alter table properties_attributes add constraint FK_propertiesAtrributes_Properties foreign key(property_id) references properties(id)
go
alter table properties_images add constraint FK_propertiesImage_Properties foreign key(property_id) references properties(id)
go
alter table comments add constraint FK_comments_properties foreign key(property_id) references properties(id)
go
alter table comments add constraint FK_comments_users foreign key(user_id) references users(id)
go
alter table users_saves add constraint FK_users_saves_properties foreign key(property_id) references properties(id)
go
alter table users_saves add constraint FK_users_saves_users foreign key(user_id) references users(id)
go
alter table users_favorites add constraint FK_users_favorites_properties foreign key(property_id) references properties(id)
go
alter table users_favorites add constraint FK_users_favorites_users foreign key(user_id) references users(id)
go
alter table users_rating add constraint FK_rating_from_users foreign key(rating_from) references users(id)
go
alter table users_rating add constraint FK_rating_to_users foreign key(rating_to) references users(id)
go
alter table users add constraint FK_users_roles foreign key(role) references roles(id)
go
alter table roles_operations add constraint FK_roles_operations_roles foreign key(role_id) references roles(id)
go
alter table roles_operations add constraint FK_roles_operations_operations foreign key(operation_id) references operations(id)
go
alter table properties add constraint FK_seller_id foreign key(seller_id) references users(id)
go
