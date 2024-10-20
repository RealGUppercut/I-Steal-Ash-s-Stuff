"use client";

export default function DeleteButton({ handleDelete, id }) {
  return (
    <>
      <form
        action={() => {
          handleDelete(id);
        }}
      >
        <button
          className="border-black border-1 bg-slate-300 text-rose-400 p-1 m-2 hover:bg-orange-800 hover:text-blue-200
          transition duration-300 ease-in-out"
        >
          delete
        </button>
      </form>
    </>
  );
}
