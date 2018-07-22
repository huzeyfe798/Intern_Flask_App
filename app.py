
import os, sys

import mysql.connector
import urllib
import urllib2
import hashlib

from flask import Flask, render_template, request, jsonify, json,redirect,session
from flask_mail import Mail,Message

app = Flask(__name__)

app.secret_key = 'Hohohoho1234512345'
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT']=465
app.config['MAIL_USERNAME']='flasklibraryapp@gmail.com'
app.config['MAIL_PASSWORD']='huzeyfeflaskapp'
app.config['MAIL_USE_TLS']=False
app.config['MAIL_USE_SSL']=True

mail=Mail(app)

db = mysql.connector.connect(user='root', database='library', password='Hu192478')

cur = db.cursor()

def reconnectDatabase():
    global db, cur
    if not db.is_connected():
        db = mysql.connector.connect(user='root', database='library', password='Hu192478')
        cur = db.cursor()

@app.before_request
def before_request():
    reconnectDatabase()

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/register')
def regis():
        return render_template('register.html')

@app.route('/resetpass')
def resspass():
        return render_template('passwordress.html')

@app.route('/favorite')
def favorite():
    if 'id' in  session:
        return render_template('favorite.html')
    else:
        return redirect('http://127.0.0.1:8080/')

@app.route('/home')
def homepage():
    if 'id' in  session:
        return render_template('homepage.html')
    else:
        return redirect('http://127.0.0.1:8080/')

@app.route('/toberead')
def toberead():
    if 'id' in  session:
        return render_template('toberead.html')
    else:
        return redirect('http://127.0.0.1:8080/')

@app.route('/read')
def read():
    if 'id' in  session:
        return render_template('read.html')
    else:
        return redirect('http://127.0.0.1:8080/')

@app.route('/addbook')
def adbook():
    if 'id' in  session:
        return render_template('index.html')
    else:
        return redirect('http://127.0.0.1:8080/')

@app.route('/mail_confirmation')
def confmail():
    return render_template('confirmmail.html')

@app.route('/login', methods =['POST'])
def login():
    username = request.json['username']
    password = request.json['password']

    search_user = ("SELECT * FROM `user`"
                   "  WHERE `username`=%s")
    user_data = (str(username.encode('utf-8')),)

    cur.execute(search_user,user_data)

    getuser = cur.fetchall()

    if(len(getuser) != 0):
        if(password == getuser[0][3]):

            if(getuser[0][4] != 1):
                return jsonify({'status': 'Please confirmation your account!', 'check': False})

            session['id']=getuser[0][0]


            return jsonify({'status':'success', 'check': True})

        return jsonify({'status': 'Your password not correct!', 'check': False})


    return jsonify({'status': 'This account cant exist!', 'check': False})

@app.route('/postuser', methods =['POST'])
def registeruser():

    try:
        username = request.json['username']
        if (request.json['password'] != request.json['userpasswordconfirm']):
            print "aaaa"
            return jsonify({'status': 'Check your passwords', 'check': False})

        password = request.json['password']
        email = request.json['email']
        confirm = 0

        id_username = str(username) + str(password)

        specific_id = hashlib.md5(id_username.encode('utf-8')).hexdigest()

        search_user = ("SELECT * FROM `user`"
                        "  WHERE `username`=%s OR `useremail`=%s")
        user_data = (str(username.encode('utf-8')),str(email.encode('utf-8')))

        cur.execute(search_user,user_data)

        getuser = cur.fetchall()

        if(len(getuser) != 0):
            return jsonify({'status': 'This username or email already used', 'check': False})

        add_user = ("INSERT INTO user "
                    "(`iduser`, `username`, `useremail`, `userpassword`, `confirm`)"
                    " VALUES (%s,%s,%s, %s, %s)")

        user_data1 = (specific_id,username,email,password,confirm)

        cur.execute(add_user, user_data1)
        db.commit()

        msg = Message('Hello',sender = 'flasklibraryapp@gmail.com', recipients=[email])
        msg.body = "Confirmation link: http://127.0.0.1:8080/mail_confirmation/?code="+specific_id
        mail.send(msg)
        return jsonify({'status': 'Please confirm your email', 'check': True})
    except:
        return jsonify({'status': 'Check your infos', 'check': False})

@app.route('/sendpass', methods =['POST'])
def sendpass():
    try:

        email = request.json['email']

        search_user = ("SELECT * FROM `user`"
                       "  WHERE `useremail`=%s ")
        user_data = (email,)

        cur.execute(search_user,user_data)

        getuser = cur.fetchall()

        msg = Message('Hello',sender = 'flasklibraryapp@gmail.com', recipients=[email])
        msg.body = "Your id:"+getuser[0][1]+" and your password:" + getuser[0][3]
        mail.send(msg)

        return jsonify({'status': 'Please confirm your email', 'check': True})
    except:
        return jsonify({'status': 'Check your email', 'check': False})





@app.route('/mail_confirmation/', methods=['GET'])
def confirmation():
    code = request.args.get('code')

    query = (" UPDATE user"
             "  SET `confirm`=1"
             " WHERE `iduser`=%s")

    query1 = ("CREATE TABLE IF NOT EXISTS `%s` ("
                "`bookname` varchar(250) CHARACTER SET utf8 DEFAULT NULL,"
                "`authorname` varchar(250) CHARACTER SET ucs2 DEFAULT NULL,"
                "`year` varchar(250) DEFAULT NULL,"
                "`imageURL` varchar(250) DEFAULT NULL,"
                "`read` varchar(45) DEFAULT NULL,"
                "`favorite` varchar(45) DEFAULT NULL,"
                "`toberead` varchar(45) DEFAULT NULL )")

    print(code)
    user_data1 = (code[:64],)

    cur.execute(query1,user_data1)
    db.commit()

    cur.execute(query, user_data1)
    db.commit()

    return redirect("http://127.0.0.1:8080/mail_confirmation")

@app.route('/logout',methods=['GET'])
def logout():
    session.pop('id')

    return jsonify({'status': 'Database Connection Error','check':False})

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

        search_book = (" SELECT *  FROM `%s`"
                       "   WHERE `bookname`=%s AND `year`=%s")
        data_word1 = (session['id'],str(bookname.encode('utf-8')), str(year))
        cur.execute(search_book, data_word1)
        getbooks = cur.fetchall()

        if(len(getbooks) == 0):
            if imageURL != '':

                returnurl = urllib2.urlopen(imageURL)
                if returnurl.code == 200:
                    new_image_url = imageURL
                    imageURL = "static/img/" + hashlib.sha256(combineforhash.encode('utf-8')).hexdigest() + ".jpg"
                    imagefile = open(imageURL, 'wb')
                    imagefile.write(urllib.urlopen(new_image_url).read())
                    imagefile.close
                else:
                    return jsonify({'status': 'This url not exist', 'check': False})

            add_book = ("INSERT INTO `%s`"
                        "(`bookname`, `authorname`, `year`, `imageURL`, `read` , `favorite` , `toberead`)"
                        " VALUES (%s,%s,%s, %s, %s, %s, %s)")
            data_word = (session['id'],str(bookname.encode('utf-8')), str(authorname.encode('utf-8')), str(year), str(imageURL), str(read),str(favorite), str(toberead))
            cur.execute(add_book, data_word)
            db.commit()
            return jsonify({'status': 'Saved', 'check': True})
        else:
            return jsonify({'status': 'This book already exists', 'check': False})
    except:
        return jsonify({'status': 'Cant Saved', 'check': False})

@app.route('/jsondatas', methods=['GET'])
def takeAll():
    try:

        query=(
            "SELECT `bookname`, `authorname`, `year`, `imageURL`, `read` , `favorite` , `toberead` FROM `%s`")

        data =(session['id'],)
        cur.execute(query,data)

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

        query = (" SELECT bookname,authorname,imageURL,`year` FROM `%s`"
                "   WHERE bookname=%s")
        datas =(session['id'],book['name'])

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

        query = (" UPDATE `%s`"
                 "  SET `read`='true',`toberead`='false'"
                 "WHERE `bookname`=%s AND `year`=%s")

        datas = (session['id'],bookinfo['name'], bookinfo['year'])

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

        query = (" UPDATE `%s`"
                 "  SET `read`='false',`toberead`='true'"
                 "WHERE `bookname`=%s AND `year`=%s")

        datas = (session['id'],bookinfo['name'], bookinfo['year'])

        cur.execute(query, datas)

        db.commit()

        return jsonify({'status': 'Book send to be read.', 'check': True})

    except:

        return jsonify({'status': 'Book cant send to be read.', 'check': False})


@app.route('/sendtofav', methods=['POST'])
def sendtofav():
    try:

        query = (" UPDATE `%s`"
                 "  SET `favorite`='true'"
                 "WHERE `bookname`=%s AND `year`=%s")

        bookinfo = json.loads(request.data)

        datas = (session['id'],bookinfo['name'], bookinfo['year'])


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
        query = (" UPDATE `%s`"
                 "  SET `favorite`='false'"
                 "WHERE `bookname`=%s AND `year`=%s")
        bookinfo = json.loads(request.data)
        datas = (session['id'],bookinfo['name'], bookinfo['year'])

        cur.execute(query, datas)
        db.commit()

        return jsonify({'status': 'Book remove from favorite.', 'check': True})

    except:

        return jsonify({'status': 'Book cant remove from favorite.', 'check': False})


@app.route('/deletebook', methods=['POST'])
def deletebook():
    try:
        query1 = (" SELECT imageURL  FROM `%s`"
                  "   WHERE `bookname`=%s AND `year`=%s")
        query = (" DELETE  FROM book_list"
                 "   WHERE `bookname`=%s AND `year`=%s")

        bookinfo = json.loads(request.data)
        datas = (session['id'],bookinfo['name'], bookinfo['year'])
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
