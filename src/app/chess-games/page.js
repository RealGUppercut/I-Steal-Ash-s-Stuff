// navigation
// we need query strings to sort the data ascending and descending
// ! remember the metadata
import { db } from "@/utils/dbConnection";
import Link from "next/link";
import homeBackground from "@/../public/homeBackground.avif";
import styles from "@/app/chess-games/chessgame.module.css";
import Image from "next/image";

export const metadata = {
  title: "The Chess Directory - Chess games",
  description: "A list of notable chess games",
};

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
      <div className={styles.container}>
        <Image
          alt="background image"
          src={homeBackground}
          layout="fill"
          objectFit="cover"
          quality={100}
          className={styles.backgroundImage}
        />

        <div className="bg-green-200 p-2">
          <h1 className="font-bold">Game Directory </h1>
          <div className="flex flex-row gap-6 font-bold">
            <Link
              className="hover:scale-110 ease-in-out transition-transform duration-300"
              href="/chess-games?sort=asc"
            >
              Sort ascending
            </Link>
            <Link
              className="hover:scale-110 ease-in-out transition-transform duration-300"
              href="/chess-games?sort=desc"
            >
              Sort descending
            </Link>

            {/* <select>
          <option value="">Select a category</option>
          {uniqueOpenings.map((opening, index) => (
            <option key={index} value={opening}>
              {opening}
            </option>
          ))}
        </select> */}
          </div>
          <div className="flex flex-row gap-6 items-center flex-wrap">
            <h2 className="font-bold">Filter by Opening&#58; </h2>
            {uniqueOpenings.map((opening, index) => (
              <Link
                className="font-bold hover:scale-110 ease-in-out transition-transform duration-300"
                key={index}
                href={`/chess-games?category=${opening}`}
              >
                {opening}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-row gap-4 m-4 flex-wrap justify-center ">
          {data.map((game) => (
            <div
              className="max-w-xs min-w-72 border-4 border-green-700 p-4 rounded-lg bg-green-50"
              key={game.id}
            >
              <h2>{game.opening}</h2>
              <Link
                className="font-bold hover:scale-110 ease-in-out transition-transform duration-300 z-10 inline-block p-1"
                href={`/chess-games/${game.id}`}
              >
                {game.white} vs {game.black}
              </Link>
              <p className="my-2">{game.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
