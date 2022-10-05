-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `CPF` VARCHAR(191) NOT NULL,
    `estadoCivil` VARCHAR(191) NOT NULL,
    `pai` VARCHAR(191) NULL,
    `mae` VARCHAR(191) NULL,
    `conjuge` VARCHAR(191) NULL,
    `rg` VARCHAR(191) NULL,
    `salario` DECIMAL(19, 2) NOT NULL,
    `especie` VARCHAR(191) NOT NULL,
    `tituloEleitor` VARCHAR(191) NULL,
    `sexo` CHAR(1) NOT NULL,
    `celular` VARCHAR(191) NULL,
    `cep` VARCHAR(191) NULL,
    `endereco` VARCHAR(191) NULL,
    `complemento` VARCHAR(191) NULL,
    `numero` VARCHAR(191) NULL,
    `bairro` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `cidade` VARCHAR(191) NULL,
    `dataNascimento` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Client_CPF_key`(`CPF`),
    UNIQUE INDEX `Client_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
