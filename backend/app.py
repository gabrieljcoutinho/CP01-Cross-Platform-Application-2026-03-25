import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid

app = Flask(__name__)
CORS(app)

MUSIC_FILE = os.path.join(os.path.dirname(__file__), "..\music\music.json")
PLAYLIST_FILE = os.path.join(os.path.dirname(__file__), "playlist.json")

def _load_playlist():
    if not os.path.exists(PLAYLIST_FILE):
        return []
    with open(PLAYLIST_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def _save_playlist(data):
    with open(PLAYLIST_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def _get_song(song_id):
    with open(MUSIC_FILE, "r", encoding="utf-8") as file:
        songs = json.load(file)
        for genre in songs.values():
            matched = next((song for song in genre if int(song_id) == song["song_id"]), None)
            if matched:
                return matched
        return {"Erro": "Música não encontrada"}, 404



@app.get("/playlist/<floor>")
def get_playlist(floor):
    playlist = _load_playlist()
    if floor == "all":
        all_songs = []
        for songs in playlist.values():
            all_songs.extend(songs)
        sorted_songs = sorted(all_songs, key=lambda song: song.get("likes", 0), reverse=True)
        return jsonify(sorted_songs), 200
    else:
        sorted_songs = sorted(playlist[floor], key=lambda song: song.get("likes", 0), reverse=True)
        return jsonify(sorted_songs), 200


@app.post("/playlist/<floor>/<song_id>")
def add_song(floor, song_id):
    song = _get_song(song_id)
    song["likes"] = 0
    song["playlist_id"] = str(uuid.uuid4())
    playlist = _load_playlist()
    playlist[floor].append(song)
    _save_playlist(playlist)
    return jsonify(song), 201


@app.put("/playlist/<playlist_id>")
def like_song(playlist_id):
    playlist = _load_playlist()

    for floor, songs in playlist.items():  # each floor is a list
        matched = next((song for song in songs if song.get("playlist_id") == playlist_id), None)
        if matched:
            matched["likes"] = matched.get("likes", 0) + 1
            _save_playlist(playlist)
            return jsonify(matched), 200

    return jsonify({"Erro": "Música não encontrada"}), 404

@app.delete("/playlist/<playlist_id>")
def delete_song(playlist_id):
    playlist = _load_playlist()

    for floor, songs in playlist.items():
        matched = next((song for song in songs if song.get("playlist_id") == playlist_id), None)
        if matched:
            songs.remove(matched)
            _save_playlist(playlist)
            return jsonify({"message": "Música removida com sucesso"}), 200

    return jsonify({"Erro": "Música não encontrada"}), 404


if __name__ == "__main__":
    app.run(debug=True, port=5000)

