import React from 'react';
import './KatanaStrike.css';

const KatanaStrike: React.FC = () => {
  return (
    <section className="katana-section">
      <div className="katana-stage">
        <div className="katana-scaler">
          <div className="katana-wrap">
            <div className="katana">
              <div className="kashira" />
              <div className="grip" />
              <div className="tsuba" />
              <div className="habaki" />
              <div className="blade" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KatanaStrike;
