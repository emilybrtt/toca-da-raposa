import mysql
import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
import sqlite3
from dotenv import load_dotenv
import os

load_dotenv()
# Configurações para conexão c/ banco de dados usando variáveis de ambiente
config = {
    'host': os.getenv('DB_HOST'),  
    'user': os.getenv('DB_USER'),  
    'password': os.getenv('DB_PASSWORD'), 
    'database': os.getenv('DB_NAME'),  
    'port': int(os.getenv('DB_PORT')), 
    'ssl_ca': os.getenv('SSL_CA_PATH')
}


def connect_db():
    try:
        conn = mysql.connector.connect(**config)
        print("Conexão bem-sucedida ao banco de dados MySQL")
        if conn.is_connected():
            return conn
    except Error as err:
        print(f"Erro: {err}")
        return None