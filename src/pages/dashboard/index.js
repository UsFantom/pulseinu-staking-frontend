import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/Header';
import AmountBurned from '../../components/AmountBurned';
import PulseInuBgImage from '../../components/PulseInuBgImage';
import StatisticData from '../../components/StatisticData';
import PulseInuDistribution from '../../components/PulseInuDistribution';
import { PulseInuPieChart } from '../../components/PulseInuPieChart';
import {
  useGetPinuPriceOfPls,
  useGetPlsPriceOfUsd,
  useStakingTokenBurnedAmount,
  useStakingTokenTotalSupply,
  useStakingTotalReward,
  useStakingTotalStaked
} from '../../queries/useStaking';
import { LoadableContent } from '../../components/Custom/LoadableContent';
import { formatBigNumber, formatNumber, formatSmallNumber, isValidValue } from '../../utils/utils';
import InuBgImage from '../../assets/images/Inu.png';

const PageLayout = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, 1);
  background-image: linear-gradient(
    202.01deg,
    rgba(204, 19, 236, 0.26) 4.29%,
    rgba(0, 0, 0, 0.26) 43.63%,
    rgba(0, 181, 255, 0.1664) 97.51%
  );
  overflow-y: auto;
`;

const InuBgImg = styled.img`
  position: absolute;
  top: 0px;
  right: 0px;
`;

const ContentDiv = styled.div`
  position: relative;
  z-index: 1;
  width: 940px;
  margin: auto;
  margin-top: 40px;
  padding-top: 10px;
  padding-bottom: 30px;
  // background: #d7e0ff0d;
  // border-radius: 30px;
  @media (max-width: 1044px) {
    width: 90%;
  }
`;

const DashboardTitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 1044px) {
    flex-direction: column;
  }
`;

const DashboardTitle = styled.div`
  width: 60%;
  margin-bottom: 40px;
  @media (max-width: 1044px) {
    width: 100%;
  }
`;

const DashboardTitleH = styled.h1`
  font-family: Poppins;
  font-size: 52px;
  font-weight: 700;
  line-height: 78px;
  letter-spacing: 0em;
  text-align: left;
  color: #d7e0ff;
  margin-left: 20px;
  margin-top: 0px;
  margin-bottom: 5px;
  @media (max-width: 1044px) {
    text-align: center;
  }
`;

const DashboardTitleContentDiv = styled.div`
  margin-bottom: 40px;
  width: 40%;
  @media (max-width: 1044px) {
    width: 100%;
  }
`;

// const DashboardTitleContent1 = styled.p`
//   font-family: Poppins;
//   font-size: 18px;
//   font-weight: 400;
//   line-height: 33px;
//   text-align: center;
//   letter-spacing: 0em;
//   color: #696969;
//   margin-left: 0px;
//   margin-top: 0px;
//   margin-bottom: 5px;
// `;

const DashboardTitleContent = styled.p`
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  background: var(--lux, linear-gradient(97deg, #d7e0ff 28.37%, rgba(215, 224, 255, 0) 113.3%));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const DashboardTitleMiddleContent = styled.p`
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  background: linear-gradient(264deg, #d7e0ff 51.42%, rgba(215, 224, 255, 0) 111.49%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const DashboardStakeDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  @media (max-width: 1044px) {
    flex-direction: column;
  }
`;

const DashboardStakeTitle = styled.h1`
  font-family: Poppins;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-align: center;
  background: linear-gradient(90deg, #d7e0ff 0%, rgba(215, 224, 255, 0) 126.92%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-left: 20px;
  @media (max-width: 1044px) {
    margin-left: 0px;
  }
`;

const DashboardStakeButton = styled.button`
  width: 350px;
  height: 50px;
  border-radius: 100px;
  font-family: Poppins;
  font-size: 22px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0.02em;
  text-align: center;
  text-transform: uppercase;
  margin-right: 20px;
  box-shadow: 0px 0px 52px 0px #cc13ec75;
  linear-gradient(0deg, #ffffff, #ffffff);
  cursor: ${(props) =>
    props.disabled !== undefined && props.disabled === true ? 'not-allowed' : 'pointer'};
  color: ${(props) =>
    props.disabled !== undefined && props.disabled === true ? '#696969' : '#d7e0ff'};
  border: ${(props) =>
    props.disabled !== undefined && props.disabled === true ? '1px solid #696969' : 'none'};
  background: ${(props) =>
    props.disabled !== undefined && props.disabled === true
      ? 'transparent'
      : 'radial-gradient(farthest-corner at -17% 291%,#00e8fc 0%,#4f30ff 60%,#f00f8e 95%,#ff0000 100%),linear-gradient(0deg, #ffffff, #ffffff)'};
  @media (max-width: 1044px) {
    margin-right: 0px;
  }
  @media (max-width: 500px) {
    width: 80%;
  }
  &:active {
    border: 0.5px solid var(--line-fill, #413FFF);
    background: linear-gradient(270deg, rgba(252, 0, 33, 0.10) 0%, rgba(79, 48, 255, 0.10) 52.08%, rgba(240, 15, 142, 0.10) 100%);; 
  }
`;

const DashboardStatistics = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px 20px 20px;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const DashboardStatisticDiv = styled.div`
  height: 115px;
  background: #d7e0ff0d;
  border-radius: 30px;
  @media (max-width: 900px) {
    height: auto;
  }
`;

const DashboardStatisticMarketDiv = styled(DashboardStatisticDiv)`
  display: flex;
  justify-content: space-evenly;
  width: 56%;
  background: #d7e0ff0d;
  @media (max-width: 900px) {
    width: 90%;
    margin-bottom: 20px;
    padding: 20px;
  }
  @media (max-width: 650px) {
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
`;

const DashboardStatisticPaidAPYDiv = styled(DashboardStatisticDiv)`
  width: 20%;
  display: flex;
  justify-content: space-evenly;
  @media (max-width: 900px) {
    width: 90%;
    margin-bottom: 20px;
    padding: 20px;
  }
`;

const DashboardDistribution = styled.div`
  position: relative;
  width: 96%;
  border-radius: 30px;
  background: #d7e0ff0d;
  margin-left: 2%;
  overflow: hidden;
  display: flex;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const DashboardDistributionStatsDiv = styled.div`
  width: 70%;
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const DashboardPulseInuDistTitle = styled.h2`
  font-family: Poppins;
  font-size: 22px;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: 0.02em;
  text-align: left;
  background: linear-gradient(0deg, #696969, #696969),
    linear-gradient(90deg, #d7e0ff 0%, rgba(215, 224, 255, 0) 126.92%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  margin: 20px;
  @media (max-width: 900px) {
    text-align: center;
  }
`;

const DashboardPulseInuDistDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const DashboardPulseInuDistStatsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0px 20px 0px 20px;
  @media (max-width: 650px) {
    flex-direction: column;
    align-items: center;
  }
`;

const DashboardPulseInuDistPieChartDiv = styled.div`
  width: 30%;
  @media (max-width: 650px) {
    width: 100%;
  }
`;

export default function Dashboard() {
  const stakingTokenTotalSupplyQuery = useStakingTokenTotalSupply();

  const stakingTokenBurnedAmountQuery = useStakingTokenBurnedAmount();

  const stakingTotalRewardQuery = useStakingTotalReward();

  const stakingTotalStakedQuery = useStakingTotalStaked();

  const navigate = useNavigate();

  const navigateTo = (to) => {
    navigate(to);
  };

  const [chartData, setChartData] = useState(null);

  const generateChartData = () => {
    const chart = [
      {
        label: 'Liquid',
        percent:
          (stakingTokenTotalSupplyQuery.data -
            stakingTotalStakedQuery.data -
            stakingTokenBurnedAmountQuery.data) /
          stakingTokenTotalSupplyQuery.data,
        fill: 'url(#paint0_linear_91_230)'
      },
      {
        label: 'Stakes',
        percent: stakingTotalStakedQuery.data / stakingTokenTotalSupplyQuery.data,
        fill: 'rgb(20, 48, 62)'
      },
      {
        label: 'Burns',
        percent: stakingTokenBurnedAmountQuery.data / stakingTokenTotalSupplyQuery.data,
        fill: 'url(#paint0_radial_91_232)'
      }
    ];
    return chart;
  };

  useEffect(() => {
    if (
      isValidValue(stakingTokenTotalSupplyQuery.data) &&
      isValidValue(stakingTokenBurnedAmountQuery.data) &&
      isValidValue(stakingTotalStakedQuery.data)
    ) {
      setChartData(generateChartData());
    }
  }, [
    stakingTokenTotalSupplyQuery.data,
    stakingTokenBurnedAmountQuery.data,
    stakingTotalStakedQuery.data
  ]);

  const plsPriceOfUsdQuery = useGetPlsPriceOfUsd();
  const pinuPriceOfPls = useGetPinuPriceOfPls();

  return (
    <PageLayout>
      <ContentDiv>
        <Header />
        <DashboardTitleDiv>
          <DashboardTitle>
            <DashboardTitleH>Shiba Inu</DashboardTitleH>
            <DashboardTitleH>Ecosystem Reborn</DashboardTitleH>
            <DashboardTitleH>on Pulse Chain</DashboardTitleH>
          </DashboardTitle>
          <DashboardTitleContentDiv>
            <DashboardTitleContent>
              Pulse Inu is a community meme coin on Pulsechain.
            </DashboardTitleContent>
            <DashboardTitleMiddleContent>
              Better pumpamentals than the original Shiba Inu.
            </DashboardTitleMiddleContent>
            <DashboardTitleContent>Buy, stake or burn Pulse Inu for NFTs.</DashboardTitleContent>
          </DashboardTitleContentDiv>
        </DashboardTitleDiv>
        <AmountBurned />
        <DashboardStakeDiv>
          <DashboardStakeTitle>Earn PLS Dividends Today!</DashboardStakeTitle>
          <DashboardStakeButton onClick={() => navigateTo('/stake')} disabled={false}>
            Stake Pulse Inu
          </DashboardStakeButton>
        </DashboardStakeDiv>
        <DashboardStatistics>
          <DashboardStatisticMarketDiv>
            <LoadableContent query={stakingTokenTotalSupplyQuery} fallback={null}>
              {() => (
                <StatisticData
                  title="TOTAL SUPPLY"
                  amount={`${formatBigNumber(stakingTokenTotalSupplyQuery.data)}`}
                  unit
                  equals={`≈ $${formatNumber(
                    stakingTokenTotalSupplyQuery.data *
                      pinuPriceOfPls.data *
                      plsPriceOfUsdQuery.data
                  )}`}
                />
              )}
            </LoadableContent>
            <StatisticData
              title="MARKET CAP"
              amount={`$${formatNumber(
                (stakingTokenTotalSupplyQuery.data -
                  stakingTotalStakedQuery.data -
                  stakingTokenBurnedAmountQuery.data) *
                  pinuPriceOfPls.data *
                  plsPriceOfUsdQuery.data
              )}`}
              amountDiff={{ '24h': 5.85, '72h': '-1.65' }}
            />
            <StatisticData
              title="PRICE"
              amount={`$${formatSmallNumber(pinuPriceOfPls.data * plsPriceOfUsdQuery.data)}`}
              amountDiff={{ '24h': 5.48, '72h': '-3.84' }}
            />
          </DashboardStatisticMarketDiv>
          <DashboardStatisticPaidAPYDiv>
            <StatisticData
              title="PLS Dividends Paid"
              amount={`${formatNumber(stakingTotalRewardQuery.data)}`}
              unit
              symbol={'PLS'}
              equals={`≈ $${formatNumber(stakingTotalRewardQuery.data * plsPriceOfUsdQuery.data)}`}
            />
          </DashboardStatisticPaidAPYDiv>
          <DashboardStatisticPaidAPYDiv>
            <StatisticData
              title="Current APY %"
              amount={`${formatNumber(
                ((stakingTotalRewardQuery.data * plsPriceOfUsdQuery.data) /
                  (stakingTotalStakedQuery.data * pinuPriceOfPls.data * plsPriceOfUsdQuery.data)) *
                  100
              )}`}
            />
          </DashboardStatisticPaidAPYDiv>
        </DashboardStatistics>
        <DashboardDistribution>
          <PulseInuBgImage />
          <DashboardDistributionStatsDiv>
            <DashboardPulseInuDistTitle>Pulse Inu Distribution</DashboardPulseInuDistTitle>
            <DashboardPulseInuDistDiv>
              <DashboardPulseInuDistStatsDiv>
                <PulseInuDistribution
                  title="BURNS"
                  amount={`${formatBigNumber(stakingTokenBurnedAmountQuery.data)}`}
                  equals={`≈ $${formatNumber(
                    stakingTokenBurnedAmountQuery.data *
                      pinuPriceOfPls.data *
                      plsPriceOfUsdQuery.data
                  )}`}
                  color="#F60954"
                />
                <PulseInuDistribution
                  title="STAKES"
                  amount={`${formatBigNumber(stakingTotalStakedQuery.data)}`}
                  equals={`≈ $${formatNumber(
                    stakingTotalStakedQuery.data * pinuPriceOfPls.data * plsPriceOfUsdQuery.data
                  )}`}
                  color="#D7E0FF"
                />
                <PulseInuDistribution
                  title="LIQUIDITY"
                  amount={formatBigNumber(
                    stakingTokenTotalSupplyQuery.data -
                      stakingTotalStakedQuery.data -
                      stakingTokenBurnedAmountQuery.data
                  )}
                  equals={`≈ $${formatNumber(
                    (stakingTokenTotalSupplyQuery.data -
                      stakingTotalStakedQuery.data -
                      stakingTokenBurnedAmountQuery.data) *
                      pinuPriceOfPls.data *
                      plsPriceOfUsdQuery.data
                  )}`}
                  color="#3D83FD"
                />
              </DashboardPulseInuDistStatsDiv>
            </DashboardPulseInuDistDiv>
          </DashboardDistributionStatsDiv>
          <DashboardPulseInuDistPieChartDiv>
            {chartData && <PulseInuPieChart data={chartData} />}
          </DashboardPulseInuDistPieChartDiv>
        </DashboardDistribution>
      </ContentDiv>
      <InuBgImg src={InuBgImage} />
    </PageLayout>
  );
}
