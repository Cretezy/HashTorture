import { css, Global } from "@emotion/react";
import React, { useState } from "react";
import { Menu } from "./Menu";
import { Game } from "./Game";

enum Screen {
  Menu = "Menu",
  Game = "Game",
}

export const App: React.FC = () => {
  const [screen, setScreen] = useState(Screen.Menu);

  return (
    <>
      <Global
        styles={css`
          @import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

          .js-focus-visible :focus:not([data-focus-visible-added]) {
            outline: none;
            box-shadow: none;
          }

          .translation a {
            color: var(--chakra-colors-blue-500);

            &:hover {
              text-decoration: underline;
            }

            &:active {
              color: var(--chakra-colors-blue-600);
            }
          }
        `}
      />

      {screen === Screen.Menu && <Menu onPlay={() => setScreen(Screen.Game)} />}
      {screen === Screen.Game && <Game />}
    </>
  );
};
