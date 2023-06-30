import { ThemeProvider } from "styled-components";

const fontSizes: any = [14,18,20,96]
fontSizes.body = fontSizes[0]
fontSizes.bodyLarge = fontSizes[1]
fontSizes.ExtraLarge = fontSizes[2]
fontSizes.displayExtraLarge = fontSizes[3]

const primary = '#256784'
const secondary = '#F9B531'

const theme = {
  fontSizes,
  fonts:{
    primary: 'Haleway, sans-serif',
    secondary: 'Roboto, sans-serif',
  },
  colors: {
    primary, 
    secondary,
  },
};

interface Props{
  children: React.ReactNode
}

export type ThemeType = typeof theme;
export default theme;

export const Tema: React.FC<Props> = ({children}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}