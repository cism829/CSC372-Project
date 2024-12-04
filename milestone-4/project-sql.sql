DROP TABLE IF EXISTS ORDERS;

DROP TABLE IF EXISTS CartProducts;
DROP TABLE IF EXISTS Carts;

DROP TABLE IF EXISTS Users;

DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Categories;


DROP TABLE IF EXISTS Appointments;


CREATE TABLE Users(
  userId INTEGER PRIMARY KEY AUTOINCREMENT, 
  name VARCHAR(106) NOT NULL,
  created_on INTEGER,
  email VARCHAR(50) UNIQUE,
  first_name VARCHAR(106),
  last_name VARCHAR(106),
  google_id INTEGER,
  accType VARCHAR(50),
  picture VARCHAR(106)
);

CREATE TABLE Categories(
  cateId INTEGER PRIMARY KEY AUTOINCREMENT,  
  cateName VARCHAR(106)
);

CREATE TABLE Products(
  productId INTEGER PRIMARY KEY AUTOINCREMENT,  
  pName VARCHAR(106) UNIQUE NOT NULL,
  description VARCHAR(106),
  imageURL TEXT NOT NULL,
  price VARCHAR(106) NOT NULL,
  upc INTEGER, 
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

CREATE TABLE Orders(
	ordersId INTEGER PRIMARY KEY AUTOINCREMENT,
	totalPrice INTEGER,
	quantity INTEGER,
	cartId INTEGER,
	productId INTEGER,
	FOREIGN KEY (cartId) REFERENCES Carts(cartId),
	FOREIGN KEY (productId) REFERENCES Products(productId)
);

INSERT INTO 
Categories(cateName)
VALUES  ('Grease'), ('Oil'), ('Combs'), ('Hair-Styles'), ('Misc');


INSERT INTO 
Products (pName, cateId, imageURL, description, price, upc)
VALUES  ('Blue Magic', '1', '/images/grease/blue-magix.avif', 'test shampoo', '5.99', '075610157109'),
        ('Sulfur 8', '1', '/images/grease/sul8.jpg', '', '7.99', '075610432107'),
        ('Mielle oil', '2', '/images/oils/mielle.avif', 'Mielle rosemary mint oil', '10.99', '854102006732'),
        ('Wild Growth Oil', '2', '/images/oils/wild.jpg', '', '8.55', '681702702418'),
        ('Two Strand Twist', '4', '/images/hair/2-strand.jfif', '', '60.00', ''),
        ('Caster Oil', '2', '', 'High-quality wireless Bluetooth headphones with noise cancellation and long battery life.', '9.99', ''),
        ('Shine n Jam', '1', 'https://m.media-amazon.com/images/I/51rPBjPS0aL._AC_UF1000,1000_QL80_.jpg', ' ', '9.99', '191566430988'),
		('Wide Toothed Comb', '3', '', 'Standard wide tooth comb', '2.99', '')
;



INSERT INTO 
Appointments(appName, appDur, timeDate, appPrice)
Values ('Two Strand Twist', '2.5', '08-08-2024 12:12', '60.00');
