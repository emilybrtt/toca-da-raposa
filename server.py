from flask import Flask, request, render_template_string


app = Flask(__name__) 

@app.route('/') 
def index(): 
    print(request.method) 
    print(request.headers)
    
    return render_template_string('index.html')

if __name__ == '__main__':
    app.run(debug=True) 