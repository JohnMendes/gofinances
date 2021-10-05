import React from 'react';
import {TextInputProps} from 'react-native'
import {Control, Controller} from 'react-hook-form'

import {Input} from '../Input'

import {Container, Error} from './styles'

interface Props extends TextInputProps {
  control:Control<FormDataProps>;
  name: 'name' | 'amount';
  error: string | undefined;
}

export interface FormDataProps {
  name:string;
  amount: number;
}

export function InputFrom({control,name ,error, ...rest}:Props){

  return(
    <Container>
      <Controller
      control={control}
      render={({field: {onChange, value}}) => (
        <Input
        onChangeText={onChange}
        value={value as string}
        {...rest}
      />
      )}
      name={name}
      />
      {error && <Error>{error}</Error>}
    </Container>
  )
}