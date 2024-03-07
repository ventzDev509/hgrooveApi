create database if not exists ventes;
use ventes;
create table if not exists personnel(
noPersonnel int primary key,
nomPersonnel varchar(255),
prenomPersonnel varchar(255),
dateNaissance varchar(255),
dateEmbouchement varchar(255),
functions varchar(255),
salaire double,
sexe varchar(255),
telephone varchar(255)

);
alter table personnel add constraint check(dateNaissance<dateEmbouchement);
INSERT INTO personnel (noPersonnel, nomPersonnel, prenomPersonnel, dateNaissance, dateEmbouchement, fonction, salaire, sexe, telephone) VALUES
(1, 'Dupont', 'Jean', '1980-01-01', '2005-06-15', 'Vendeur', 2500.00, 'M', '509 9494 9494'),
(2, 'Martin', 'Marie', '1985-02-12', '2010-09-01', 'Manager', 3500.00, 'F', '509 9999 9994'),
(3, 'Durand', 'Pierre', '1992-05-25', '2021-01-01', 'Comptable', 4000.00, 'M', '509 9499 94949'),
(4, 'Lefebvre', 'Sophie', '1988-10-31', '2012-03-01', 'Vendeur', 2800.00, 'F', '509 44994 9494'),
(5, 'Roux', 'Thomas', '1995-07-15', '2022-02-01', 'Vendeur', 2600.00, 'M',     '509 9959 9559'),
(6, 'Girard', 'Lucie', '1990-12-28', '2015-06-01', 'Manager', 3800.00, 'F', '   509 95959 95595'),
(7, 'Moreau', 'Antoine', '1983-03-19', '2008-11-01', 'Comptable', 4200.00, 'M', '509 9559 9955'),
(8, 'Fournier', 'Isabelle', '1986-09-05', '2013-09-01', 'Vendeur', 2900.00, 'F', '509 9599 9959'),
(9, 'Leclerc', 'Alexandre', '1993-11-07', '2020-05-01', 'Vendeur', 2700.00, 'M', '509 5588 8588'),
(10, 'Dubois', 'Chloé', '1998-04-23', '2023-01-01', 'Manager', 4000.00, 'F', '509 9995 9995'),
(11, 'Lecomte', 'David', '1991-08-16', '2017-01-01', 'Comptable', 4500.00, 'M', '5095 9995 9955'),
(12, 'Clement', 'Marine', '1994-02-28', '2019-07-01', 'Vendeur', 2800.00, 'F', '509 5952  9599'),
(13, 'Roger', 'François', '1987-06-10', '2012-06-01', 'Vendeur', 2700.00, 'M', '509 9939 22292'),
(14, 'Mercier', 'Marine', '1996-03-27', '2022-09-01', 'Manager', 4200.00, 'F', '509 9958 8585'),
(15, 'Perrin', 'Nicolas', '1987-01-12', '2011-11-01', 'Comptable', 3800.00, 'M', '509 9588 8585');
-- Enregistrements (15)-- 


create table if not exists client(
noClient int primary key,
nomClient varchar(255),
prenomClient varchar(255),
departement varchar(255),
telephone varchar(255)
);
ALTER TABLE `client` CHANGE `telephone` `telephone` VARCHAR(255)   DEFAULT ' 3333-2222 ';
INSERT INTO client(noClient, prenomClient, nomClient, Telephone, Departement) VALUES
(1, 'Tremblay', 'Jean', '509 8568 8855', 'nord'),
(2, 'Gagnon', 'Marie', '509 9588 9594' , 'nord'),
(3, 'Cote', 'Luc', '509 9595 9599', '509'),
(4, 'Morin', 'Sophie', '509 959 9995', 'sud'),
(5, 'Bouchard', 'Michel', '509 9585 9098', 'sud'),
(6, 'Girard', 'Julie', '509 9585 8595', 'ouest'),
(7, 'Fortin', 'Andre', '509 9959 9595', 'nord'),
(8, 'Poirier', 'Annie', '509 9585 9495', 'nord'),
(9, 'Larose', 'Pierre', '509 8585 8494', 'nord'),
(10, 'Leblanc', 'Isabelle', '509 9584 9494', 'nord'),
(11, 'Desjardins', 'Marc', '509 9494 9494', 'sud'),
(12, 'Bergeron', 'Nathalie', '509 9594 9494', 'ouest'),
(13, 'Beaudoin', 'Mathieu', '509 9499 9494', 'nord'),
(14, 'Gauthier', 'Stephanie', '509 9494 9494', 'nord'),
(15, 'Roy', 'Martin', '509 9442 9393', 'ouest');
-- Enregistrements (15) -- 

create table  commande(
noCommande int primary key,
dateCommande datetime,
noClient int 
);
alter table commande add foreign key (noClient) references client (noClient);
INSERT INTO commande (noCommande,datCcommande, noClient) VALUES	
(1, '2022-01-01 10:00:00', 1),
(2, '2022-01-02 11:00:00', 2),
(3, '2022-01-03 12:00:00', 3),
(4, '2022-01-04 13:00:00', 4),
(5, '2022-01-05 14:00:00', 5),
(6, '2022-01-06 15:00:00', 6),
(7, '2022-01-07 16:00:00', 7),
(8, '2022-01-08 17:00:00', 8),
(9, '2022-01-09 18:00:00', 9),
(10, '2022-01-10 19:00:00', 10),
(11, '2022-01-11 20:00:00', 11),
(12, '2022-01-12 21:00:00', 12),
(13, '2022-01-13 22:00:00', 13),
(14, '2022-01-14 23:00:00', 14),
(15, '2022-01-15 00:00:00', 15);

-- Enregistrements (15) -- 


create table  article(
noArticle int primary key,
description varchar(255),
prixUnitaire varchar(255),
quanteStock int
);
alter table article add constraint check (quanteStock >=0) ;
insert into article (noArticle, description, prixUnitaire, quantiteStock) values
    (1, 'Chemise en coton', '25.99', 100),
    (2, 'Pantalon en jean', '34.99', 75),
    (3, 'Chaussures de sport', '49.99', 50),
    (4, 'Sac à dos', '19.99', 120),
    (5, 'Montre-bracelet', '79.99', 25),
    (6, 'Boucles d\'oreilles', '14.99', 200),
    (7, 'Collier en argent', '29.99', 150),
    (8, 'T-shirt imprimé', '12.99', 200),
    (9, 'Jupe plissée', '24.99', 80),
    (10, 'Sandales à talons', '39.99', 40),
    (11, 'Lunettes de soleil', '9.99', 100),
    (12, 'Casquette de baseball', '7.99', 150),
    (13, 'Manteau d\'hiver', '89.99', 30),
    (14, 'pantalon skinny', '29.99', 75),
    (15, 'Paire de gants', '12.99', 50);
-- Enregistrements (15) -- 

create table if not exists ligneCommande(
noCommandeLigne int primary key,
noArticle int,
noCommande int ,
quantites int
);
alter table ligneCommande add foreign key (noCommandeLigne) references commande (noCommande);
alter table ligneCommande add foreign key (noArticle) references article (noClient);
INSERT INTO ligneCommande (noCommande, noArticle, noCommande, noArticle, Quantite) VALUES
(1, 1, 1, 1),
(2, 2, 2, 2),
(3, 3, 3, 3),
(4, 4, 4, 4),
(5, 5, 5, 5),
(6, 6, 6, 6),
(7, 7, 7, 7),
(8, 8, 8, 8),
(9, 9, 9, 9),
(10, 10, 10, 10),
(11, 11, 11, 11),
(12, 12, 12, 12),
(13, 13, 13, 13),
(14, 14, 14, 14),
(15, 15, 15, 15);
-- Enregistrements (15) -- 

create table if not exists livraison(
no_livraison int primary key,
date_livraison datetime
);
INSERT INTO livraison (no_livraison, date_livraison) VALUES
(1, '2022-03-15 10:30:00'),
(2, '2022-03-16 14:45:00'),
(3, '2022-03-17 09:15:00'),
(4, '2022-03-18 16:00:00'),
(5, '2022-03-19 11:30:00'),
(6, '2022-03-20 08:00:00'),
(7, '2022-03-21 13:00:00'),
(8, '2022-03-22 15:45:00'),
(9, '2022-03-23 10:15:00'),
(10, '2022-03-24 17:30:00'),
(11, '2022-03-25 11:00:00'),
(12, '2022-03-26 09:30:00'),
(13, '2022-03-27 14:15:00'),
(14, '2022-03-28 15:00:00'),
(15, '2022-03-29 12:45:00');
-- Enregistrements (15) -- 


create table if not exists detailLivraison(
noDetail_livraison int primary key,
noLivraison int ,
noCommande int,
noArticle int,
noPersonnel int,
quantite_livree int
);
alter table detailLivraison add foreign key (noLivraison) references livraison (noLivraison);
alter table detailLivraison add foreign key (noCommande) references commande (noCommande);
alter table detailLivraison add foreign key (noArticle) references article (noArticle);
alter table detailLivraison add foreign key (noPersonnel) references personnel (noPersonnel);

insert into detailLivraison (noDetail_livraison, noLivraison, noCommande, noArticle, noPersonnel, quantite_livree) values
    (1, 1, 1, 1, 1, 10),
    (2, 2, 2, 2, 2, 5),
    (3, 3, 3, 3, 3, 7),
    (4, 4, 4, 4, 4, 12),
    (5, 5, 5, 5, 5, 3),
    (6, 6, 6, 6, 6, 8),
    (7, 7, 7, 7, 7, 6),
    (8, 8, 8, 8, 8, 4),
    (9, 9, 9, 9, 9, 9),
    (10, 10, 10, 10, 10, 2),
    (11, 11, 11, 11, 11, 11),
    (12, 12, 12, 12, 12, 6),
    (13, 13, 13, 13, 13, 3),
    (14, 14, 14, 14, 14, 9),
    (15, 15, 15, 15, 15, 15);

-- Enregistrements (15) -- 





