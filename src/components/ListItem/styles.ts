import styled, { css } from 'styled-components';

interface IListItemCssProps {
  enabled: boolean;
}

const Container = styled.div<IListItemCssProps>`
  display: flex;
  flex: 1;
  margin-top: 15px;
  background-color: #ffffff;
  border-radius: 15px;
  width: 100%;
  max-width: 720px;

  ${props =>
    !props.enabled &&
    css`
      pointer-events: none;
    `}

  button.deleteButton {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;

    background-color: transparent;
    color: #cc0033;
    border: none;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;

    @media (hover: hover) {
      transition: background-color 0.6s;

      &:hover {
        background-color: #cc0033;
        color: #ffffff;
      }
    }
  }

  @media (hover: hover) {
    transition: transform 0.2s;

    &:hover {
      transform: translatex(10px);
    }
  }
`;

export default Container;
