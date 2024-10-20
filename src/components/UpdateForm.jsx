import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function UpdateForm({
  id,
  white,
  black,
  opening,
  summary,
  pgn,
  winner,
  image_src,
}) {
  async function handleUpdate(formValues) {
    "use server";

    const formData = {
      white: formValues.get("white"),
      black: formValues.get("black"),
      opening: formValues.get("opening"),
      summary: formValues.get("summary"),
      pgn: formValues.get("pgn"),
      winner: formValues.get("winner"),
      image_src: formValues.get("image_src"),
    };
    console.log(formData);

    await db.query(
      `UPDATE chess_games SET white = $1, black = $2, opening = $3, summary = $4, pgn = $5, winner = $6, image_src = $7 WHERE id = $8 RETURNING *`,
      [
        formData.white,
        formData.black,
        formData.opening,
        formData.summary,
        formData.pgn,
        formData.winner,
        formData.image_src,
        id,
      ]
    );

    revalidatePath(`/chess-games/${id}`);
    redirect(`/chess-games/${id}`);
  }

  return (
    <>
      <form
        action={handleUpdate}
        className="flex flex-col items-center bg-green-50 w-80 my-8 border-4 border-green-700 p-4 rounded-lg"
      >
        <label htmlFor="white">Player White </label>
        <input
          type="text"
          name="white"
          placeholder="enter white player"
          id="white"
          required
          className="text-orange-600 p-1"
          defaultValue={white}
        />
        <label htmlFor="black">Player Black </label>
        <input
          type="text"
          name="black"
          placeholder="enter black player"
          id="black"
          required
          className="text-orange-600 p-1"
          defaultValue={black}
        />
        <label htmlFor="opening">Opening </label>
        <input
          type="text"
          name="opening"
          placeholder="name of opening"
          id="opening"
          required
          className="text-orange-600 p-1"
          defaultValue={opening}
        />
        <label htmlFor="summary">Game summary </label>
        <textarea
          type="text"
          name="summary"
          placeholder="summary of game"
          id="summary"
          required
          className="text-orange-600 p-1"
          defaultValue={summary}
        />
        <label htmlFor="pgn">pgn </label>
        <textarea
          type="text"
          name="pgn"
          placeholder="pgn of game"
          id="pgn"
          className="text-orange-600 p-1"
          defaultValue={pgn}
        />
        <label htmlFor="winner">Winner </label>
        <select
          className="text-orange-600 p-1"
          id="winner"
          name="winner"
          defaultValue={winner}
        >
          <option value="white">White</option>
          <option value="black">Black</option>
        </select>
        <label htmlFor="image_src">Image link </label>
        <input
          type="text"
          name="image_src"
          placeholder="enter an image link"
          id="image_src"
          className="text-orange-600 p-1"
          defaultValue={image_src}
        />
        <button
          type="submit"
          className="border-green-800 border-4 bg-green-100 text-zinc-900 p-2 m-4 hover:bg-green-800 hover:text-green-50
          transition duration-300 ease-in-out rounded-lg"
        >
          Update Game
        </button>
      </form>
    </>
  );
}
