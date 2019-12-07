import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 60px;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const FilterOption = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;

  button {
    width: 100px;
    text-align: center;
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
    padding: 1px 20px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    margin-bottom: 10px;

    & li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const IssuePage = styled.div.attrs(props => ({
  disabled: props.disabled,
}))`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;

  button {
    background-color: #7159c1;
    width: 160px;
    border-radius: 15px;
    border: none;
    color: white;
    padding: 10px 25px;
    text-align: center;
    font-size: 13px;
    margin: 1px 1px;
    opacity: 0.6;
    transition: 0.3s;
    display: inline-block;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  p {
    padding: 0px 15px;
    font-size: 14px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
`;
