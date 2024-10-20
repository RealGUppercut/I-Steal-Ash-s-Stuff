"use client";
import ChessAnalysisBoard from "react-chess-analysis-board";
import { useEffect } from "react";
export default function ChessBoard({ pgn }) {
  return (
    <>
      <div className="flex flex-col items-center border-solid border-blue-600 border-2 overflow-scroll">
        <ChessAnalysisBoard pgnString={pgn} boardWidth={200} />
      </div>
    </>
  );
}
