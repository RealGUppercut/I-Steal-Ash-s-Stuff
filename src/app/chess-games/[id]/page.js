// we need to use params to render page dynamically
// ! remember metadata
import { db } from "@/utils/dbConnection";
import Link from "next/link";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import DeleteButton from "@/components/DeleteButton";
import ChessBoard from "@/components/ChessBoard";
import UpdateForm from "@/components/UpdateForm";
import LikeButton from "@/components/LikeButton";

import styles from "@/app/chess-games/[id]/game.module.css";
import background3 from "@/../public/background3.jpg";

export async function generateMetadata({ params }) {
  const game = await db.query(
    `SELECT * FROM chess_games WHERE id=${params.id};`
  );
  const data = game.rows[0];
  //I am returning a metadata object
  return {
    title: `The Chess Directory - ${data.white} vs ${data.black}`,
    description: `${data.opening}`,
  };
}

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

  // get likes
  const likes = await db.query(
    `SELECT * FROM game_likes WHERE chess_games_id=${params.id}`
  );
  const likesData = likes.rows;
  console.log(likesData);
  const sumOfLikes = likesData.reduce((accumulator, item) => {
    return accumulator + item.game_like;
  }, 0);

  console.log(sumOfLikes);
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

  // ===================================================================================================================
  // delete comments
  async function handleDelete(index) {
    "use server";
    await db.query(`DELETE FROM comments2 WHERE id=${index}`);

    revalidatePath(`/chess-games/${params.id}`);
    redirect(`/chess-games/${params.id}`);
  }

  // ==================================================================================================================
  // conditionally render update component
  let showUpdate = true;

  // =================================================================================================================
  // Like button
  async function handleLike(index) {
    "use server";
    await db.query(
      `INSERT INTO game_likes(game_like, chess_games_id) VALUES(true,  ${index})`
    );

    revalidatePath(`/chess-games/${params.id}`);
    redirect(`/chess-games/${params.id}`);
  }

  return (
    <>
      <div className={styles.container}>
        <Image
          alt="background image"
          src={background3}
          layout="fill"
          objectFit="cover"
          quality={100}
          className={styles.backgroundImage}
        />
        <div className="flex flex-col gap-3 mx-28 ">
          <Link
            className="hover:scale-110 ease-in-out transition-transform duration-300 font-bold bg-green-100 w-fit p-1.5 border-green-800 border-4
            rounded-lg my-10"
            href="/chess-games"
          >
            go back ...
          </Link>
          <div>
            <LikeButton id={params.id} handleLike={handleLike} />
            <h2 className="font-bold">{sumOfLikes} Likes</h2>
          </div>
          <Link
            className="hover:scale-110 ease-in-out transition-transform duration-300 font-bold bg-green-100 w-fit p-1.5 border-green-800 border-4
            rounded-lg "
            href={`/chess-games/${params.id}/update`}
          >
            update game entry
          </Link>
        </div>

        <section className="flex flex-col items-center">
          <h1 className="font-bold">
            {data.white} vs {data.black}
          </h1>
          <h2 className="font-bold">{data.opening}</h2>
          <div className="flex flex-col items-center gap-4 p-6 w-[70vw] min-w-[350px]">
            <Image
              alt={data.white}
              src={data.image_src}
              width={300}
              height={300}
              className=" border-green-800 border-4 rounded-2xl"
            />

            <p>game summary&#58; {data.summary}</p>
            <p>{data.pgn}</p>
            <p>Winner&#58; {data.winner}</p>
          </div>
        </section>
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Chess Game</h1>
          <ChessBoard pgn={data.pgn} />
        </div>
        <div className="flex flex-row items-center justify-center">
          <form
            action={handleSubmit}
            className="flex flex-col items-center bg-green-50 w-80 my-8 border-4 border-green-700 p-4 rounded-lg"
          >
            <p className="font-semibold m-4">Please leave a comment</p>
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
              className="hover:scale-110 ease-in-out transition-transform duration-300 font-bold bg-green-100 w-fit p-1 border-green-800 border-2
            rounded-lg my-4"
            >
              Send Comment
            </button>
          </form>
        </div>

        <section className="flex flex-col items-center ">
          {commentsData.map((comment) => (
            <div
              key={comment.id}
              className="flex flex-col items-center border-black border-2 w-96 m-4 p-4 rounded-lg"
            >
              <p>name&#58; {comment.username}</p>
              <p>comment&#58; {comment.comment}</p>
              <DeleteButton id={comment.id} handleDelete={handleDelete} />

              {/* <form>
              <button
                className="border-black border-1 bg-slate-300 text-rose-400 p-1 m-2 hover:bg-orange-800 hover:text-blue-200
          transition duration-300 ease-in-out"
              >
                delete
              </button>
            </form> */}
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
