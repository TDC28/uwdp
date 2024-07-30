from flask import Flask, jsonify
from flask_cors import CORS
from app.models.majors.major import Major

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'message': 'Hello from antartica!!!!'}
    maj = Major()
    maj.name = "asdf"
    print(maj.name)
    return jsonify(str(maj))

if __name__ == "__main__":
    app.run(debug=True)
