from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["POST", "OPTIONS"])
def receive_state():
    if request.method == "OPTIONS":
        return '', 200  

    data = request.get_json()
    print("Received state:", data)
    
    for i, cell in enumerate(data['board']):
        print(f"Cell {i}: {cell}")
    
    data['board'][1] = "X"

    return jsonify({"message": data})

if __name__ == "__main__":
    app.run(debug=True)
