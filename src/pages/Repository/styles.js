import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  color: #7159c1;
  background: #fff;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 400px;
  margin: 80px auto;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

  svg {
    margin-top: 15px;
    animation: ${rotate} 2s linear infinite;
  }
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    border-radius: 50%;
    width: 120px;
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

export const IssueList = styled.ul`
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;

    & + li {
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
          margin-left: 10px;
          padding: 3px 4px;
        }

        .open {
          color: #fff;
          background: #2cbe4e;
        }

        .closed {
          color: #fff;
          background: #cb2431;
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

export const FilterState = styled.div`
  margin: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    font-size: 16px;
    background: #fff;
    color: #7159c1;
    border: 1px solid #7159c1;
    padding: 3px 15px;
    margin-left: 10px;
    border-radius: 4px;
    &:nth-child(${props => props.active + 1}) {
      color: black;
      border: 1px solid black;
    }
  }
`;

export const IssuePagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
  button {
    margin: 0px 10px;
    padding: 5px 10px;
    height: 30px;
    width: 100px;
    background: #fff;
    color: #7159c1;
    border: 1px solid #7159c1;
    border-radius: 4px;

    &:hover {
      color: black;
      border: 1px solid black;
    }
  }
`;
