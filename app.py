import mysql.connector

from flask import Flask,render_template,request,jsonify,json
app = Flask(__name__)

db = mysql.connector.connect(user = 'root', database='library',password = 'Hu192478')

cur = db.cursor()

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

@app.route('/read')
def read():
    return render_template('read.html')


@app.route('/addbook')
def adbook():
    return render_template('index.html')

@app.route('/post',methods=['POST'])
def addOne():
    name1 = {'imageURL':request.json['imageURL'],'bookname' : request.json['bookname'],'authorname' : request.json['authorname'],'year' : request.json['year'],'favorite' : request.json['favorite'],'read' : request.json['read'],'toberead' : request.json['toberead']}
    print("hello")
    print(request.json['read'])
    bookname=request.json['bookname']
    authorname=request.json['authorname']
    year=request.json['year']
    imageURL=request.json['imageURL']
    read=request.json['read']
    favorite=request.json['favorite']
    toberead=request.json['toberead']

    add_book = ("INSERT INTO book_list "
                "(`bookname`, `authorname`, `year`, `imageURL`, `read` , `favorite` , `toberead`)"
                " VALUES (%s,%s,%s, %s, %s, %s, %s)")

    data_word = (str(bookname),str(authorname),str(year),str(imageURL),str(read),str(favorite),str(toberead))

    print(data_word)
    cur.execute(add_book,data_word)

    db.commit()

    return jsonify({'names':name1})

@app.route('/jsondatas',methods=['GET'])
def takeAll():

    with open('database.json') as inputfile:
        books1 = json.load(inputfile)

    return jsonify(books1)

@app.route('/postall',methods=['POST'])
def addAll():

    print(request.data)
    with open('database.json','w') as outputfile:
        json.dump(json.loads(request.data),outputfile)
    return request.data





if __name__ == '__main__':
    app.run(debug=True,port=8080)

