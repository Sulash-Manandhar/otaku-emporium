import { styled } from "styled-components";

export const PageHeader = styled.h1`
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
`;

export const TableActionContainer = styled.td`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  cursor: pointer;
  height: 100%;

  .view {
    color: darkgreen;
  }

  .edit {
    color: yellowgreen;
  }

  .delete {
    color: tomato;
  }
`;
