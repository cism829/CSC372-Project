DROP TABLE IF EXISTS Users;

DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Categories;

DROP TABLE IF EXISTS Carts;
DROP TABLE IF EXISTS CartProducts;

CREATE TABLE Users(
  userId INTEGER PRIMARY KEY AUTOINCREMENT, 
  name VARCHAR(106),
  created_on INTEGER,
  email VARCHAR(50) UNIQUE,
  userPw VARCHAR(50),
  accType VARCHAR(50)
);

CREATE TABLE Categories(
  cateId INTEGER PRIMARY KEY AUTOINCREMENT,  
  cateName VARCHAR(106)
);

CREATE TABLE Products(
  productId INTEGER PRIMARY KEY AUTOINCREMENT,  
  pName VARCHAR(106) UNIQUE NOT NULL,
  description VARCHAR(106),
  imageURL BLOB NOT NULL,
  price VARCHAR(106) NOT NULL,
  cateId INTEGER NOT NULL,  
  FOREIGN KEY (cateId) REFERENCES Categories(cateId)
);

CREATE TABLE Carts(
  cartId INTEGER PRIMARY KEY AUTOINCREMENT,  
  status VARCHAR(106),
  createDate INTEGER,
  userId INTEGER,
  FOREIGN KEY (userId) REFERENCES Users(userId)
);
CREATE TABLE CartProducts(
  cartProductId INTEGER PRIMARY KEY AUTOINCREMENT,
  cartId INTEGER,
  productId INTEGER,  -- Define productId with its type before using it in the foreign key
  quantity INTEGER,
  FOREIGN KEY (cartId) REFERENCES Carts(cartId),
  FOREIGN KEY (productId) REFERENCES Products(productId)
);


INSERT INTO 
Categories(cateName)
VALUES ('hair oil');
INSERT INTO 
Categories(cateName)
VALUES ('grease');
INSERT INTO 
Categories(cateName)
VALUES ('styles');

INSERT INTO 
Products (pName, cateId, imageURL, description, price)
VALUES ('shampoo', '1', 'ahhhhhhhhh', 'test shampoo', '5.60');
INSERT INTO 
Products (pName, cateId, imageURL, description, price)
VALUES ('mielle oil', '1', 'ahhhhhhhhh', 'Mielle rosemary mint oil', '10.60');


INSERT INTO
Users (name, email, accType, created_on)
Values ('Collin','Clrodgers@uncg.edu', 'ADMIN', '2024-08-24');
INSERT INTO
Users (name, email, accType, created_on)
Values ('Collin','Collin042410@gmail.com', 'User', '2024-09-24');