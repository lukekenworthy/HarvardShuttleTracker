import os
import re
from flask import Flask, jsonify, render_template, request

from cs50 import SQL

# Configure application
app = Flask(__name__)

@app.route("/")
def index():
    """Render map"""
    if not os.environ.get("API_KEY"):
        raise RuntimeError("API_KEY not set")
    return render_template("index.html", key=os.environ.get("API_KEY"))