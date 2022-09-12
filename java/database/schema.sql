BEGIN TRANSACTION;

DROP TABLE IF EXISTS  meal_account, users, meal, category_type, time_of_day, meal_plan, pantry, meal_ingredients;
DROP SEQUENCE IF EXISTS seq_user_id, seq_meal_id, seq_meal_account_id,seq_meal_plan_id, seq_pantry_id, seq_ingredients_id;

CREATE TABLE category_type (
	category_id serial NOT NULL,
	category_type_desc varchar(20) NOT NULL,
	CONSTRAINT PK_category_type PRIMARY KEY (category_id)
);

CREATE TABLE time_of_day (
	time_of_day_id serial NOT NULL,
	time_of_day_desc varchar(20) NOT NULL,
	CONSTRAINT PK_time_of_day PRIMARY KEY (time_of_day_id)
);

CREATE SEQUENCE seq_user_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;

CREATE TABLE users (
	user_id int DEFAULT nextval('seq_user_id'::regclass) NOT NULL,
	username varchar(50) NOT NULL,
	password_hash varchar(200) NOT NULL,
	role varchar(50) NOT NULL,
	CONSTRAINT PK_user PRIMARY KEY (user_id)
);

INSERT INTO users (username,password_hash,role) VALUES ('user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('admin','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN');

CREATE SEQUENCE seq_meal_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;

CREATE TABLE meal(
    meal_id int NOT NULL DEFAULT nextval('seq_meal_id'::regclass),
    meal_name varchar(50) NOT NULL,
    category_id int NULL,
    time_of_day_id int NULL,
    description varchar(450) NULL,
    recipe varchar NOT NULL,
    ingredients varchar(500) NOT NULL,
    CONSTRAINT PK_meal PRIMARY KEY (meal_id),
    CONSTRAINT FK_meal_category_type FOREIGN KEY (category_id) REFERENCES category_type (category_id),
	CONSTRAINT FK_meal_time_of_day FOREIGN KEY (time_of_day_id) REFERENCES time_of_day (time_of_day_id)
);

CREATE SEQUENCE seq_meal_account_id
  INCREMENT BY 1
  NO MAXVALUE
  START WITH 301
  CACHE 1;

CREATE TABLE meal_account (
	account_meal_id int NULL DEFAULT nextval('seq_meal_account_id'::regclass),
	user_id int NOT NULL,
	meal_id int NOT NULL,

	CONSTRAINT PK_meal_account PRIMARY KEY (account_meal_id,meal_id, user_id),
	CONSTRAINT FK_meal_account_users FOREIGN KEY (user_id) REFERENCES users (user_id),
	CONSTRAINT FK_meal_account_meal FOREIGN KEY (meal_id) REFERENCES meal (meal_id)
);

CREATE SEQUENCE seq_meal_plan_id
  START WITH 501
  CACHE 1;

CREATE TABLE meal_plan (
	meal_plan_id int NULL DEFAULT nextval('seq_meal_plan_id'),
	meal_id int NULL ,
	day_of_week varchar(9) NOT NULL,
	CONSTRAINT PK_meal_plan PRIMARY KEY (meal_plan_id),
	CONSTRAINT FK_meal_plan_meal FOREIGN KEY (meal_id) REFERENCES meal (meal_id)
);


CREATE SEQUENCE seq_ingredients_id
  INCREMENT BY 1
  NO MAXVALUE
  START WITH 100
  CACHE 1;

CREATE TABLE meal_ingredients (
	ingredients_id int NULL DEFAULT nextval('seq_ingredients_id'::regclass),
	meal_id int NOT NULL,
	ingredients_name varchar(50) NOT NULL,
	qty int NOT NULL,
	CONSTRAINT PK_meal_ingredients PRIMARY KEY (ingredients_id, meal_id),
	CONSTRAINT FK_meal_ingredients_meal FOREIGN KEY (meal_id) REFERENCES meal (meal_id)
);

INSERT INTO category_type (category_type_desc) VALUES ('Vegetarian');
INSERT INTO category_type (category_type_desc) VALUES ('Meat Lovers');
INSERT INTO category_type (category_type_desc) VALUES ('Gluten-Free');
INSERT INTO category_type (category_type_desc) VALUES ('Mexican');
INSERT INTO category_type (category_type_desc) VALUES ('Chinese');
INSERT INTO category_type (category_type_desc) VALUES ('Indian');
INSERT INTO category_type (category_type_desc) VALUES ('Other');

CREATE SEQUENCE seq_pantry_id
  INCREMENT BY 1
  NO MAXVALUE
  START WITH 100
  CACHE 1;

CREATE TABLE pantry (
pantry_id int NULL DEFAULT nextval('seq_pantry_id'::regclass),
user_id int,
ingredients_name varchar(50) NOT NULL,
qty int,
CONSTRAINT PK_pantry PRIMARY KEY (pantry_id),
CONSTRAINT FK_pantry_users FOREIGN KEY (user_id) REFERENCES users (user_id)
);



INSERT INTO time_of_day (time_of_day_desc) VALUES ('Breakfast');
INSERT INTO time_of_day (time_of_day_desc) VALUES ('Lunch');
INSERT INTO time_of_day (time_of_day_desc) VALUES ('Snack');
INSERT INTO time_of_day (time_of_day_desc) VALUES ('Dinner');
INSERT INTO time_of_day (time_of_day_desc) VALUES ('Dessert');
INSERT INTO time_of_day (time_of_day_desc) VALUES ('Drinks');

COMMIT TRANSACTION;
