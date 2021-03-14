import React from 'react';

const SVG = ({
  style = {},
  fill = '#000',
  width = '100%',
  className = '',
  viewBox = '0 0 12 12',
}) => (
  <svg
    width={width}
    style={style}
    height={width}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon${ className || ''}`}
  >
    <path
      d="M7.615 6l4.036-4.037a1.14 1.14 0 00-1.243-1.87c-.14.06-.266.147-.371.256L5.999 4.385 1.963.349A1.142 1.142 0 10.35 1.963L4.385 6 .349 10.037a1.141 1.141 0 101.614 1.614L6 7.615l4.038 4.036a1.14 1.14 0 001.878-.36 1.142 1.142 0 00-.264-1.254L7.615 5.999v.002z"
      fill={fill}
    />
  </svg>
);

export default SVG;
