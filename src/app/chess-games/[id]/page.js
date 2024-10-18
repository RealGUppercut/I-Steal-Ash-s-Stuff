// we need to use params to render page dynamically
// ! remember metadata
import { db } from "@/utils/dbConnection";
import Link from "next/link";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function GamePage({ params }) {
  const game = await db.query(
    `SELECT * FROM chess_games WHERE id=${params.id};`
  );
  const data = game.rows[0];
  // console.log(data);

  const comments = await db.query(
    `SELECT * FROM comments2 WHERE chess_games_id=${params.id}`
  );
  const commentsData = comments.rows;
  console.log(commentsData);

  // =============================================================================================================
  async function handleSubmit(formValues) {
    "use server";

    const formData = {
      username: formValues.get("username"),
      comment: formValues.get("comment"),
      chess_games_id: params.id,
    };
    console.log(formData);

    await db.query(
      `INSERT INTO comments2(username, comment, chess_games_id) VALUES ($1,$2,$3)`,
      [formData.username, formData.comment, formData.chess_games_id]
    );

    revalidatePath(`/chess-games/${params.id}`);
    redirect(`/chess-games/${params.id}`);
  }

  return (
    <>
      <h1>dynamic route for each post</h1>
      <Link href="/chess-games">go back ...</Link>

      <section className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-4 p-6 w-96">
          <Image
            alt={data.white}
            src={data.image_src}
            width={200}
            height={200}
          />
          <h1>
            {data.white} vs {data.black}
          </h1>
          <p>game summary&#58; {data.summary}</p>
          <p>{data.pgn}</p>
          <p>Winner&#58; {data.winner}</p>
        </div>
      </section>

      <form action={handleSubmit} className="flex flex-col items-center">
        <label htmlFor="username">Name </label>
        <input
          type="text"
          name="username"
          placeholder="type your full name"
          id="username"
          required
          className="text-orange-600 p-1"
        />
        <label htmlFor="comment">Comment </label>
        <textarea
          type="text"
          name="comment"
          placeholder="please comment on the game ..."
          id="comment"
          required
          className="text-orange-600 p-1"
        />
        <button
          type="submit"
          className="border-rose-400 border-4 bg-slate-300 text-rose-400 p-2 m-4 hover:bg-orange-800 hover:text-blue-200
          transition duration-300 ease-in-out"
        >
          Send Comment
        </button>
      </form>

      <section className="flex flex-col items-center">
        {commentsData.map((comment) => (
          <div
            key={comment.id}
            className="flex flex-col items-center border-black border-2 w-96 m-4"
          >
            <p>name&#58; {comment.username}</p>
            <p>comment&#58; {comment.comment}</p>
            <button
              className="border-black border-1 bg-slate-300 text-rose-400 p-1 m-2 hover:bg-orange-800 hover:text-blue-200
          transition duration-300 ease-in-out"
            >
              delete
            </button>
          </div>
        ))}
      </section>
    </>
  );
}
