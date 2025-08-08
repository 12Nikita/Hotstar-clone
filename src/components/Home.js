import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Recommends from "./Recommends";
import Trending from "./Trending";
import Viewers from "./Viewers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";
import { setMovies } from "../feature/movie/movieSlice";
import { selectUserName } from "../feature/user/userSlice";
import { collection, onSnapshot } from "firebase/firestore";

const Home = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

 useEffect(() => {
  if (!userName) return; 

  const unsubscribe = onSnapshot(collection(db, "movies"), (snapshot) => {
    const recommendsData = [];
    const newDisneysData = [];
    const originalsData = [];
    const trendingData = [];

    snapshot.docs.forEach((doc) => {
      const data = { id: doc.id, ...doc.data() };
      switch (data.type) {
        case "recommend":
          recommendsData.push(data);
          break;
        case "new":
          newDisneysData.push(data);
          break;
        case "original":
          originalsData.push(data);
          break;
        case "trending":
          trendingData.push(data);
          break;
        default:
          break;
      }
    });

    dispatch(
      setMovies({
        recommend: recommendsData,
        newDisney: newDisneysData,
        original: originalsData,
        trending: trendingData,
      })
    );
  });

  return () => unsubscribe();
}, [userName, dispatch]);


  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url(${process.env.PUBLIC_URL + "/images/home-background.png"})
      center center / cover no-repeat fixed;

    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
