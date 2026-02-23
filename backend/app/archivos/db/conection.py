from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

load_dotenv()

uri = os.getenv("MONGO_URL") 
client = MongoClient(uri)

db = client["notas"] 
usuarios_collection = db["usuarios"] 
notas_collection = db["notas"]