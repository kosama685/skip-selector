import React from 'react';
import styled from 'styled-components';
import { AnimatedGradient } from './AnimatedGradient';
import { FaCheckCircle, FaTruck } from 'react-icons/fa';

const Card = styled(AnimatedGradient)`
  padding: 2rem 1.2rem 1.3rem 1.2rem;
  color: #fff;
  margin: 0.7rem 0;
  position: relative;
  transition: transform 0.17s, box-shadow 0.15s;
  box-shadow: 0 6px 28px rgba(24,90,157,0.11);
  cursor: pointer;
  border: ${p=>p.selected ? '3px solid #fff' : '3px solid transparent'};
  transform: ${p=>p.selected ? 'scale(1.05)' : 'scale(1)'};
  &:hover, &:focus {
    transform: scale(1.06);
    box-shadow: 0 12px 36px rgba(67,206,162,0.22);
  }
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const Badge = styled.span`
  background: rgba(0,0,0,0.19);
  padding: 0.14rem 0.7rem;
  border-radius: 7px;
  font-size: 0.92rem;
  margin-left: 0.4rem;
`;

const Price = styled.div`
  font-size: 1.16rem;
  font-weight: 600;
  margin-top: 0.6rem;
`;

const Details = styled.ul`
  margin-top: 0.7rem;
  padding-left: 1.1rem;
  font-size: 1.01rem;
  li {
    margin-bottom: 0.12rem;
    line-height: 1.3;
  }
`;

export default function SkipCard({ skip, selected, onSelect }) {
  return (
    <Card
      selected={selected}
      tabIndex={0}
      aria-pressed={selected}
      onClick={() => onSelect(skip)}
      onKeyPress={e => (e.key === "Enter" || e.key === " ") && onSelect(skip)}
      role="button"
    >
      <Title>
        {skip.size} Yard Skip {selected && <FaCheckCircle color="#fff" size={21} />}
        <Badge>{skip.hire_period_days}d hire</Badge>
      </Title>
      <Price>
        £{skip.price_before_vat} <span style={{fontWeight:400}}>+VAT</span>
      </Price>
      <Details>
        <li>{skip.allowed_on_road ? <FaTruck size={13}/> : null} {skip.allowed_on_road ? "On-road allowed" : "On-road not allowed"}</li>
        <li>{skip.allows_heavy_waste ? "Heavy waste allowed" : "Light waste only"}</li>
      </Details>
    </Card>
  );
}
