import styled from "styled-components";

export const Form = styled.form`
  background-color: #F0F0F5;
  padding: 48px 40px;
  display: flex;
  flex-direction: column;

  h1 {
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
    margin-bottom: 40px;
    color: #333;
  }

  button {
    margin-top: 48px;
    align-self: flex-end;
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

  textarea{
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

  span{
    color: #333;
    margin-bottom: 5px;
  }

  button {
    font-weight: 600;
    border-radius: 8px;
    border: 0;
    background: #5CA753;
    color: #fff;

    display: flex;
    flex-direction: row;
    align-items: center;

    .text {
      padding: 16px 24px;
    }
  }
`;
