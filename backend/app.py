import os
import json
import sqlite3
import uuid
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# ── Caminhos ──────────────────────────────────────────────────────────────────
BASE_DIR      = os.path.dirname(__file__)
MUSIC_FILE    = os.path.join(BASE_DIR, "music", "music.json")
PLAYLIST_FILE = os.path.join(BASE_DIR, "playlist.json")
DB_FILE       = os.path.join(BASE_DIR, "users.db")


# ── Banco de dados (SQLite) ───────────────────────────────────────────────────
def get_db():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Cria a tabela de usuários se não existir."""
    with get_db() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id       INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT    NOT NULL UNIQUE,
                password TEXT    NOT NULL
            )
        """)
        conn.commit()


init_db()


# ── Helpers de playlist ───────────────────────────────────────────────────────
def _load_playlist():
    if not os.path.exists(PLAYLIST_FILE):
        return {}
    with open(PLAYLIST_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def _save_playlist(data):
    with open(PLAYLIST_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def _get_song(song_id):
    with open(MUSIC_FILE, "r", encoding="utf-8") as f:
        songs = json.load(f)
    for genre in songs.values():
        matched = next((s for s in genre if int(song_id) == s["song_id"]), None)
        if matched:
            return matched
    return None


# ══════════════════════════════════════════════════════════════════════════════
# ROTAS DE AUTENTICAÇÃO
# ══════════════════════════════════════════════════════════════════════════════

@app.post("/auth/register")
def register():
    """Cadastra um novo usuário."""
    body = request.get_json(silent=True) or {}
    username = (body.get("username") or "").strip()
    password = (body.get("password") or "").strip()

    if not username or not password:
        return jsonify({"error": "Preencha todos os campos."}), 400

    try:
        with get_db() as conn:
            conn.execute(
                "INSERT INTO users (username, password) VALUES (?, ?)",
                (username, password)
            )
            conn.commit()
        return jsonify({"message": "Cadastro realizado com sucesso!"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Usuário já existe."}), 409


@app.post("/auth/login")
def login():
    """Valida credenciais."""
    body = request.get_json(silent=True) or {}
    username = (body.get("username") or "").strip()
    password = (body.get("password") or "").strip()

    if not username or not password:
        return jsonify({"error": "Preencha todos os campos."}), 400

    with get_db() as conn:
        user = conn.execute(
            "SELECT * FROM users WHERE username = ? AND password = ?",
            (username, password)
        ).fetchone()

    if user:
        return jsonify({"message": "Login realizado!", "username": user["username"]}), 200
    return jsonify({"error": "Usuário ou senha incorretos."}), 401


# ══════════════════════════════════════════════════════════════════════════════
# ROTAS DE PLAYLIST
# ══════════════════════════════════════════════════════════════════════════════

@app.get("/playlist/<floor>")
def get_playlist(floor):
    playlist = _load_playlist()
    if floor == "all":
        all_songs = []
        for songs in playlist.values():
            all_songs.extend(songs)
        return jsonify(sorted(all_songs, key=lambda s: s.get("likes", 0), reverse=True)), 200

    floor_songs = playlist.get(floor, [])
    return jsonify(sorted(floor_songs, key=lambda s: s.get("likes", 0), reverse=True)), 200


@app.post("/playlist/<floor>/<song_id>")
def add_song(floor, song_id):
    song = _get_song(song_id)
    if not song:
        return jsonify({"error": "Música não encontrada"}), 404

    entry = {**song, "likes": 0, "playlist_id": str(uuid.uuid4())}
    playlist = _load_playlist()
    playlist.setdefault(floor, [])
    playlist[floor].append(entry)
    _save_playlist(playlist)
    return jsonify(entry), 201


@app.put("/playlist/<playlist_id>")
def like_song(playlist_id):
    playlist = _load_playlist()
    for songs in playlist.values():
        matched = next((s for s in songs if s.get("playlist_id") == playlist_id), None)
        if matched:
            matched["likes"] = matched.get("likes", 0) + 1
            _save_playlist(playlist)
            return jsonify(matched), 200
    return jsonify({"error": "Música não encontrada"}), 404


@app.delete("/playlist/<playlist_id>")
def delete_song(playlist_id):
    playlist = _load_playlist()
    for songs in playlist.values():
        matched = next((s for s in songs if s.get("playlist_id") == playlist_id), None)
        if matched:
            songs.remove(matched)
            _save_playlist(playlist)
            return jsonify({"message": "Música removida com sucesso"}), 200
    return jsonify({"error": "Música não encontrada"}), 404


@app.get("/music/<path:filename>")
def serve_music(filename):
    """Serve os arquivos .mp3 locais para o app."""
    music_dir = os.path.join(BASE_DIR, "music")
    from flask import send_from_directory
    music_dir = os.path.join(BASE_DIR, "music")
    return send_from_directory(music_dir, filename)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)