CREATE TABLE USUARIOS(
  id_usuario SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  senha VARCHAR(255) NOT NULL
);

CREATE TABLE DEPARTAMENTOS(
  id_departamento SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao VARCHAR(300)
);

CREATE TABLE ORDEM_SERVICOS(
  id_ordem SERIAL PRIMARY KEY,
  numero_ordem INT UNIQUE,
  titulo VARCHAR(100) NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  prioridade VARCHAR(100) NOT NULL,
  status VARCHAR(100) NOT NULL,
  data DATE NOT NULL,
  id_usuario INT NOT NULL REFERENCES USUARIOS (id_usuario),
  id_departamento INT NOT NULL REFERENCES DEPARTAMENTOS (id_departamento)
  
);

INSERT INTO USUARIOS(nome, email, senha) VALUES ('Ana Silva', 'ana.silva@email.com', 'senha123'),
('Rafaela', 'rafaelasouzasilva3009@gmail.com', 'RafaelaSouza');

INSERT INTO DEPARTAMENTOS(nome, descricao) VALUES ('TI', 'sala do senai perto da porta de saida'),
('Manutenção', 'perto do shopping');

INSERT INTO ORDEM_SERVICOS(numero_ordem, titulo, descricao, prioridade, status, data, id_usuario, id_departamento) VALUES (1001, 'Trocar cabo de rede da sala 03 esta sem conexão', 'ponto de rede sala 03', 'media', 'aberta', '2026-02-26', 1, 1),
(1002, 'Consertar ar-condicionado', 'Unidade do laboratorio parou de gelar', 'alta', 'em_andamento', '2026-02-26', 2, 2);



CREATE TABLE teste (
id_usuario SERIAL PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
email VARCHAR(150) NOT NULL,
senha VARCHAR(255) NOT NULL
);

SELECT * FROM usuarios
