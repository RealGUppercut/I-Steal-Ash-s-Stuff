import Image from "next/image";
import homeBackground from "@/../public/homeBackground.avif";
import styles from "@/app/homepage.module.css";

export default function HomePage() {
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
        <h1>A website about chess games</h1>
      </div>
    </>
  );
}
