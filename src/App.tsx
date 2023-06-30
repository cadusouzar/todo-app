import { Rotas } from "routes";
import { Tema, GlobalStyles } from "themes";
import theme from "themes/theme";

export const App = () => {
  return (
    <Tema>
        <GlobalStyles theme={theme}/>
        <Rotas />
    </Tema>
  );
};
