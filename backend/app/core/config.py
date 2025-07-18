import os
import json

def load_keys():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    KEYS_DIR = os.path.join(BASE_DIR,"..","keys.json")

    with open(KEYS_DIR,"r") as f:
        return json.load(f)