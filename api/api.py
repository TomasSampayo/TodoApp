from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os
load_dotenv()


app = Flask(__name__, static_url_path='')


app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URI")

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.debug = True
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(16), unique=True, nullable=False)
    password = db.Column(db.String(228), nullable=False)
    todos = db.relationship('Todo', backref='user', lazy='dynamic')


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), nullable=False)
    post = db.Column(db.String(500), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __str__(self):
        return f'{self.id} {self.post}'


def todo_serializer(todo):
    return {
        'id': todo.id,
        'title': todo.title,
        'post': todo.post,
        'user_id': todo.user_id
    }


@app.route('/api')
def api():
    return jsonify([*map(todo_serializer, Todo.query.all())])


@app.route('/api/create', methods=['POST'])
def create():
    request_data = json.loads(request.data)
    todo = Todo(title=request_data['title'],
    post=request_data['post'])

    db.session.add(todo)
    db.session.commit()

    return {'201': 'todo created successfully'}


@app.route('/api/<int:id>', methods=["PUT"])
def edit(id):
    request_data = json.loads(request.data)
    todo = Todo.query.filter_by(id=id).first()
    todo.title = request_data['title']
    todo.post = request_data['post']
    db.session.commit()
    return {'201': 'todo edited successfully'}

@app.route('/api/<int:id>')
def show(id):
    return jsonify([*map(todo_serializer,Todo.query.filter_by(id=id))])

@app.route('/api/<int:id>', methods=["POST"])
def delete(id):
    request_data = json.loads(request.data)
    Todo.query.filter_by(id=request_data['id']).delete()
    db.session.commit()

    return { '204': 'Deleted successfully'}

@app.route('/')
def index():
    return app.send_static_file('../build/index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('../build/index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=os.environ.get('PORT', 80))