import styled from '@emotion/styled';

export const ContactNameItem = styled.li`
  :not(:last-child) {
    margin-bottom: 10px;
  }
  padding-bottom: 2px;
  border-bottom: 1px solid #000;
`;
export const ContactTextWrap = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ContactNameText = styled.p`
  font-weight: 700;
`;
export const ContactNumberText = styled.p``;

// export const ContactListButtonsWrap = styled.div`
//   margin-top: 10px;
//   display: flex;
//   align-items: center;
//   justify-content: start;
// `;

export const ContactListButton = styled.button`
  margin-top: 5px;
  cursor: pointer;
  height: 20px;
  width: 60px;
  margin-left: 5px;
`;

export const Form = styled.form``;

export const FormInputWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const FormInputName = styled.input`
  width: 200px;
  font-size: 15px;
  font-weight: 700;
  /* border: none; */
  background-color: lightgray;
`;
export const FormInputNumber = styled.input`
  width: 95px;
  font-size: 15px;
  /* border: none; */
  background-color: lightgray;
`;
export const FormButton = styled.button`
  margin-top: 5px;
  cursor: pointer;
  height: 20px;
  width: 60px;
  margin-left: 5px;
`;
