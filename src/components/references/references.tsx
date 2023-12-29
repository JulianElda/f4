import classes from "assets/styles/globals.module.css";

export default function References() {
  return (
    <div className="my-4">
      <h2 className={classes.header}>References</h2>
      <div className="card">
        <p>
          <a
            className="link star"
            href="https://docs.google.com/document/d/19CRphCuWdqvcS6I4HMoFSABTi1QrLQYCcIOJ2Sykbrw"
            target="_blank"
            rel="noreferrer">
            6.x Advanced Non-Standard BLM Guide
          </a>
        </p>
        <p>
          <a
            className="link star"
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
