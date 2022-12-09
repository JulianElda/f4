import classes from "assets/styles/globals.module.css";

export default function Help() {
  return (
    <div className="my-4">
      <label className="font-semibold">Help!</label>
      <div className={classes.card}>
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
