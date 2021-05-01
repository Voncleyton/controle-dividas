import styled, { css } from 'styled-components';

interface IFormProps {
  buttonsEnabled: boolean;
}

const Form = styled.form<IFormProps>`
  background-color: #f0f0f5;
  padding: 48px 40px;
  display: flex;
  flex-direction: column;

  ${props =>
    !props.buttonsEnabled &&
    css`
      pointer-events: none;
    `}

  h1 {
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
    margin-bottom: 40px;
    color: #333;
  }

  select {
    background: #fff;
    border-radius: 8px;
    width: 100%;
    height: 40px;
    font-size: 16px;
    padding: 10px;
    border: none;

    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  textarea {
    resize: none;
    background: #fff;
    border-radius: 8px;
    width: 100%;
    font-size: 16px;
    min-height: 100px;
    padding: 10px;
    border: none;
  }

  input {
    background: #fff;
    border-radius: 8px;
    width: 100%;
    font-size: 16px;
    height: 40px;
    outline: none;
    padding: 5px;
    border: none;
  }

  span {
    color: #333;
    margin-bottom: 5px;
  }

  .buttonsContainer {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  button {
    margin-top: 48px;
    //align-self: flex-end;
    font-weight: 600;
    border-radius: 8px;
    border: 0;
    color: #fff;
    min-width: 170px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .text {
      padding: 16px 24px;
    }
  }

  .addButton {
    background: #5ca753;
  }

  .cancelButton {
    background: #cc0033;
  }
`;

export default Form;
