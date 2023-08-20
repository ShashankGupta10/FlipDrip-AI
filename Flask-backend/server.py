from flask import Flask, jsonify, request
from flask_cors import CORS
from chatBot import getChat

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=['POST', 'GET'])
def chatAPI():
    prompt = request.get_json()
    response = getChat(prompt)
    return jsonify(response)
    # return jsonify( {"image": False, "output": prompt[0]})
    # return jsonify({"image": True, "output": "https://i.ibb.co/rxJFZ9L/image.png" })

if __name__ == "__main__":
    app.run(debug=True)
