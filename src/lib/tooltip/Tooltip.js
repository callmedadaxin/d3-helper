import React from 'react';
import PropTypes from 'prop-types';

Tooltip.propTypes = {
  left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any
};

export default function Tooltip({ className, top, left, style, children, ...restProps }) {
  return (
    <div
      className={'vx-tooltip-portal ' + className}
      style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: '#fff',
        padding: '10px',
        borderRadius: '3px',
        border: 'none',
        fontSize: '12px',
        fontWeight: 'normal',
        lineHeight: '1',
        pointerEvents: 'none',
        zIndex: 10,
        top,
        left,
        ...style
      }}
      {...restProps}
    >
      {children}
    </div>
  );
}
