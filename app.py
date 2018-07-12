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

    bookname=request.json['bookname']
    authorname=request.json['authorname']
    year=request.json['year']
    imageURL=request.json['imageURL']
    read=request.json['read']
    favorite=request.json['favorite']
    toberead=request.json['toberead']

    search_book=(" SELECT *  FROM book_list"
                 "   WHERE `bookname`=%s AND `year`=%s")
    data_word1=(str(bookname),str(year))

    cur.execute(search_book,data_word1)

    a=cur.fetchall()

    if (len(a) == 0):



        add_book = ("INSERT INTO book_list "
                    "(`bookname`, `authorname`, `year`, `imageURL`, `read` , `favorite` , `toberead`)"
                    " VALUES (%s,%s,%s, %s, %s, %s, %s)")

        data_word = (str(bookname),str(authorname),str(year),str(imageURL),str(read),str(favorite),str(toberead))

        cur.execute(add_book,data_word)

        db.commit()

    return jsonify({'names':name1})

@app.route('/jsondatas',methods=['GET'])
def takeAll():

    cur.execute("SELECT `bookname`, `authorname`, `year`, `imageURL`, `read` , `favorite` , `toberead` FROM book_list")

    books1=[];

    for a in cur:
        books1.append(a)

    return jsonify(books1)


@app.route('/sendtoread', methods=['POST'])
def sendtoread():

    query = (" UPDATE book_list"
             "  SET `read`='true',`toberead`='false'"
                "WHERE `bookname`=%s AND `year`=%s")
    b=json.loads(request.data)
    datas=(b['name'],b['year'])

    cur.execute(query,datas)
    db.commit()

    return request.data[2]

@app.route('/sendtofav', methods=['POST'])
def sendtofav():

    query = (" UPDATE book_list"
             "  SET `favorite`='true'"
             "WHERE `bookname`=%s AND `year`=%s")
    b=json.loads(request.data)
    datas=(b['name'],b['year'])

    cur.execute(query,datas)
    db.commit()

    return request.data[2]

@app.route('/removefav', methods=['POST'])
def removefav():

    query = (" UPDATE book_list"
             "  SET `favorite`='false'"
             "WHERE `bookname`=%s AND `year`=%s")
    b=json.loads(request.data)
    datas=(b['name'],b['year'])

    cur.execute(query,datas)
    db.commit()

    return request.data[2]

@app.route('/deletebook', methods=['POST'])
def deletebook():

    query = (" DELETE  FROM book_list"
             "   WHERE `bookname`=%s AND `year`=%s")
    b=json.loads(request.data)
    datas=(b['name'],b['year'])

    cur.execute(query,datas)
    db.commit()

    return request.data[2]





if __name__ == '__main__':
    app.run(debug=True,port=8080)

