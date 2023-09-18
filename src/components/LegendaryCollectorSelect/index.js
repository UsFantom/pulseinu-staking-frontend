import React from 'react';
import styled from 'styled-components';

import LegendaryImage from '../../assets/images/legendary.png';
import CollectorImage from '../../assets/images/collector.png';
import { useBoostNftTokenTypesPrices } from '../../queries/useBoostNft';
import { formatNumber } from '../../utils/utils';

const LegendaryCollectorSelectDiv = styled.div`
  width: 940px;
  margin: auto;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1044px) {
    flex-direction: column;
    width: 87%;
  }
`;

const SelectItemDiv = styled.div`
  width: 48%;
  display: flex;
  background-color: ${(props) => props.bgcolor};
  border-radius: 30px;
  cursor: pointer;
  @media (max-width: 1044px) {
    width: 80%;
  }
  @media (max-width: 650px) {
    flex-direction: column;
    align-items: center;
  }
  margin-bottom: 40px;
`;

const NFTImageDiv = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 30px;
  background: ${(props) =>
    props.bgcolor !== undefined
      ? props.bgcolor
      : 'linear-gradient( 315deg, rgba(252, 0, 33, 0.2) 0%, rgba(79, 48, 255, 0.2) 52.08%, rgba(240, 15, 142, 0.2) 100%  )'};
`;

const NFTImgWrap = styled.div`
  width: 140px;
  height: 134px;
  margin: auto;
  margin-top: 10px;
  position: relative;
`;

const NFTImg = styled.img`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NFTAmount = styled.p`
  font-family: Poppins;
  font-size: 20px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0.02em;
  text-align: center;
  color: ${(props) => (props.color !== undefined ? props.color : '#4f30ff')};
  margin-top: 0px;
`;

const NFTDetailDiv = styled.div`
  width: Calc(100% - 230px);
  margin: 0px 15px 0px 15px;
  @media (max-width: 1044px) {
    width: 80%;
    margin-bottom: 15px;
  }
`;

const NFTDetailTitle = styled.p`
  font-family: Poppins;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: 0.02em;
  text-align: left;
  color: ${(props) => (props.color !== undefined ? props.color : 'none')};
  background: ${(props) =>
    props.color !== undefined
      ? 'none'
      : 'linear-gradient(271.81deg, #fc0021 -3.55%, #4f30ff 47.6%, #f00f8e 103.49%), linear-gradient(0deg, #ffffff, #ffffff)'};
  -webkit-background-clip: ${(props) => (props.color !== undefined ? 'none' : 'text')};
  -webkit-text-fill-color: ${(props) => (props.color !== undefined ? 'none' : 'transparent')};
  text-transform: uppercase;
`;

const NFTDetailContent = styled.p`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.05em;
  text-align: left;
  color: ${(props) => (props.color !== undefined ? props.color : 'none')};
  background: ${(props) =>
    props.color !== undefined
      ? 'none'
      : 'linear-gradient( 111.84deg, #413fff -40.16%, #00e8ff 7.38%, #e916cb 71.33%, rgba(0, 0, 0, 0) 201.85% )'};
  -webkit-background-clip: ${(props) => (props.color !== undefined ? 'none' : 'text')};
  -webkit-text-fill-color: ${(props) => (props.color !== undefined ? 'none' : 'transparent')};
  text-transform: uppercase;
`;

export default function LegendaryCollectorSelect(props) {
  const boostNftTokenTypesPricesQuery = useBoostNftTokenTypesPrices();
  console.log(boostNftTokenTypesPricesQuery);

  return (
    <LegendaryCollectorSelectDiv>
      {props.selected === 0 ? (
        <SelectItemDiv bgcolor="#4F30FF" onClick={() => props.setSelected(null)}>
          <NFTImageDiv bgcolor="transparent">
            <NFTImgWrap>
              <NFTImg src={LegendaryImage} width="140" height="134" />
            </NFTImgWrap>
            <NFTAmount color="#D7E0FF">
              {boostNftTokenTypesPricesQuery.data
                ? boostNftTokenTypesPricesQuery.data[0].toString()
                : '-'}
            </NFTAmount>
          </NFTImageDiv>
          <NFTDetailDiv>
            <NFTDetailTitle color="#D7E0FF">Legendary</NFTDetailTitle>
            <NFTDetailContent color="#D7E0FF">
              Earn a 10% Yield boost on staking potential future yield opportunities
            </NFTDetailContent>
          </NFTDetailDiv>
        </SelectItemDiv>
      ) : (
        <SelectItemDiv onClick={() => props.setSelected(0)}>
          <NFTImageDiv>
            <NFTImgWrap>
              <NFTImg src={LegendaryImage} width="140" height="134" />
            </NFTImgWrap>
            <NFTAmount>{formatNumber(boostNftTokenTypesPricesQuery.data?.[0])}</NFTAmount>
          </NFTImageDiv>
          <NFTDetailDiv>
            <NFTDetailTitle>Legendary</NFTDetailTitle>
            <NFTDetailContent>
              Earn a 10% Yield boost on staking potential future yield opportunities
            </NFTDetailContent>
          </NFTDetailDiv>
        </SelectItemDiv>
      )}
      {props.selected === 1 ? (
        <SelectItemDiv bgcolor="#4F30FF" onClick={() => props.setSelected(null)}>
          <NFTImageDiv bgcolor="transparent">
            <NFTImgWrap>
              <NFTImg src={CollectorImage} width="108" height="98" />
            </NFTImgWrap>
            <NFTAmount color="#D7E0FF">
              {boostNftTokenTypesPricesQuery.data
                ? boostNftTokenTypesPricesQuery.data?.[1].toString()
                : '-'}
            </NFTAmount>
          </NFTImageDiv>
          <NFTDetailDiv>
            <NFTDetailTitle color="#D7E0FF">Collector</NFTDetailTitle>
            <NFTDetailContent color="#D7E0FF">Earn a 10% Yield boost on staking</NFTDetailContent>
          </NFTDetailDiv>
        </SelectItemDiv>
      ) : (
        <SelectItemDiv onClick={() => props.setSelected(1)}>
          <NFTImageDiv bgcolor="#D7E0FF0D">
            <NFTImgWrap>
              <NFTImg src={CollectorImage} width="108" height="98" />
            </NFTImgWrap>
            <NFTAmount color="#D7E0FF">
              {formatNumber(boostNftTokenTypesPricesQuery.data?.[1])}
            </NFTAmount>
          </NFTImageDiv>
          <NFTDetailDiv>
            <NFTDetailTitle color="#D7E0FF">Collector</NFTDetailTitle>
            <NFTDetailContent color="#696969">Earn a 10% Yield boost on staking</NFTDetailContent>
          </NFTDetailDiv>
        </SelectItemDiv>
      )}
    </LegendaryCollectorSelectDiv>
  );
}
