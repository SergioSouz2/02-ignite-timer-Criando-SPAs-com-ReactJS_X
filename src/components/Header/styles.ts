import styled from "styled-components";


export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* Mobile Screens */
  @media (max-width: 600px) {
    padding: 1rem;
  }

  img {
      width: 3rem;
      height: 3rem;
  }

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;

      display: flex;
      justify-content: center;
      align-items: center;

      color: ${(props) => props.theme['gray-100']};

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      /* transition: border 0.2s; */

      &:hover {
        border-bottom: 3px solid ${(props) => props.theme['green-500']};
      }

      &.active {
        color: ${(props) => props.theme['green-500']};
      }
    }
  }
`;