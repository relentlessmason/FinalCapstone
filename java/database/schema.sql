BEGIN TRANSACTION;

DROP TABLE IF EXISTS  meal_account, users, meal;
DROP SEQUENCE IF EXISTS seq_user_id, seq_meal_id, seq_meal_account_id;

--DROP TABLE IF EXISTS  users, meal;
--
--DROP SEQUENCE IF EXISTS seq_meal_id;


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
    CONSTRAINT PK_meal PRIMARY KEY (meal_id)
);


CREATE SEQUENCE seq_meal_account_id
  INCREMENT BY 1
  NO MAXVALUE
  START WITH 301
  CACHE 1;

CREATE TABLE meal_account (
	meal_id int NULL DEFAULT nextval('seq_meal_account_id'),
	user_id int NOT NULL,
	CONSTRAINT PK_meal_account PRIMARY KEY (meal_id, user_id),
	CONSTRAINT FK_meal_account_users FOREIGN KEY (user_id) REFERENCES users (user_id),
	CONSTRAINT FK_meal_account_meal FOREIGN KEY (meal_id) REFERENCES meal (meal_id)
);



--INSERT INTO meal_account (user_id) VALUES (1);

--ingredients table

CREATE SEQUENCE seq_meal_accounts_id
  INCREMENT BY 1
  NO MAXVALUE
  START WITH 301
  CACHE 1;

CREATE TABLE meal_ingredients (
	ingredients_id int NULL DEFAULT nextval('seq_meal_accounts_id'),
	meal_id int NOT NULL,
	ingredients_name varchar(50) NOT NULL,
	qty int NOT NULL,
	CONSTRAINT PK_meal_ingredients PRIMARY KEY (ingredients_id, meal_id),
	CONSTRAINT FK_meal_ingredients_meal FOREIGN KEY (meal_id) REFERENCES meal (meal_id)
);


--INSERT INTO meal ( meal_name, category_id, time_of_day_id, description, recipe, ingredients) VALUES ( 'Chicken Curry', 1, 1, 'Classic dish from India. Sometimes spicy', 'In a small mixing bowl whisk together all of the spices in the spice blend, set aside.
--Heat olive oil in a 12-inch non-stick skillet over medium-high heat.
--Add in onion and saute until slightly golden brown, about 4 - 6 minutes.
--Add in garlic and ginger, saute 30 seconds more then add in spice blend and saute 30 seconds.
--Pour in chicken broth and tomatoes and bring to a boil, then reduce heat to medium-low, cover and simmer 5 minutes.
--Pour mixture into a blender then cover with lid and remove lid insert, cover opening with a clean folded kitchen rag.
--Blend mixture until well pureed and smooth then return to skillet and heat skillet over medium-high heat.
--Season sauce with salt and cayenne pepper (start with about 1/2 tsp salt and a few dashes cayenne then add more to taste) then add in chicken.
--Bring to a simmer then reduce heat to medium-low, cover skillet with lid and simmer until chicken has cooked through, stirring occasionally, about 8 -  12 minutes.
--During the last minute of cooking stir in the cornstarch and water slurry if desired, to thicken sauce slightly (or if needed thin with a little chicken broth).
--Stir in cream then serve warm with cilantro over basmati rice. ', '1 1/2 tsp ground coriander
--
--1 tsp ground cumin
--1/2 tsp turmeric
--1/2 tsp fennel seeds, crushed in a small bag with a meat mallet
--1/2 tsp ground cinnamon
--1/2 tsp ground black pepper
--1/4 tsp ground mustard
--1/4 tsp ground cloves');

--INSERT INTO meal (meal_name, category_id, time_of_day_id, description, recipe, ingredients) VALUES ('Tikki Masala', 1, 1, 'could be spicier', 'indian stuff', 'chicken');
--INSERT INTO meal ( meal_name, category_id, time_of_day_id, description, recipe, ingredients) VALUES ('Oatmeal', 1, 1, 'could be warmer', 'white people stuff', '1/2cup Oats, 1/4cup Milk');


COMMIT TRANSACTION;
