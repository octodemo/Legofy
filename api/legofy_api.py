from flask import Flask, request, send_file
from legofy import legofy
import os

app = Flask(__name__)

@app.route('/api/legofy', methods=['POST'])
def legofy_api():
    if 'image' not in request.files:
        return "No image file provided", 400
    image = request.files['image']
    if image.filename == '':
        return "No selected file", 400
    if image:
        base_path = os.path.dirname(__file__)
        input_path = os.path.join(base_path, 'uploads', image.filename)
        output_path = os.path.join(base_path, 'outputs', image.filename)
        image.save(input_path)
        legofy.main(input_path, output_path)
        return send_file(output_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
