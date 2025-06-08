import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SkipCard from "./components/SkipCard";

const PageBg = styled.div`
  min-height: 100vh;
  background: linear-gradient(140deg, #e0eafc 0%, #cfdef3 100%);
`;

const Container = styled.div`
  max-width: 880px;
  margin: 0 auto;
  padding: 2.2rem 1rem 7rem 1rem;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  background: linear-gradient(90deg, #43cea2, #185a9d);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  margin: 0;
  text-align: center;
  font-weight: 800;
  letter-spacing: -0.025em;
`;

const Subtitle = styled.div`
  text-align: center;
  color: #4a607a;
  margin-top: 0.44rem;
  font-size: 1.11rem;
  font-weight: 500;
  margin-bottom: 2rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(295px, 1fr));
  gap: 1.2rem;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
`;

const Footer = styled.footer`
  position: fixed;
  left: 0; right: 0; bottom: 0;
  background: linear-gradient(90deg, #43cea2 10%, #185a9d 90%);
  color: #fff;
  padding: 1.1rem 1.5rem 1.1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 30;
  font-size: 1.07rem;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.6rem;
    font-size: 1rem;
    padding: 1.1rem;
  }
`;

const ContinueBtn = styled.button`
  background: #fff;
  color: #185a9d;
  font-weight: 700;
  font-size: 1.11rem;
  padding: 0.8rem 2.1rem;
  border: none;
  border-radius: 12px;
  box-shadow: 0 2px 16px #185a9d33;
  cursor: pointer;
  transition: background 0.14s, color 0.12s;
  &:hover, &:focus {
    background: #185a9d;
    color: #fff;
  }
  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export default function App() {
  const [skips, setSkips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft")
      .then(res => res.json())
      .then(data => setSkips(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageBg>
      <Container>
        <Title>Pick Your Skip Size</Title>
        <Subtitle>
          Choose the perfect skip for your needs. All prices are for 14 days.
        </Subtitle>
        {loading ? (
          <div style={{textAlign: "center", marginTop: 50, color: "#185a9d"}}>
            Loading skips...
          </div>
        ) : (
          <CardGrid>
            {skips.map(s => (
              <SkipCard
                skip={s}
                key={s.id}
                selected={selected?.id === s.id}
                onSelect={setSelected}
              />
            ))}
          </CardGrid>
        )}
      </Container>
      <Footer>
        <div>
          {selected
            ? <>Selected: <strong>{selected.size} Yard</strong> – £{selected.price_before_vat} +VAT</>
            : "Select a skip to continue"}
        </div>
        <ContinueBtn disabled={!selected}>
          Continue
        </ContinueBtn>
      </Footer>
    </PageBg>
  );
}
