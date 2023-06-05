import { styled } from "@storybook/theming";

export const ModalContent = styled.div`
  display: flex;
  flex-direction: row;
  max-height: 85vh;
`;

export const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.typography.fonts.base};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.color.darkest};
  padding: 1em;
  border-bottom: 1px solid ${({ theme }) => theme.appBorderColor};

  h2 {
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: bold;
  }

  svg {
    margin-right: 0.5em;
  }
`;

export const Description = styled.div`
  font-size: 13px;
  padding: 1em;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  color: #454e54;

  h3 {
    font-size: 13px;
    font-weight: bold;
    padding: 0;
    margin: 0;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SpanHighlight = styled.span`
  color: ${({ theme }) => theme.color.secondary};
  display: inline-block;
  border-radius: 4px;
  padding: 0.2em 0.4em;
  opacity: 0.8;
  background-color: ${({ theme }) => theme.color.secondary}20;
  font-weight: bold;
`;

export const Image = styled.img`
  max-width: 100%;
  margin-top: 1em;
`;
