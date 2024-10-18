// navigation
// we need query strings to sort the data ascending and descending
// ! remember the metadata
import { db } from "@/utils/dbConnection";
import Link from "next/link";

export default async function ChessGamesPage() {
  const games = await db.query(`SELECT * FROM chess_games`);
  const data = games.rows;

  console.log(data);

  return (
    <>
      <h1>Chess Games {data[0].white}</h1>
      <div className="flex flex-col gap-4 m-4">
        {data.map((game) => (
          <div key={game.id}>
            <h2>{game.opening}</h2>
            <Link href={`/chess-games/${game.id}`}>
              {game.white} vs {game.black}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
