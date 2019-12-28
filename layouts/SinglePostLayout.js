import styled from 'styled-components';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const StyledSinglePostWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 300px;
`;
const StyledSinglePost = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  max-width: 680px;
`;
const StyledSinglePostHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  background: #6bcd9b;
  h1 {
    color: white;
    text-shadow: none;
  }
`;

const SinglePostLayout = ({ children }) => (
  <>
    <Header />

    <StyledSinglePostHeader>
      <h1>Single Book View</h1>
    </StyledSinglePostHeader>

    <StyledSinglePostWrapper>
      <StyledSinglePost>{children}</StyledSinglePost>
    </StyledSinglePostWrapper>
    <Footer />
  </>
);

export default SinglePostLayout;
