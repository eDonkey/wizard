from flask import Flask, request, jsonify
import openai
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

openai.api_key = os.getenv("OPENAI_API_KEY")

PROMPT_BASE = """
Eres un diseñador de UX/UI experto en estilos visuales personalizados. Según las emociones y preferencias del usuario, recomendá un estilo visual completo (colores, tipografías, forma general, referencias).
"""

@app.route('/api/sugerencia', methods=['POST'])
def sugerencia():
    data = request.json
    emociones = data.get("emociones", "")
    descripcion = data.get("descripcion", "")

    prompt = PROMPT_BASE + f"\n\nEl usuario dice que siente: {emociones}. Además describe: {descripcion}.\n\nRespondé de forma clara en formato JSON con claves: 'estilo', 'colores', 'tipografia', 'referencias'."

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{ "role": "user", "content": prompt }],
        temperature=0.7
    )

    content = response['choices'][0]['message']['content']
    return jsonify({ "respuesta": content })
