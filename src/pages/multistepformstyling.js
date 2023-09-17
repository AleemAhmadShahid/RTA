import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 15;
  display: flex;
  
  // flex-direction: column; /* To stack child components vertically */
  
`;

export const ModalContainer = styled.div`
  background-color: #fff;
  padding: 0px 0px;
  border-radius: 0px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

export const InnermodalContainer = styled.div`
  background-color: #fff;
  padding: 17px 30px;
  border-radius: 0px;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 19px 30px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-end; 
  position: absolute; 
  top: 0; 
  right: 0; 
  height: 100%;
`;


export const FormStep = styled.div`
  display: ${props => (props.active ? 'block' : 'none')};
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size:small;
  
`;

export const FormInput = styled.input`

  width: 95%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  
`;

export const FormHalfInput = styled.input`
   flex: 1; /* Make the input fields flexible to cover available space */
  padding: 5px;
  width: 95%;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;


export const FormButton = styled.button`
  background-color: #ffa500;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 20px; 
  font-size: small;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff8000;
  }
`;
export const FormRadioGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormRadioLabel = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
`;

export const FormRadioInput = styled.input`
  margin-right: 5px;
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 9px;
`;
