import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import {TextInput} from 'react-native'

export const Container = styled(TextInput)`
  background-color: ${({ theme }) => theme.colors.shape};
  color: ${({ theme }) => theme.colors.text_dark};

  width: 100%;
  padding: 16px 18px;

  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  border-radius: 5px;

  margin-bottom: 8px;
`;
