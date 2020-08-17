import styled from "styled-components"

export const HomeDiv = styled.div`
  display:flex;
  flex-flow:column nowrap;
  justify-content:space-between;
  align-items:center;
`;
export const Form = styled.form`
  display: flex;
  flex-flow: column;
  min-height:150px;
  width:100%;
  justify-content: space-between;
  align-items: center;
`;

export const MovieForm = styled.form`
  display: flex;
  flex-flow: column;
  min-height:60px;
  width:100%;
  justify-content: space-between;
  align-items: center;
`;
export const Input = styled.input`
  border:black;
  border-bottom: 1px solid red;
  min-height:20px;
  width:265px;
  background: black;
  color:white;
  outline:none;
`;
export const Button = styled.button`
  border: black;
  color: white;
  background: #094876;
  width: 20%;
  min-height:40px;
`;
export const Heading = styled.h1`
  color: white;
`;
export const Image = styled.img`
  max-width:200px;
  max-height:400px;
`;
export const Description = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content:space-between;
  align-items:center;
`;

export const Back = styled.button`
  background:#094876;
  color:white;
  border:black;
  width:80px;
  height:40px;
  margin-left:30px;
`;

export const LogoutDiv = styled.button`
  margin-top:20px;
  margin-left:55%;
  background:black;
  border:transparent;
`
export const RatingForm = styled.form`
  background:black;
  border:black;
  outline:none;
  width:50%;
  min-height:100px;
`;

export const StatusForm = styled.form`
  display:flex;
  flex-direction:column;
  align-items:flex-end;
  background:black;
  border:black;
  outline:none;
  width:50%;
  min-height:100px;
`;

export const Select = styled.select`
  background:black;
  border:black;
  border-bottom:1px solid red;
  outline:none;
  color:white;
`
export const RegisterDiv = styled.div`
  display:flex;
  align-items:center;
  min-height:400px;
  flex-flow:column nowrap;
  width:100%;
  justify-content:space-between;
`;

export const LoginDiv = styled.div`
  display:flex;
  align-items:center;
  flex-flow:column nowrap;
  justify-content:space-between;
  width:100%;
`;

export const ButtonDiv = styled.div`
  display:flex;
  flex-flow:row nowrap;
  align-items:flex-start;
  justify-content:space-between;
  min-height:60px;
  width:90%;
`;


export const Rating = styled.div`
  display: flex;
  flex-direction:row;
  min-height:100px;
  width:90%;
  justify-content:space-between;
  align-items:center;
 `;

export const Note = styled.div`
  height:30px;
`