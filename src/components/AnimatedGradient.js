import styled, { keyframes } from 'styled-components';

const gradientAnim = keyframes`
  0% {background-position:0% 50%;}
  50% {background-position:100% 50%;}
  100% {background-position:0% 50%;}
`;

export const AnimatedGradient = styled.div`
  background: linear-gradient(120deg, #43cea2, #185a9d, #e55d87, #43cea2);
  background-size: 300% 300%;
  animation: ${gradientAnim} 8s ease-in-out infinite;
  border-radius: 20px;
  transition: box-shadow 0.2s;
`;
