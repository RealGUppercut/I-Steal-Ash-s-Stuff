import UpdateForm from "@/components/UpdateForm";
import { db } from "@/utils/dbConnection";
import Link from "next/link";

export default async function UpdatePage({ params }) {
  const game = await db.query(
    `SELECT * FROM chess_games WHERE id=${params.id};`
  );
  const data = game.rows[0];
  console.log(data);

  return (
    <>
      <h1>Update Form</h1>
      <Link href={`/chess-games/${params.id}`}>go back ...</Link>
      <UpdateForm
        id={params.id}
        white={data.white}
        black={data.black}
        opening={data.opening}
        summary={data.summary}
        pgn={data.pgn}
        winner={data.winner}
        image_src={data.image_src}
      />
    </>
  );
}
