#!/usr/local/bin/python
import os, sys

import mysql.connector
import urllib
import urllib2
import hashlib


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
    try:

        bookname=request.json['bookname']
        authorname=request.json['authorname']
        year=request.json['year']
        imageURL=request.json['imageURL']
        read=request.json['read']
        favorite=request.json['favorite']
        toberead=request.json['toberead']
        a = bookname+year
        try:
            if imageURL == '':
                search_book=(" SELECT *  FROM book_list"
                             "   WHERE `bookname`=%s AND `year`=%s")
                data_word1=(str(bookname.encode('utf-8')),str(year))

                cur.execute(search_book,data_word1)

                a=cur.fetchall()

                if (len(a) == 0):



                    add_book = ("INSERT INTO book_list "
                                "(`bookname`, `authorname`, `year`, `imageURL`, `read` , `favorite` , `toberead`)"
                                " VALUES (%s,%s,%s, %s, %s, %s, %s)")

                    data_word = (str(bookname.encode('utf-8')),str(authorname.encode('utf-8')),str(year),str(imageURL),str(read),str(favorite),str(toberead))

                    cur.execute(add_book,data_word)

                    db.commit()
                    return jsonify({'status':'Saved','check':'true'})

                return jsonify({'status':'This book already exists','check':'none'})
            else:
                ret=urllib2.urlopen(imageURL)
                if ret.code == 200:

                    new_url = "static/img/"+hashlib.sha256(a.encode('utf-8')).hexdigest()+".jpg"
                    f = open(new_url,'wb')
                    f.write(urllib.urlopen(imageURL).read())
                    f.close

                    search_book=(" SELECT *  FROM book_list"
                                 "   WHERE `bookname`=%s AND `year`=%s")
                    data_word1=(str(bookname.encode('utf-8')),str(year))

                    cur.execute(search_book,data_word1)

                    a=cur.fetchall()

                    if (len(a) == 0):



                        add_book = ("INSERT INTO book_list "
                                    "(`bookname`, `authorname`, `year`, `imageURL`, `read` , `favorite` , `toberead`)"
                                    " VALUES (%s,%s,%s, %s, %s, %s, %s)")

                        data_word = (str(bookname.encode('utf-8')),str(authorname.encode('utf-8')),str(year),str(new_url),str(read),str(favorite),str(toberead))

                        cur.execute(add_book,data_word)

                        db.commit()
                        return jsonify({'status':'Saved','check':'true'})

                    return jsonify({'status':'This book already exists','check':'none'})

                return jsonify({'status':'This book already exists','check':'exist'})
        except:
            print "agir fail"
            return jsonify({'status':'This book already exists','check':'exist'})

    except:
        return jsonify({'status':'Cant Saved','check':'false'})

@app.route('/jsondatas',methods=['GET'])
def takeAll():

    try:
        cur.execute("SELECT `bookname`, `authorname`, `year`, `imageURL`, `read` , `favorite` , `toberead` FROM book_list")

        books1=[];

        for a in cur:
            books1.append(a)

        return jsonify(books1)
    except:
        return jsonify({'status':'Database Connection Error'})

# @app.route('/sendtochange', methods=['POST'])
# def sendtochange():
#     try:
#         query = (" UPDATE book_list"
#                  "  SET `read`=%s,`toberead`=%s,`favorite`=%s"
#                  "WHERE `bookname`=%s AND `year`=%s")
#         b=json.loads(request.data)
#
#         datas=(str(b['read']),str(b['toberead']),str(b['favorite']),str(b['name']),str(b['year']))
#
#         cur.execute(query,datas)
#         db.commit()
#
#         return jsonify({'status':'Book changes saved.','check':'true'})
#     except:
#         return jsonify({'status':'Book changes cant saved.','check':'false'})


@app.route('/sendtoread', methods=['POST'])
def sendtoread():
    try:
        b=json.loads(request.data)
        if b['read'] == 'true':
            return jsonify({'status':'Book already exist in read.','check':'none'})
        query = (" UPDATE book_list"
                 "  SET `read`='true',`toberead`='false'"
                 "WHERE `bookname`=%s AND `year`=%s")

        datas=(b['name'],b['year'])

        cur.execute(query,datas)
        db.commit()

        return jsonify({'status':'Book send to read.','check':'true'})
    except:
        return jsonify({'status':'Book cant send to read.','check':'false'})


@app.route('/sendtoberead', methods=['POST'])
def sendtoberead():
    try:
        b=json.loads(request.data)

        if b['toberead'] == 'true':

            return jsonify({'status':'Book already exist in toberead.','check':'none'})

        query = (" UPDATE book_list"
                 "  SET `read`='false',`toberead`='true'"
                 "WHERE `bookname`=%s AND `year`=%s")

        datas=(b['name'],b['year'])

        cur.execute(query,datas)
        db.commit()
        return jsonify({'status':'Book send to read.','check':'true'})
    except:
        return jsonify({'status':'Book cant send to read.','check':'false'})

@app.route('/sendtofav', methods=['POST'])
def sendtofav():

    try:

        query = (" UPDATE book_list"
                 "  SET `favorite`='true'"
                 "WHERE `bookname`=%s AND `year`=%s")
        b=json.loads(request.data)
        datas=(b['name'],b['year'])
        print(b['fav'])
        if b['fav'] == 'false':
            cur.execute(query,datas)
            db.commit()

            return jsonify({'status':'Book add to favorite.','check':'true'})

        return jsonify({'status':'Book already into favorite.','check':'none'})
    except:
        return jsonify({'status':'Book cant add to favorite.','check':'false'})


@app.route('/removefav', methods=['POST'])
def removefav():
    try:

        query = (" UPDATE book_list"
                 "  SET `favorite`='false'"
                 "WHERE `bookname`=%s AND `year`=%s")
        b=json.loads(request.data)
        datas=(b['name'],b['year'])

        cur.execute(query,datas)
        db.commit()

        return jsonify({'status':'Book remove from favorite.','check':'true'})
    except:
        return jsonify({'status':'Book cant remove from favorite.','check':'false'})

@app.route('/deletebook', methods=['POST'])
def deletebook():
    try:
        query1=(" SELECT imageURL  FROM book_list"
                    "   WHERE `bookname`=%s AND `year`=%s")
        query = (" DELETE  FROM book_list"
                 "   WHERE `bookname`=%s AND `year`=%s")


        b=json.loads(request.data)
        datas=(b['name'],b['year'])
        cur.execute(query1,datas)

        books1=[];

        for a in cur:
            books1.append(a)


        if os.path.exists(books1[0][0]):
            os.remove(books1[0][0])

        cur.execute(query,datas)
        db.commit()


        return jsonify({'status':'Book deleted.','check':'true'})
    except:
        return jsonify({'status':'Book cant deleted','check':'false'})





if __name__ == '__main__':
    app.run(debug=True,port=8080)

