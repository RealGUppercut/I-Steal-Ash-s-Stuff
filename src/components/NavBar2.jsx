"use client";
import { useState } from "react";

import Link from "next/link";
import Tab from "./Tab";
import Cursor from "./Cursor";

export default function NavBar2() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <>
      <ul
        onMouseLeave={() => {
          setPosition((pv) => ({ ...pv, opacity: 0 }));
        }}
        className="relative mx-auto flex w-fit rounded-full border-0 border-black bg-white p-1"
      >
        <Tab setPosition={setPosition}>
          <Link className="text-1xl" href="/">
            Home
          </Link>
        </Tab>
        <Tab setPosition={setPosition}>
          <Link className="text-1xl" href="/chess-games">
            chess games
          </Link>
        </Tab>

        <Tab setPosition={setPosition}>
          <Link className="text-1xl" href="/new-game">
            add new game
          </Link>
        </Tab>

        <Cursor position={position} />
      </ul>
    </>
  );
}
