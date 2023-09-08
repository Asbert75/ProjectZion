CREATE TABLE [dbo].[User] (
	id INT IDENTITY(1,1) PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	username VARCHAR(30) NOT NULL UNIQUE,
	email VARCHAR(100) NOT NULL,
	password_hash VARCHAR(MAX),
	password_salt VARCHAR(MAX),
	created_at DATETIME NOT NULL
);

CREATE TABLE [dbo].[Role] (
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE [dbo].[Permission] (
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE [dbo].[Setting] (
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE [dbo].[UserSetting] (
	id INT IDENTITY(1,1) PRIMARY KEY,
	setting_id INT FOREIGN KEY REFERENCES dbo.Setting(id) NOT NULL,
	user_id INT FOREIGN KEY REFERENCES dbo.[User](id) NOT NULL,
	UNIQUE (user_id, setting_id)
);

CREATE TABLE [dbo].[UserRole] (
	id INT IDENTITY(1,1) PRIMARY KEY,
	user_id INT FOREIGN KEY REFERENCES dbo.[User](id) NOT NULL,
	role_id INT FOREIGN KEY REFERENCES dbo.[Role](id) NOT NULL,
	UNIQUE (user_id, role_id)
);

CREATE TABLE [dbo].[RolePermission] (
	id INT IDENTITY(1,1) PRIMARY KEY,
	permission_id INT FOREIGN KEY REFERENCES dbo.[Permission](id) NOT NULL,
	role_id INT FOREIGN KEY REFERENCES dbo.[Role](id) NOT NULL,
	UNIQUE (permission_id, role_id)
);