import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import PULSEINULOGO from '../../assets/images/pulseinulogo.svg';
import { formatNumber } from '../../utils/utils';

const PieChartDiv = styled.div`
  position: relative;
  width: 220px;
  height: 220px;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const PulseInuImgDiv = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  border-radius: 50%;
`;

const PulseInuImg = styled.img`
  position: absolute;
  width: 150%;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export function PulseInuPieChart(props) {
  const svgRef = useRef();
  const pieChartRef = useRef();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      const svgEl = svgRef.current;

      let cumulativePercent = 0,
        startAngle = -Math.PI / 2;

      const getCoordinatesForPercent = (percent) => {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
      };

      const getCoordinatesForLabel = (slice) => {
        const x = 110 + 55 * Math.cos(startAngle + (2 * Math.PI * slice) / 2);
        const y = 110 + 55 * Math.sin(startAngle + (2 * Math.PI * slice) / 2);
        startAngle += 2 * Math.PI * slice;
        return [x, y];
      };

      props.data.forEach((slice, index) => {
        const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
        const [labelX, labelY] = getCoordinatesForLabel(slice.percent);
        cumulativePercent += slice.percent;
        const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
        const largeArcFlag = slice.percent > 0.5 ? 1 : 0;
        const pathData = [
          `M ${startX} ${startY}`, // Move
          `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
          `L 0 0` // Line
        ].join(' ');

        const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathEl.setAttribute('d', pathData);
        pathEl.setAttribute('fill', slice.fill);
        const gEl = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        if (slice.label === 'Stakes') {
          gEl.appendChild(pathEl);
          svgEl.appendChild(gEl);
        } else {
          if (slice.label === 'Liquidity') {
            const pathImgEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathImgEl.setAttribute('d', pathData);
            pathImgEl.setAttribute('fill', 'url(#pulse_inu_bg)');
            // svgEl.appendChild(pathImgEl);
            pathEl.setAttribute('opacity', '0.95');
          }
          svgEl.appendChild(pathEl);
        }

        const label = document.createElement('p');

        label.style.position = 'absolute';
        label.style.left = `${labelX}px`;
        label.style.top = `${labelY}px`;
        label.style.color = '#d7e0ff';
        label.style.textAlign = 'center';
        label.style.fontFamily = 'Poppins';
        label.style.fontWeight = '400';
        let fontSize = 12;
        if (slice.percent > 0.35 && slice.percent <= 0.4) {
          fontSize = 13;
        } else if (slice.percent > 0.4 && slice.percent <= 0.45) {
          fontSize = 14;
        } else if (slice.percent > 0.45 && slice.percent <= 0.5) {
          fontSize = 15;
        } else if (slice.percent > 0.5) {
          fontSize = 16;
        }
        label.style.fontSize = `${fontSize}px`;
        label.style.transform = 'translate(-50%, -100%)';

        label.innerHTML =
          slice.label.toUpperCase() +
          "<br /><span style='font-weight: 700;'>" +
          formatNumber(slice.percent * 100).toString() +
          '%</span>';
        const labelShowPercent = 0.08;
        if (slice.percent > labelShowPercent) {
          pieChartRef.current.appendChild(label);
        } else {
          if (
            props.data[index - 1] !== undefined &&
            props.data[index - 1].percent < labelShowPercent
          ) {
            if (props.data[index - 1].percent <= slice.percent) {
              pieChartRef.current.appendChild(label);
            }
          }
          if (
            props.data[index + 1] !== undefined &&
            props.data[index + 1].percent < labelShowPercent
          ) {
            if (props.data[index + 1].percent <= slice.percent) {
              pieChartRef.current.appendChild(label);
            }
          }
        }
        initialized.current = true;
      });
    }
  }, []);

  return (
    <PieChartDiv ref={pieChartRef}>
      <PulseInuImgDiv>
        <PulseInuImg src={PULSEINULOGO} />
      </PulseInuImgDiv>
      <svg
        ref={svgRef}
        viewBox="-1 -1 2 2"
        style={{ transform: 'rotate(-90deg)', height: '220px' }}>
        <defs>
          <linearGradient
            id="paint0_linear_91_230"
            x1="-30%"
            y1="-30%"
            x2="70%"
            y2="70%"
            gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#00EAFF" />
            <stop offset="51.91%" stopColor="#8000FF" />
            <stop offset="81.93%" stopColor="#E619E6" />
            <stop offset="95.15%" stopColor="#FF0000" />
          </linearGradient>
          <radialGradient
            id="paint0_radial_91_232"
            gradientUnits="userSpaceOnUse"
            cx="0%"
            cy="100%"
            r="210%">
            <stop offset="0" stopColor="#FF0000" />
            <stop offset="0.593686" stopColor="#F00F8E" />
            <stop offset="0.720277" stopColor="#4F30FF" />
            <stop offset="0.972607" stopColor="#00E8FC" />
          </radialGradient>
        </defs>
      </svg>
    </PieChartDiv>
  );
}
