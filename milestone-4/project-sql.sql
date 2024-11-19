DROP TABLE IF EXISTS Users;

DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Categories;

DROP TABLE IF EXISTS Carts;
DROP TABLE IF EXISTS Appointments;
DROP TABLE IF EXISTS CartProducts;

CREATE TABLE Users(
  userId INTEGER PRIMARY KEY AUTOINCREMENT, 
  name VARCHAR(106) NOT NULL,
  created_on INTEGER,
  email VARCHAR(50) UNIQUE,
  userPw VARCHAR(50)NOT NULL,
  accType VARCHAR(50) NOT NULL
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

CREATE TABLE Appointments (
appId INTEGER PRIMARY KEY AUTOINCREMENT,
appPrice INTEGER NOT NULL,
appName VARCHAR(106) NOT NULL,
appDur INTEGER NOT NULL,
timeDate INTEGER NOT NULL,
userId INTEGER,
FOREIGN KEY (userId) REFERENCES Users(userId)

);

CREATE TABLE CartProducts(
  cartProductId INTEGER PRIMARY KEY AUTOINCREMENT,
  cartId INTEGER,
  productId INTEGER NOT NULL,  
  quantity INTEGER,
  FOREIGN KEY (cartId) REFERENCES Carts(cartId),
  FOREIGN KEY (productId) REFERENCES Products(productId)
);


INSERT INTO 
Categories(cateName)
VALUES  ('grease'), ('oil'), ('combs'), ('hair-styles'), ('misc');


INSERT INTO 
Products (pName, cateId, imageURL, description, price)
VALUES  ('Blue Magic', '1', '/images/grease/blue-magix.avif', 'test shampoo', '5.99'),
        ('Sulfur 8', '1', '/images/grease/sul8.jpg', '', '7.99'),
        ('Mielle oil', '2', 'ahhhhhhhhh', 'Mielle rosemary mint oil', '10.99'),
        ('Wild Growth Oil', '2', '/images/oils/wild.jpg', '', '8.55'),
        ('Two Strad Twist', '4', '/images/hair/2-strand.jfif', '', '60.00'),
        ('Caster Oil', '2', '', 'High-quality wireless Bluetooth headphones with noise cancellation and long battery life.', '9.99'),
        ('Shine n Jam', '1', 'https://m.media-amazon.com/images/I/51rPBjPS0aL._AC_UF1000,1000_QL80_.jpg', ' ', '9.99'),
		('Wide Toothed Comb', '3', '', 'Standard wide tooth comb', '2.99')
;

INSERT INTO
Users (name, email, accType, created_on, userPw)
Values  ('Collin','Clrodgers@uncg.edu', 'ADMIN', '2024-08-24', '0424'),
        ('Collin','Collin042410@gmail.com', 'User', '2024-09-24', '0829')
;

INSERT INTO 
Appointments(appName, appDur, timeDate, appPrice)
Values ('Two Strand Twist', '2.5', '08-08-2024 12:12', '60.00');