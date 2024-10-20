import Link from "next/link";

export default function NavBar() {
  return (
    <>
      <nav className="flex flex-row align gap-8 items-center bg-amber-300 p-4 justify-center border-r shadow-">
        <Link href="/">Home</Link>
        <Link href="/chess-games">chess games</Link>

        <Link href="/new-game">add new game</Link>
      </nav>
    </>
  );
}
