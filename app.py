from flask import Flask,render_template,request,jsonify,json
app = Flask(__name__)



@app.route('/')
def index():
    return render_template('index.html')

@app.route('/favorite')
def favorite():
    return render_template('favorite.html')

@app.route('/home')
def homepage():
    return render_template('homepage.html')

@app.route('/toberead')
def toberead():
    return render_template('toberead.html')


@app.route('/addbook')
def adbook():
    return render_template('index.html')

@app.route('/lang',methods=['POST'])
def addOne():
    name1 = {'bookname' : request.json['bookname'],'authorname' : request.json['authorname'],'year' : request.json['year'],'favorite' : request.json['favorite'],'read' : request.json['read'],'toberead' : request.json['toberead']}

    with open('database.json') as inputfile:
        books = json.load(inputfile)
        books.append(name1)
    with open('database.json','w') as outputfile:
        json.dump(books,outputfile)
    return jsonify({'names':name1})

@app.route('/jsondatas',methods=['GET'])
def takeAll():

    with open('database.json') as inputfile:
        books1 = json.load(inputfile)

    return jsonify(books1)




if __name__ == '__main__':
    app.run(debug=True,port=8080)

