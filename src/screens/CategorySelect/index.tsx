import React from 'react'

import {Container, Header, Title} from './styles'

interface Category{
  key:string;
  name:string;
}

interface Props{
  category:Category;
  setCategoty:(name: string) => void;
  closeSelectCategory:() => void;
}


export function CategorySelect({category, setCategoty, closeSelectCategory}:Props){

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>
    </Container>
  )
}