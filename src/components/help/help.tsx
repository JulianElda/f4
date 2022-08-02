export default function Help() {
  return (
    <div className="my-4">
      <label className="font-semibold">Help!</label>
      <div className="text-sm bg-white shadow rounded space-y-1 mt-1 p-2">
        <p className="{text-sm underline decoration-dotted hover:decoration-solid cursor-pointer px-2}">
          <a
            href="https://github.com/JulianElda/f4"
            target="_blank"
            rel="noreferrer">
            Check the readme
          </a>
        </p>
      </div>
    </div>
  );
}
