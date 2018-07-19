
import os, sys

import mysql.connector
import urllib
import urllib2
import hashlib

from flask import Flask, render_template, request, jsonify, json

app = Flask(__name__)

db = mysql.connector.connect(user='root', database='library', password='Hu192478')

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

@app.route('/post', methods=['POST'])
def addOne():
    try:

        bookname = request.json['bookname']
        authorname = request.json['authorname']
        year = request.json['year']
        imageURL = request.json['imageURL']
        read = request.json['read']
        favorite = request.json['favorite']
        toberead = request.json['toberead']
        combineforhash = bookname + year

        search_book = (" SELECT *  FROM book_list"
                       "   WHERE `bookname`=%s AND `year`=%s")
        data_word1 = (str(bookname.encode('utf-8')), str(year))
        cur.execute(search_book, data_word1)
        getbooks = cur.fetchall()

        if(len(getbooks) == 0):
            if imageURL == '':
                add_book = ("INSERT INTO book_list "
                            "(`bookname`, `authorname`, `year`, `imageURL`, `read` , `favorite` , `toberead`)"
                            " VALUES (%s,%s,%s, %s, %s, %s, %s)")
                data_word = (str(bookname.encode('utf-8')), str(authorname.encode('utf-8')), str(year), str(imageURL), str(read),str(favorite), str(toberead))
                cur.execute(add_book, data_word)
                db.commit()
                return jsonify({'status': 'Saved', 'check': True})
            else:
                returnurl = urllib2.urlopen(imageURL)
                if returnurl.code == 200:
                    new_image_url = "static/img/" + hashlib.sha256(combineforhash.encode('utf-8')).hexdigest() + ".jpg"
                    imagefile = open(new_image_url, 'wb')
                    imagefile.write(urllib.urlopen(imageURL).read())
                    imagefile.close
                    add_book = ("INSERT INTO book_list "
                                "(`bookname`, `authorname`, `year`, `imageURL`, `read` , `favorite` , `toberead`)"
                                " VALUES (%s,%s,%s, %s, %s, %s, %s)")
                    data_word = (str(bookname.encode('utf-8')), str(authorname.encode('utf-8')), str(year), str(new_image_url),str(read), str(favorite), str(toberead))
                    cur.execute(add_book, data_word)
                    db.commit()
                    return jsonify({'status': 'Saved', 'check': True})
                else:
                    return jsonify({'status': 'This url not exist', 'check': False})
        else:
            return jsonify({'status': 'This book already exists', 'check': False})
    except:
        return jsonify({'status': 'Cant Saved', 'check': False})

@app.route('/jsondatas', methods=['GET'])
def takeAll():
    try:

        cur.execute(
            "SELECT `bookname`, `authorname`, `year`, `imageURL`, `read` , `favorite` , `toberead` FROM book_list")

        books1 = [];

        for a in cur:
            books1.append(a)

        return jsonify({'status': 'Success','check':True},books1)

    except:

        return jsonify({'status': 'Database Connection Error','check':False})

@app.route('/postsearch', methods=['POST'])
def postsearch():
     try:

        book = json.loads(request.data)

        query = (" SELECT bookname,authorname,imageURL,`year` FROM book_list"
                "   WHERE bookname=%s")
        datas =(book['name'],)

        cur.execute(query,datas)

        books1 = [];

        for a in cur:

            books1.append(a)

        if(len(books1)>0):

            return jsonify({'status': 'This book already in your library.', 'check': True},books1)

        else:

            return jsonify({'status': 'This book not in library.', 'check': False},books1)

     except:

        return jsonify({'status': 'Database connection Error', 'check': False})

@app.route('/sendtoread', methods=['POST'])
def sendtoread():
    try:
        bookinfo = json.loads(request.data)

        if bookinfo['read'] == 'true':
            return jsonify({'status': 'Book already exist in read.', 'check': False })

        query = (" UPDATE book_list"
                 "  SET `read`='true',`toberead`='false'"
                 "WHERE `bookname`=%s AND `year`=%s")

        datas = (bookinfo['name'], bookinfo['year'])

        cur.execute(query, datas)

        db.commit()

        return jsonify({'status': 'Book send to read.', 'check': True})

    except:

        return jsonify({'status': 'Book cant send to read.', 'check': False})

@app.route('/sendtoberead', methods=['POST'])
def sendtoberead():
    try:
        bookinfo = json.loads(request.data)

        if bookinfo['toberead'] == 'true':
            return jsonify({'status': 'Book already exist in toberead.', 'check': False})

        query = (" UPDATE book_list"
                 "  SET `read`='false',`toberead`='true'"
                 "WHERE `bookname`=%s AND `year`=%s")

        datas = (bookinfo['name'], bookinfo['year'])

        cur.execute(query, datas)

        db.commit()

        return jsonify({'status': 'Book send to be read.', 'check': True})

    except:

        return jsonify({'status': 'Book cant send to be read.', 'check': False})


@app.route('/sendtofav', methods=['POST'])
def sendtofav():
    try:

        query = (" UPDATE book_list"
                 "  SET `favorite`='true'"
                 "WHERE `bookname`=%s AND `year`=%s")

        bookinfo = json.loads(request.data)

        datas = (bookinfo['name'], bookinfo['year'])


        if bookinfo['fav'] == 'false':

            cur.execute(query, datas)

            db.commit()

            return jsonify({'status': 'Book add to favorite.', 'check': True})

        return jsonify({'status': 'Book already into favorite.', 'check': False})

    except:

        return jsonify({'status': 'Book cant add to favorite.', 'check': False})


@app.route('/removefav', methods=['POST'])
def removefav():
    try:
        query = (" UPDATE book_list"
                 "  SET `favorite`='false'"
                 "WHERE `bookname`=%s AND `year`=%s")
        bookinfo = json.loads(request.data)
        datas = (bookinfo['name'], bookinfo['year'])

        cur.execute(query, datas)
        db.commit()

        return jsonify({'status': 'Book remove from favorite.', 'check': True})

    except:

        return jsonify({'status': 'Book cant remove from favorite.', 'check': False})


@app.route('/deletebook', methods=['POST'])
def deletebook():
    try:
        query1 = (" SELECT imageURL  FROM book_list"
                  "   WHERE `bookname`=%s AND `year`=%s")
        query = (" DELETE  FROM book_list"
                 "   WHERE `bookname`=%s AND `year`=%s")

        bookinfo = json.loads(request.data)
        datas = (bookinfo['name'], bookinfo['year'])
        cur.execute(query1, datas)

        booklist = [];

        for a in cur:
            booklist.append(a)

        if os.path.exists(booklist[0][0]):
            os.remove(booklist[0][0])

        cur.execute(query, datas)
        db.commit()

        return jsonify({'status': 'Book deleted.', 'check': True })
    except:
        return jsonify({'status': 'Book cant deleted', 'check': False})


if __name__ == '__main__':
    app.run(debug=True, port=8080)
