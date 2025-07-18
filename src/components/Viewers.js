import React from "react";
import styled from "styled-components";

const base = process.env.PUBLIC_URL || "";

const viewers = [
  {
    title: "Disney",
    img: `${base}/images/viewers-disney.png`,
    video: `${base}/videos/1564674844-disney.mp4`,
  },
  {
    title: "Pixar",
    img: `${base}/images/viewers-pixar.png`,
    video: `${base}/videos/1564676714-pixar.mp4`,
  },
  {
    title: "Marvel",
    img: `${base}/images/viewers-marvel.png`,
    video: `${base}/videos/1564676115-marvel.mp4`,
  },
  {
    title: "Star Wars",
    img: `${base}/images/viewers-starwars.png`,
    video: `${base}/videos/1608229455-star-wars.mp4`,
  },
  {
    title: "National Geographic",
    img: `${base}/images/viewers-national.png`,
    video: `${base}/videos/1564676296-national-geographic.mp4`,
  },
];

const Viewers = () => {
  return (
    <Container>
      {viewers.map((viewer, index) => (
        <Wrap key={index}>
          <img src={viewer.img} alt={viewer.title} />
          <video autoPlay loop muted playsInline poster={viewer.img}>
            <source src={viewer.video} type="video/mp4" />
          </video>
        </Wrap>
      ))}
    </Container>
  );
};

export default Viewers;

// ✅ Styled Components
const Container = styled.div`
  margin-top: 30px;
  padding: 30px 0 26px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(5, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  border: 3px solid rgba(249, 249, 249, 0.1);
  transition: all 250ms ease;

  img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    z-index: 1;
    transition: opacity 0.5s ease;
  }

  video {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    z-index: 0;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  &:hover video {
    opacity: 1;
  }
`;
