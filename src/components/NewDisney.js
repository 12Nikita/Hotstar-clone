// src/components/NewDisney.js

import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import styled from "styled-components";
import { Link } from "react-router-dom";

function NewDisney() {
  const [newDisney, setNewDisney] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "movies"), (snapshot) => {
      const filtered = snapshot.docs
        .filter((doc) => doc.data().type === "new")
        .map((doc) => ({ id: doc.id, ...doc.data() }));

      console.log("New Disney movies:", filtered);
      setNewDisney(filtered);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Container>
      <h4>New to Disney+</h4>
      <Content>
        {newDisney.map((movie) => (
          <Wrap key={movie.id}>
            <Link
  to={`/detail/${movie.id}`}
  onClick={() => console.log("Navigating to:", `/detail/${movie.id}`)}
>

              <img src={movie.cardImg} alt={movie.title} />
            </Link>
          </Wrap>
        ))}
      </Content>
    </Container>
  );
}

export default NewDisney;

// Styled Components
const Container = styled.div`
  padding: 0 0 26px;
`;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
`;

const Wrap = styled.div`
  border-radius: 10px;
  overflow: hidden;
  border: 3px solid rgba(249, 249, 249, 0.1);
  transition: all 250ms ease-in-out;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.05);
    border-color: white;
  }
`;
