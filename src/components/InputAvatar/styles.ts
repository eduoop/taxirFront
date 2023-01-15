import { styled } from "@mui/material/styles";
import Styled from "styled-components";

export const FileInput = styled("input")({
  display: "none",
});

export const Label = Styled.label`
  height: 100%
`;

export const AvatarContainer = Styled.div `
  width: 100%
`

export const Icon = Styled.img<{
  hasImageUploaded: boolean;
}>`
  max-width: ${({ hasImageUploaded }) =>
    hasImageUploaded ? "200px" : "200px"};
`;
    // max-height: ${({ hasImageUploaded }) =>
    //   hasImageUploaded ? "100%" : "50%"};