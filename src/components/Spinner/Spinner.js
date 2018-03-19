import React, { PropTypes } from 'react'
import './Spinner.css'


const polarToCartesian = ( centerX, centerY, radius, angleInDegrees ) => {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

const describeArc = ( x, y, radius, startAngle, endAngle ) => {

    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return [
        'M', start.x, start.y, 
        'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');    
}

const Spinner = ({ size, center }) => {
  
  const strokeWidth = size / 10
  const width = `${size}px`, height = `${size}px`
  const position = size / 2
  const radius = position - strokeWidth

  return(
    <div className={`modus-spinner ${center ? 'center' : '' }`}>
      <svg 
        className='modus-spinner__component'
        width={ width }
        height={ height }
        viewBox={`0 0 ${size} ${size}`}
        xmlns='http://www.w3.org/2000/svg'
      >
        <path 
          className='modus-spinner__svg-path'
          strokeWidth={ strokeWidth }
          d={ describeArc( position, position, radius, 90, 200 )}
        />
      </svg>
    </div>
  )
}

export default Spinner


