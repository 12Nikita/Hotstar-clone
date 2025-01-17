import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRecommend } from "../feature/movie/movieSlice";
const Recommends = () => {
  const movies = useSelector(selectRecommend);
  return (
    <Container>
      <h2>Recommended for you</h2>
      <Content>
        {movies &&
          movies.map((movie, key) => (
            <Wrap key={key}>
              {movie.id}
              <Link to={"/detail/" + movie.id}>
                <img src={movie.cardImg} alt={movie.title} />
              </Link>
            </Wrap>
          ))}
      </Content>
    </Container>
  );
};
const Container = styled.div`
  padding: 0 0 26px;
`;
const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;
const Wrap = styled.div`
position:relative;
box-shadow:rgb(0 0 0/69%)0px 26px 30px -10px,rgb(0 0 0/73%)0px 16px 10px -16px;
overflow:hidden;
cursor:pointer;
border-radius:10px;
padding-top:56.25%;
transition:all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)0s;
border: 3px solid rgba(249,249,249,0.1);

img{
    inset:0px;
    opacity:1;
    position:absolute;
    height:100%;
    display:block;
    object-fit:cover;
    transition:opacity 500ms ease-in-out 0s;
    top:0;
    width:100%;
    z-index:1;
}
&:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  } }`;
export default Recommends;
