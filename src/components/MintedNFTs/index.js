import React, { useRef } from 'react';
import styled from 'styled-components';
import { useDraggable } from 'react-use-draggable-scroll';

import { useBoostNftTotalSupply } from '../../queries/useBoostNft';
import { formatNumber } from '../../utils/utils';

const MintedNFTsDiv = styled.div`
  justify-content: center;
  margin-bottom: 150px;
  padding-bottom: 20px;
  display: flex;
  position: relative;
  width: 100%;
  height: 270px;
  overflow-x: auto;
  background-image: linear-gradient(to right, rgba(255, 0, 0, 0), transparent, rgba(255, 0, 0, 0));
  &::-webkit-scrollbar {
    height: 5px;
  }
  /* Track */
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #696969;
    border-radius: 10px;
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #4f30ff;
  }
`;

const MintedNFTsItemDiv = styled.div`
  width: 200px;
  height: 244px;
  margin: 0px 10px 0px 10px;
`;

const MintedNFTsImgDiv = styled.div`
  width: 200px;
  height: 200px;
  background: #d7e0ff0d;
  border-radius: 30px;
  position: relative;
`;

const NFTImgWrap = styled.div`
  width: 140px;
  height: 134px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NFTImg = styled.img`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const MintedAmount = styled.p`
  font-family: Poppins;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: center;
  color: ${(props) => props.color};
`;

export default function MintedNFTs(props) {
  const ref = useRef();
  const { events } = useDraggable(ref);

  const boostNftTotalSupply = useBoostNftTotalSupply(props.updateTime);
  return (
    <MintedNFTsDiv {...events} ref={ref}>
      {boostNftTotalSupply.data &&
        boostNftTotalSupply.data.map((item, index) => (
          <MintedNFTsItemDiv key={index}>
            <MintedNFTsImgDiv>
              <NFTImgWrap>
                <NFTImg
                  src={`https://ipfs.io/ipfs/bafybeihvawd7ex253yfe4dwtae7gjajaxjkhk6lh3qgxlzihkkay3q5y3q/${
                    ((item.id - 1) % 10000) + 1
                  }.gif`}
                  width="140"
                  height="134"
                />
              </NFTImgWrap>
            </MintedNFTsImgDiv>
            <MintedAmount color="#696969">{`${formatNumber(item.price)} PINU`}</MintedAmount>
          </MintedNFTsItemDiv>
        ))}
    </MintedNFTsDiv>
  );
}
