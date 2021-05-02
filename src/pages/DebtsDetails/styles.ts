import styled, { css } from 'styled-components';

interface IListItemProps {
  enabled: boolean;
}

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #151c4e;
  top: 0;
  width: 100%;
  height: auto;

  padding: 30px;
  color: #ffffff;
  font-size: 30px;
  letter-spacing: -0.88px;

  h1 {
    flex: 1;
    justify-self: center;
  }

  a {
    display: flex;
    text-decoration: none;
    font-weight: bold;
    color: #fff;
    border: none;
    align-items: center;
    justify-content: center;

    @media (hover: hover) {
      transition: background-color 0.3s;

      &:hover {
        color: #0c9;
      }
    }
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;

  color: #ffff;

  strong {
    font-weight: bold;
    font-size: 32px;
  }
`;

export const DebtsList = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 25px 50px 25px 50px;
`;

export const ListItem = styled.div<IListItemProps>`
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

export const ListItemContent = styled.button`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  border: none;

  padding: 15px;
  background-color: transparent;
  strong {
    color: #333;
    font-weight: bold;
  }

  span {
    color: #777;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  strong + span {
    margin-left: 5px;
  }

  span + strong {
    margin-left: 20px;
  }

  div {
    display: flex;
    flex-direction: row;
    padding: 0;
  }
`;
