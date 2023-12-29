import { faLightbulb, faMoon } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Footer() {
  if (localStorage["theme"] === "dark")
    document.documentElement.classList.add("dark");

  const [isDarkTheme, setDarkTheme] = useState(
    localStorage["theme"] === "dark"
  );

  const changeTheme = () => {
    if (localStorage["theme"] !== "dark") {
      localStorage["theme"] = "dark";
      document.documentElement.classList.add("dark");
      setDarkTheme(true);
    } else {
      localStorage.removeItem("theme");
      document.documentElement.classList.remove("dark");
      setDarkTheme(false);
    }
  };

  const getFooterContent = () => {
    if (isDarkTheme) {
      return (
        <div className="block h-6 w-6 cursor-pointer rounded-md border border-gray-100 bg-white text-gray-900">
          <FontAwesomeIcon
            icon={faLightbulb}
            aria-hidden={true}
            fixedWidth={true}
            onClick={changeTheme}
          />
        </div>
      );
    } else
      return (
        <div className="block h-6 w-6 cursor-pointer rounded-md border border-gray-700 bg-slate-700 text-white">
          <FontAwesomeIcon
            icon={faMoon}
            aria-hidden={true}
            fixedWidth={true}
            onClick={changeTheme}
          />
        </div>
      );
  };

  return (
    <footer className="max-w-4xl bg-gray-50 p-2 text-base sm:fixed sm:bottom-0 sm:left-0 sm:right-0 sm:mx-auto sm:h-10 dark:bg-gray-800">
      <div className="flex">
        {getFooterContent()}
        <div className="flex-1 text-end">
          <a
            className="link star"
            href="https://github.com/JulianElda/f4"
            target="_blank"
            rel="noreferrer">
            Julius Polar@GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
