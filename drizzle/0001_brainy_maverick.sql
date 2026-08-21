CREATE TABLE `blogPosts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(240) NOT NULL,
	`slug` varchar(240) NOT NULL,
	`excerpt` text,
	`content` longtext,
	`featuredImage` varchar(1024),
	`category` varchar(120),
	`tags` text,
	`seoTitle` varchar(240),
	`seoDescription` varchar(500),
	`published` boolean NOT NULL DEFAULT false,
	`publishedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blogPosts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blogPosts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `contactMessages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(160) NOT NULL,
	`company` varchar(160),
	`email` varchar(320) NOT NULL,
	`phone` varchar(64),
	`subject` varchar(240) NOT NULL,
	`message` text NOT NULL,
	`status` enum('New','Read','Closed') NOT NULL DEFAULT 'New',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contactMessages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `faqs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`question` varchar(500) NOT NULL,
	`answer` text NOT NULL,
	`category` varchar(120),
	`sortOrder` int NOT NULL DEFAULT 0,
	`published` boolean NOT NULL DEFAULT false,
	CONSTRAINT `faqs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fullName` varchar(160) NOT NULL,
	`company` varchar(160),
	`email` varchar(320) NOT NULL,
	`phone` varchar(64) NOT NULL,
	`mcNumber` varchar(64),
	`dotNumber` varchar(64),
	`truckType` enum('Dry Van','Reefer','Flatbed','Step Deck','Hotshot','Box Truck','Power Only','Conestoga') NOT NULL,
	`truckCount` int,
	`preferredLanes` varchar(500),
	`location` varchar(180),
	`message` text,
	`consent` boolean NOT NULL DEFAULT false,
	`status` enum('New','Contacted','Qualified','Follow-up','Converted','Not Qualified','Closed') NOT NULL DEFAULT 'New',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `serviceContent` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` enum('Truck Dispatching','Rate Negotiation','Load Planning','Document Management','Billing Support','Compliance Support') NOT NULL,
	`slug` varchar(160) NOT NULL,
	`description` text NOT NULL,
	`content` longtext,
	`image` varchar(1024),
	`published` boolean NOT NULL DEFAULT false,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `serviceContent_id` PRIMARY KEY(`id`),
	CONSTRAINT `serviceContent_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(160) NOT NULL,
	`company` varchar(160),
	`truckType` enum('Dry Van','Reefer','Flatbed','Step Deck','Hotshot','Box Truck','Power Only','Conestoga'),
	`location` varchar(180),
	`rating` int,
	`content` text NOT NULL,
	`image` varchar(1024),
	`published` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `truckTypes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` enum('Dry Van','Reefer','Flatbed','Step Deck','Hotshot','Box Truck','Power Only','Conestoga') NOT NULL,
	`slug` varchar(160) NOT NULL,
	`description` text NOT NULL,
	`image` varchar(1024),
	`benefits` text,
	`published` boolean NOT NULL DEFAULT false,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `truckTypes_id` PRIMARY KEY(`id`),
	CONSTRAINT `truckTypes_slug_unique` UNIQUE(`slug`)
);
