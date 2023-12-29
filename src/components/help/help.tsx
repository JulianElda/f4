import classes from "assets/styles/globals.module.css";

export default function Help() {
  return (
    <div className="my-4">
      <h2 className={classes.header}>Help!</h2>
      <div className="card">
        <p>
          <a
            className="link star"
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
