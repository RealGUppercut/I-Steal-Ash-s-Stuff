// navigation
// we need query strings to sort the data ascending and descending
// ! remember the metadata
import { db } from "@/utils/dbConnection";
import Link from "next/link";

export default async function ChessGamesPage({ searchParams }) {
  const games = await db.query(`SELECT * FROM chess_games`);
  let data = games.rows;

  // Get all values for the property 'opening'
  const openings = data.map((obj) => obj.opening);

  // Filter out the duplicates
  const uniqueOpenings = [...new Set(openings)];

  function handleChange(event) {
    const value = e.target.value;
    console.log(value);
    // if (searchParams.category === value) {
    //   data = data.filter((obj) => obj.opening === "Queens Gambit");
    // }
  }

  // console.log(data);
  console.log({ searchParams });
  if (searchParams.sort === "asc") {
    data.sort((a, b) => a.opening.localeCompare(b.opening));
    // console.log(data.sort((a, b) => a.opening.localeCompare(b.opening)));
  } else if (searchParams.sort === "desc") {
    data.sort((a, b) => b.opening.localeCompare(a.opening));
    // console.log(data.sort((a, b) => b.opening.localeCompare(a.opening)));
  }

  // if (searchParams.category === "Queens Gambit") {
  //   data = data.filter((obj) => obj.opening === "Queens Gambit");
  // }

  uniqueOpenings.map((opening) => {
    if (searchParams.category === opening) {
      data = data.filter((obj) => obj.opening === opening);
    }
  });

  // console.log(data.reverse());
  // console.log(temp);
  // const temp = data.sort((a, b) => b.opening.localeCompare(a.opening));
  // console.log(temp);
  console.log(uniqueOpenings);

  return (
    <>
      <h1>Chess Games </h1>
      <div className="flex flex-row gap-6">
        <Link href="/chess-games?sort=asc">Sort ascending</Link>
        <Link href="/chess-games?sort=desc">Sort descending</Link>
        <Link href="/chess-games?category=Queens Gambit">
          Filter Queens gambit games
        </Link>

        <select>
          <option value="">Select a category</option>
          {uniqueOpenings.map((opening, index) => (
            <option key={index} value={opening}>
              {opening}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-row gap-6 items-center">
        <h2>Filter by Opening&#58; </h2>
        {uniqueOpenings.map((opening, index) => (
          <Link key={index} href={`/chess-games?category=${opening}`}>
            {opening}
          </Link>
        ))}
      </div>

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
