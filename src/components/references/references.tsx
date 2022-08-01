export default function References() {
  const URL_STYLE: string =
    "text-sm underline decoration-dotted hover:decoration-solid cursor-pointer";
  return (
    <div className="my-4">
      <label className="font-semibold">References</label>
      <p className={URL_STYLE}>
        <a
          href="https://docs.google.com/document/d/19CRphCuWdqvcS6I4HMoFSABTi1QrLQYCcIOJ2Sykbrw"
          target="_blank"
          rel="noreferrer">
          6.x Advanced Non-Standard BLM Guide
        </a>
      </p>
      <p className={URL_STYLE}>
        <a
          href="https://docs.google.com/spreadsheets/d/1K57e7zFoCuLDLX2kbCAlRBrJO6LS42ifz7e5DQEPn8E"
          target="_blank"
          rel="noreferrer">
          6.X BLM lines comparison sheet
        </a>
      </p>
    </div>
  );
}
