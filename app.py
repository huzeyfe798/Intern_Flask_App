from flask import Flask,render_template,request,jsonify,json
app = Flask(__name__)



@app.route('/')
def index():
    return render_template('index.html')

@app.route('/lang',methods=['POST'])
def addOne():
    name1 = {'bookname' : request.json['bookname'],'authorname' : request.json['authorname'],'year' : request.json['year']}

    with open('database.json') as inputfile:
        books = json.load(inputfile)
        books.append(name1)
    with open('database.json','w') as outputfile:
        json.dump(books,outputfile)
    return jsonify({'names':name1})

# @app.route('/lang',methods=['GET'])
# def returnAll():
#     return jsonify({'names':name1})


if __name__ == '__main__':
    app.run(debug=True,port=8080)

