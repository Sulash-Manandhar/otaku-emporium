import { styled } from "styled-components";

const Spinner = () => {
  return (
    <Wrapper>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  width: 100vw;
  height: 50vh;
`;

export default Spinner;
