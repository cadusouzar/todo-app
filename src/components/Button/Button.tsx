import { styled } from "styled-components";
import { SpaceProps, space, variant } from "styled-system";

type ButtonProps = SpaceProps & {
  variant?: string
}

export const Button = styled.button<ButtonProps>`
  padding: 10px 20px;
  background-color: transparent;
  cursor: pointer;

  ${variant({
    variants:{
      default:{
        backgroundColor: 'transparent',
        color: '#fff',
        borderBottom: '2px solid rgba(255,255,255,0.2)',

      },
      primary:{
        padding: '10px 70px',
        borderRadius: "4px",
        backgroundColor: '#fff',
        boxShadow: '3px 2px 2px rgba(0,0,0,0.85)',
      }
    }
  })}
  ${space}
`

Button.defaultProps = {
  variant: 'default'
}