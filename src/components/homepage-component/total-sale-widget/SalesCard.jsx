import React from 'react';
import './SalesCard.scss';
import PeopleIcon from '@mui/icons-material/People';

const colors = [
    'linear-gradient(180deg, #01C572 0%, #187E53 100%)',
    'var(--Colors-Orange, #FF9500)',
    '#FFC600',
    '#0280F5'
  ];

  const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const SalesCard = ({ title, sales, target, growth, icon }) => {
    const istyle = {
        background: getRandomColor(),
      };
  return (
    <div className="card_content">
      <div className="card_inner">

        <div className="content">
          <div className="title" title={title}>
            {title}
          </div>
          <div className="sales">
            {sales} L{' '}
            <span className="sales-target">/ {target} L</span>
          </div>
        </div>

        <div className="icon-section">
          <div className="growth-box"
          style={istyle}
          >
            {icon || <PeopleIcon />}
          </div>
          <div className="growth-info">
            <span className="growth" style={{ color: growth >= 0 ? '#01C572' : '#FF4C4C' }}>
              {growth >= 0 ? `+${growth}%` : `${growth}%`}
            </span>
            <span className="growth-arrow">
              {growth >= 0 ? '↑' : '↓'}
            </span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default SalesCard;
