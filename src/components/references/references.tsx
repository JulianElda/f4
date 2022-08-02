export default function References() {
  return (
    <div className="my-4">
      <label className="font-semibold">References</label>
      <div className="text-sm bg-white shadow rounded space-y-1 mt-1 p-2">
        <p className="text-sm underline decoration-dotted hover:decoration-solid cursor-pointer">
          <a
            href="https://docs.google.com/document/d/19CRphCuWdqvcS6I4HMoFSABTi1QrLQYCcIOJ2Sykbrw"
            target="_blank"
            rel="noreferrer">
            6.x Advanced Non-Standard BLM Guide
          </a>
        </p>
        <p className="{text-sm underline decoration-dotted hover:decoration-solid cursor-pointer">
          <a
            href="https://docs.google.com/spreadsheets/d/1K57e7zFoCuLDLX2kbCAlRBrJO6LS42ifz7e5DQEPn8E"
            target="_blank"
            rel="noreferrer">
            6.X BLM lines comparison sheet
          </a>
        </p>
      </div>
    </div>
  );
}
