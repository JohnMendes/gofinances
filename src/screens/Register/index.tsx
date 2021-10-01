import React, { useState } from "react";
import { set } from "react-native-reanimated";
import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { CategorySelect } from "../../components/Form/CategorySelect";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";

import {
  Container,
  Header,
  Title,
  Form,
  Filds,
  TransactionTypes,
} from "./styles";

export function Register() {
  const [transactionType, setTransactionType] = useState("");

  function handleTransactionTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Filds>
          <Input placeholder="Nome" />

          <Input placeholder="Preço" />
          <TransactionTypes>
            <TransactionTypeButton
              type="up"
              title="Income"
              onPress={() => handleTransactionTypeSelect("up")}
              isActive={ transactionType === 'up'}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              onPress={() => handleTransactionTypeSelect("down")}
              isActive={ transactionType === 'down'}
            />
          </TransactionTypes>
          <CategorySelect title="Categoria" />
        </Filds>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
}
