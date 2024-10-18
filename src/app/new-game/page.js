import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function NewPostPage() {
  async function handleSubmit(formValues) {
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
      `INSERT INTO chess_games (white,black,opening,summary,pgn,winner,image_src) 
      VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [
        formData.white,
        formData.black,
        formData.opening,
        formData.summary,
        formData.pgn,
        formData.winner,
        formData.image_src,
      ]
    );

    revalidatePath("/chess-games");
    redirect("/chess-games");
  }

  return (
    <>
      <form action={handleSubmit} className="flex flex-col items-center">
        <label htmlFor="white">Player White </label>
        <input
          type="text"
          name="white"
          placeholder="enter white player"
          id="white"
          required
          className="text-orange-600 p-1"
        />
        <label htmlFor="black">Player Black </label>
        <input
          type="text"
          name="black"
          placeholder="enter black player"
          id="black"
          required
          className="text-orange-600 p-1"
        />
        <label htmlFor="opening">Opening </label>
        <input
          type="text"
          name="opening"
          placeholder="name of opening"
          id="opening"
          required
          className="text-orange-600 p-1"
        />
        <label htmlFor="summary">Game summary </label>
        <textarea
          type="text"
          name="summary"
          placeholder="summary of game"
          id="summary"
          required
          className="text-orange-600 p-1"
        />
        <label htmlFor="pgn">pgn </label>
        <textarea
          type="text"
          name="pgn"
          placeholder="pgn of game"
          id="pgn"
          required
          className="text-orange-600 p-1"
        />
        <label htmlFor="winner">Winner </label>
        <select className="text-orange-600 p-1" id="winner" name="winner">
          <option value="white">White</option>
          <option value="black">Black</option>
        </select>
        <label htmlFor="image_src">Image link </label>
        <input
          type="text"
          name="image_src"
          placeholder="enter an image link"
          id="image_src"
          required
          className="text-orange-600 p-1"
        />
        <button
          type="submit"
          className="border-rose-400 border-4 bg-yellow-400 text-rose-400 p-2 m-4 hover:bg-orange-800 hover:text-blue-200
          transition duration-300 ease-in-out"
        >
          Submit Game
        </button>
      </form>
    </>
  );
}
