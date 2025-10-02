from flask import Flask, request, render_template
from utils import connect_db

app = Flask(__name__) 

@app.route('/') 
def index(): 
    print(request.method) 
    print(request.headers)
    connect_db()
    return render_template('index.html')

@app.route('/login') 
def login():
    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True) 