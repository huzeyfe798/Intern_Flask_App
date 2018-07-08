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

@app.route('/read')
def read():
    return render_template('read.html')


@app.route('/addbook')
def adbook():
    return render_template('index.html')

@app.route('/post',methods=['POST'])
def addOne():
    name1 = {'bookname' : request.json['bookname'],'authorname' : request.json['authorname'],'year' : request.json['year'],'favorite' : request.json['favorite'],'read' : request.json['read'],'toberead' : request.json['toberead']}

    with open('database.json') as inputfile:
        books = json.load(inputfile)
        print(name1)
        print(type(name1))
        print(type(books))
        books.append(name1)
        # if not any(name1['bookname'] == request.json['bookname'] for d in books):
        #     books.append(name1)
        # else:
        #     print("Book exist")
    with open('database.json','w') as outputfile:
        json.dump(books,outputfile)
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

