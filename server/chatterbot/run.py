# -*- coding: utf-8 -*-
from flask import Flask, render_template
from flask_cors import CORS
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer

app = Flask(__name__)
CORS(app)

shop_bot = ChatBot("Shop Bot", storage_adapter="chatterbot.storage.SQLStorageAdapter")

shop_bot.set_trainer(ChatterBotCorpusTrainer)
shop_bot.train("chatterbot.corpus.english")

@app.route("/api/v1/<string:query>")
def get_raw_response(query):
    return str(shop_bot.get_response(query))


if __name__ == "__main__":
    app.run()