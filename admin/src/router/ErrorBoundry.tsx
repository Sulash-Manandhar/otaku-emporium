import { useRouteError } from "react-router-dom";
import { styled } from "styled-components";
const ErrorBoundry = () => {
  const error: any = useRouteError();

  return (
    <ErrorBoundryContainer id="error-page">
      <div>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </ErrorBoundryContainer>
  );
};

export default ErrorBoundry;

const ErrorBoundryContainer = styled.div`
  display: grid;
  place-items: center;
  width: 100dvw;
  height: 100dvh;
`;
