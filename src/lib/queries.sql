-- CREATE TABLE IF NOT EXISTS chess_games(
--   id SERIAL PRIMARY KEY,
--   white VARCHAR(255),
--   black VARCHAR(255),
--   opening VARCHAR(255),
--   summary TEXT,
--   pgn TEXT,
--   winner VARCHAR(255),
--   image_src TEXT
-- );

-- CREATE TABLE IF NOT EXISTS comments2 (
--   id SERIAL PRIMARY KEY,
--   username VARCHAR(255) NOT NULL,
--   comment TEXT NOT NULL,
--   chess_games_id INTEGER REFERENCES chess_games(id)
-- )

CREATE TABLE IF NOT EXISTS game_likes (
  id SERIAL PRIMARY KEY,
  game_like BOOLEAN,
  chess_games_id INTEGER REFERENCES chess_games(id)
)

-- INSERT INTO comments2(username, comment, chess_games_id) VALUES('Ash', 'Wow, i am lost for words', 1)

INSERT INTO game_likes(game_like, chess_games_id) VALUES(true,  2)

DELETE FROM comments2 WHERE id=3

UPDATE chess_games SET image_src = '' WHERE id = 3