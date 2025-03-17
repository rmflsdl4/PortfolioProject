from flask import Flask, request, jsonify
from model import Model

app = Flask(__name__)

@app.route("/chat", methods=["POST"])
def generate():
    data = request.json
    question = data.get("question", "")

    if not question:
        return jsonify({"error": "No prompt provided"}), 400
    
    response = model.ask(question)

    return jsonify({"response": response})

if __name__ == "__main__":
    try:
        model = Model()
        app.run(host="0.0.0.0", port=5000)
    except Exception as e:
            print(f"에러 발생: {e}")
