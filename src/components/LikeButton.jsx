"use client";
import Image from "next/image";
import likeButton from "@/../public/like-button.png";

export default function LikeButton({ id, handleLike }) {
  return (
    <>
      <Image
        onClick={() => {
          handleLike(id);
        }}
        alt="like-button"
        src={likeButton}
        width={50}
        className="hover:scale-110 ease-in-out transition-transform duration-300 cursor-pointer"
      />
    </>
  );
}
