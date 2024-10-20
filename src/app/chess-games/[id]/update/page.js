import UpdateForm from "@/components/UpdateForm";
import { db } from "@/utils/dbConnection";
import Link from "next/link";
import homeBackground from "@/../public/homeBackground.avif";
import styles from "@/app/homepage.module.css";
import Image from "next/image";

export const metadata = {
  title: "The Chess Directory - Update game info",
  description: "update page",
};

export default async function UpdatePage({ params }) {
  const game = await db.query(
    `SELECT * FROM chess_games WHERE id=${params.id};`
  );
  const data = game.rows[0];
  console.log(data);

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
        <div className="mx-11">
          <h1 className="font-bold my-7">Update Form</h1>
          <Link
            className="hover:scale-110 ease-in-out transition-transform duration-300 font-bold bg-green-100 w-fit p-1.5 border-green-800 border-4
            rounded-lg "
            href={`/chess-games/${params.id}`}
          >
            go back ...
          </Link>
        </div>
        <div className="flex flex-row items-center justify-center">
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
        </div>
      </div>
    </>
  );
}
