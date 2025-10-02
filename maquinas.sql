-- Máquinas de lavar
CREATE TABLE IF NOT EXISTS maquinas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descricao TEXT NOT NULL,
    ocupada BOOLEAN DEFAULT FALSE
);

-- Secadoras
CREATE TABLE IF NOT EXISTS secadoras (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descricao TEXT NOT NULL,
    ocupada BOOLEAN DEFAULT FALSE
);

-- Relação N:N entre máquinas e secadoras
CREATE TABLE IF NOT EXISTS maquina_secadora (
    maquina_id INT,
    secadora_id INT,
    PRIMARY KEY (maquina_id, secadora_id),
    FOREIGN KEY (maquina_id) REFERENCES maquinas(id),
    FOREIGN KEY (secadora_id) REFERENCES secadoras(id)
);

-- Tabela de reservas (sem secadora_id)
CREATE TABLE IF NOT EXISTS reservas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(100) NOT NULL,
    maquina_id INT NOT NULL,
    data DATE NOT NULL,
    intervalo ENUM('06-10','10-14','14-18','18-22') NOT NULL,
    FOREIGN KEY (maquina_id) REFERENCES maquinas(id),
    UNIQUE (maquina_id, data, intervalo) -- impede conflitos
);

-- Inserindo máquinas
INSERT INTO maquinas (descricao) VALUES ('Máquina 1'), ('Máquina 2'), ('Máquina 3'), ('Máquina 4');

-- Inserindo secadoras
INSERT INTO secadoras (descricao) VALUES ('Secadora 1'), ('Secadora 2');

-- Ligando máquinas às secadoras (somente 1 e 2)
INSERT INTO maquina_secadora (maquina_id, secadora_id) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2);

-- Exemplo de reservas
INSERT INTO reservas (usuario, maquina_id, data, intervalo)
VALUES
('Maria', 1, '2025-09-28', '06-10'),
('João', 3, '2025-09-28', '10-14');

COMMIT;
