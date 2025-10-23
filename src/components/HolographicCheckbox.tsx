import React from 'react';

interface HolographicCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

const HolographicCheckbox: React.FC<HolographicCheckboxProps> = ({ 
  checked = false, 
  onChange, 
  className = "" 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <div className={`checkbox-container ${className}`}>
      <input 
        className="holo-checkbox-input" 
        id="holo-check" 
        type="checkbox" 
        checked={checked}
        onChange={handleChange}
        readOnly={!onChange}
      />
      <label className="holo-checkbox" htmlFor="holo-check">
        <div className="holo-box">
          <div className="holo-inner"></div>
          <div className="scan-effect"></div>
          <div className="holo-particles">
            <div className="holo-particle"></div>
            <div className="holo-particle"></div>
            <div className="holo-particle"></div>
            <div className="holo-particle"></div>
            <div className="holo-particle"></div>
            <div className="holo-particle"></div>
          </div>

          <div className="activation-rings">
            <div className="activation-ring"></div>
            <div className="activation-ring"></div>
            <div className="activation-ring"></div>
          </div>

          <div className="cube-transform">
            <div className="cube-face"></div>
            <div className="cube-face"></div>
            <div className="cube-face"></div>
            <div className="cube-face"></div>
            <div className="cube-face"></div>
            <div className="cube-face"></div>
          </div>
        </div>

        <div className="corner-accent"></div>
        <div className="corner-accent"></div>
        <div className="corner-accent"></div>
        <div className="corner-accent"></div>

        <div className="holo-glow"></div>
      </label>

      <div className="status-text"></div>

      <div className="frequency-spectrum">
        <div className="frequency-bar"></div>
        <div className="frequency-bar"></div>
        <div className="frequency-bar"></div>
        <div className="frequency-bar"></div>
        <div className="frequency-bar"></div>
        <div className="frequency-bar"></div>
        <div className="frequency-bar"></div>
        <div className="frequency-bar"></div>
        <div className="frequency-bar"></div>
        <div className="frequency-bar"></div>
        <div className="frequency-bar"></div>
        <div className="frequency-bar"></div>
        <div className="frequency-bar"></div>
        <div className="frequency-bar"></div>
        <div className="frequency-bar"></div>
        <div className="frequency-bar"></div>
        <div className="frequency-bar"></div>
        <div className="frequency-bar"></div>
        <div className="frequency-bar"></div>
        <div className="frequency-bar"></div>
      </div>

      <div className="data-chips">
        <div className="data-chip">STATUS: IDLE [0x4F]</div>
        <div className="data-chip">QUANTUM VERIFY: 82.6%</div>
        <div className="data-chip">SYNCH: PENDING</div>
        <div className="data-chip">0x7A2C8B9F</div>
      </div>
    </div>
  );
};

export default HolographicCheckbox;
