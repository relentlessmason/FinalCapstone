BEGIN TRANSACTION;

DROP TABLE IF EXISTS  meal_account, users, meal;
DROP SEQUENCE IF EXISTS seq_user_id, seq_meal_id, seq_meal_account_id;

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
    category_id int NOT NULL,
    time_of_day_id int NOT NULL,
    description varchar(450) NULL,
    recipe varchar NOT NULL,
    ingredients varchar(500) NOT NULL,
    CONSTRAINT PK_meal PRIMARY KEY (meal_id)
);


CREATE SEQUENCE seq_meal_account_id
  INCREMENT BY 1
  NO MAXVALUE
  START WITH 301
  CACHE 1;

CREATE TABLE meal_account (
	meal_id int NOT NULL DEFAULT nextval('seq_meal_account_id'),
	user_id int NOT NULL,
	CONSTRAINT PK_meal_account PRIMARY KEY (meal_id, user_id),
	CONSTRAINT FK_meal_account_users FOREIGN KEY (user_id) REFERENCES users (user_id),
	CONSTRAINT FK_meal_account_meal FOREIGN KEY (meal_id) REFERENCES meal (meal_id)
);

--INSERT INTO meal_account (user_id) VALUES (1);




--INSERT INTO meal (meal_name, category_id, time_of_day_id, description, recipe, ingredients) VALUES ('Tikki Masala', 1, 1, 'could be spicier', 'indian stuff', 'chicken');
--INSERT INTO meal ( meal_name, category_id, time_of_day_id, description, recipe, ingredients) VALUES ('Oatmeal', 1, 1, 'could be warmer', 'white people stuff', '1/2cup Oats, 1/4cup Milk');


COMMIT TRANSACTION;
