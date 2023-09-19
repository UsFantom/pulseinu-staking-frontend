import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import PULSEINULOGO from '../../assets/images/pulseinu.svg';
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
  width: 50%;
  position: absolute;
  left: 50%;
  overflow: hidden;
  border-radius: 0 110px 110px 0;
`;

const PulseInuImg = styled.img`
  height: 55%;
  position: absolute;
  bottom: 0%;
  left: 0%;
  transform: translate(-120px, 0);
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

      props.data.forEach((slice) => {
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
          gEl.setAttribute('opacity', '0.1');
          gEl.appendChild(pathEl);
          svgEl.appendChild(gEl);
        } else {
          if (slice.label === 'Liquidity') {
            const pathImgEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathImgEl.setAttribute('d', pathData);
            pathImgEl.setAttribute('fill', 'url(#pulse_inu_bg)');
            // svgEl.appendChild(pathImgEl);
            pathEl.setAttribute('opacity', '0.85');
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
        label.style.fontSize = slice.label === 'Liquidity' ? '16px' : '12px';
        label.style.transform = 'translate(-50%, -100%)';

        label.innerHTML =
          slice.label.toUpperCase() +
          "<br /><span style='font-weight: 700;'>" +
          formatNumber(slice.percent * 100).toString() +
          '%</span>';

        pieChartRef.current.appendChild(label);
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
            x1="-150%"
            y1="50%"
            x2="150%"
            y2="-50%"
            gradientTransform="rotate(129.38)">
            <stop offset="35.71%" stopColor="#00EAFF" />
            <stop offset="76.1%" stopColor="#8000FF" />
            <stop offset="95.4%" stopColor="#E619E6" />
            <stop offset="122.61%" stopColor="#FF0000" />
          </linearGradient>
          <radialGradient
            id="paint0_radial_91_231"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(70.0563 319.682) rotate(-68.8673) scale(843.988 173098)">
            <stop stopColor="#00E8FC" />
            <stop offset="0.393686" stopColor="#4F30FF" />
            <stop offset="0.720277" stopColor="#F00F8E" />
            <stop offset="0.972607" stopColor="#FF0000" />
          </radialGradient>
          <filter
            id="filter0_d_91_232"
            x="0"
            y="0"
            width="230.5"
            height="254.174"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="26" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.8 0 0 0 0 0.0745098 0 0 0 0 0.92549 0 0 0 0.46 0"
            />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_91_232" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_91_232"
              result="shape"
            />
          </filter>
          <radialGradient
            id="paint0_radial_91_232"
            gradientUnits="userSpaceOnUse"
            cx="0%"
            cy="100%"
            r="170%">
            <stop offset="0" stopColor="#00E8FC" />
            <stop offset="0.393686" stopColor="#4F30FF" />
            <stop offset="0.720277" stopColor="#F00F8E" />
            <stop offset="0.972607" stopColor="#FF0000" />
          </radialGradient>
          <pattern
            id="pulse_inu_bg"
            patternUnits="userSpaceOnUse"
            width="100%"
            height="100%"
            patternTransform="rotate(90)">
            <image
              href="./pulseinu.svg"
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="xMinYMin slice"
            />
          </pattern>
        </defs>
      </svg>
    </PieChartDiv>
  );
}
