import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AmountBurned from '../../components/AmountBurned';
import PulseInuBgImage from '../../components/PulseInuBgImage';
import StatisticData from '../../components/StatisticData';
import PulseInuDistribution from '../../components/PulseInuDistribution';
import { PulseInuPieChart } from '../../components/PulseInuPieChart';

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

const ContentDiv = styled.div`
  width: 940px;
  margin: auto;
  margin-top: 40px;
  padding-top: 10px;
  padding-bottom: 30px;
  background: #d7e0ff0d;
  border-radius: 30px;
  @media (max-width: 1044px) {
    width: 90%;
  }
`;

const DashboardTitle = styled.p`
  font-family: Poppins;
  font-size: 22px;
  font-weight: 400;
  line-height: 33px;
  letter-spacing: 0em;
  text-align: left;
  color: #696969;
  margin-left: 40px;
  margin-top: 20px;
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
  background: #4f30ff;
  box-shadow: 0px 0px 52px 0px rgba(204, 19, 236, 0.46);
  font-family: Poppins;
  font-size: 22px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0.02em;
  text-align: center;
  color: rgba(215, 224, 255, 1);
  text-transform: uppercase;
  margin-right: 20px;
  cursor: pointer;
  @media (max-width: 1044px) {
    margin-right: 0px;
  }
  @media (max-width: 500px) {
    width: 80%;
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
  const navigate = useNavigate();

  const navigateTo = (to) => {
    navigate(to);
  };

  return (
    <PageLayout>
      <ContentDiv>
        <DashboardTitle>
          Pulse Inu is a community built meme coin on Pulsechain.
          <br />
          Better pumpamentals than Doge or the original Shiba Inu.
        </DashboardTitle>
        <AmountBurned />
        <DashboardStakeDiv>
          <DashboardStakeTitle>Earn PLS Dividends Today!</DashboardStakeTitle>
          <DashboardStakeButton onClick={() => navigateTo('/stake')}>
            Stake Pulse Inu
          </DashboardStakeButton>
        </DashboardStakeDiv>
        <DashboardStatistics>
          <DashboardStatisticMarketDiv>
            <StatisticData title="TOTAL SUPPLY" amount="18.790T" unit equals="≈ $17,974,670" />
            <StatisticData
              title="MARKET CAP"
              amount="$14,876,730"
              amountDiff={{ '24h': 5.85, '72h': '-1.65' }}
            />
            <StatisticData
              title="PRICE"
              amount="$0.0000009566"
              amountDiff={{ '24h': 5.48, '72h': '-3.84' }}
            />
          </DashboardStatisticMarketDiv>
          <DashboardStatisticPaidAPYDiv>
            <StatisticData title="PLS Dividends Paid" amount="$1234,123123" />
          </DashboardStatisticPaidAPYDiv>
          <DashboardStatisticPaidAPYDiv>
            <StatisticData title="Current APY %" amount="$1234.00" />
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
                  amount="7,816,912,001,480"
                  equals="≈ $7,205,629"
                  color="#F60954"
                />
                <PulseInuDistribution
                  title="STAKES"
                  amount="3,242,024,673,941"
                  equals="≈ $2,998,549"
                  color="#D7E0FF"
                />
                <PulseInuDistribution
                  title="LIQUIDITY"
                  amount="15,552,952,310,300"
                  equals="≈ $14,336,711"
                  color="#3D83FD"
                />
              </DashboardPulseInuDistStatsDiv>
            </DashboardPulseInuDistDiv>
          </DashboardDistributionStatsDiv>
          <DashboardPulseInuDistPieChartDiv>
            <PulseInuPieChart />
          </DashboardPulseInuDistPieChartDiv>
        </DashboardDistribution>
      </ContentDiv>
    </PageLayout>
  );
}
