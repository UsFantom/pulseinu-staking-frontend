import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import BackImg from '../../assets/images/back.svg';

const NavigateBackButtonDiv = styled.div`
  width: 940px;
  margin: auto;
  margin-top: 40px;
  cursor: pointer;
  @media (max-width: 1044px) {
    width: 90%;
  }
`;

const BackImage = styled.img`
  width: 21px;
  height: 21px;
`;

const NavigateBackTitle = styled.h2`
  font-family: Poppins;
  font-size: 32px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0.02em;
  text-align: center;
  color: #4f30ff;
  display: inline-block;
  width: 919px;
  @media (max-width: 1044px) {
    width: Calc(90% - 21px);
  }
`;

export default function NavigateBack(props) {
  return (
    <NavigateBackButtonDiv>
      <Link to={props.navigateTo}>
        <BackImage src={BackImg} />
        <NavigateBackTitle>{props.title}</NavigateBackTitle>
      </Link>
    </NavigateBackButtonDiv>
  );
}
