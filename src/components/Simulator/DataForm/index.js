import React, { useState } from 'react'
import Form from 'antd/lib/form/Form'
import {
  Container,
  ButtonsContainer,
  ButtonsWrapper
} from './styles'
import SelectSimple from '../../_UI/Input/SelectSimple'
import { Input, Button } from 'antd'
import withLogic from './withLogic'

const DataForm = ({ onChange, onSelectAlg, state, onClose, onClear, onStartSimulation }) => {
  const fields = React.useMemo(() => [
    {
      label: 'Algoritmo de Escalonamento',
      name: 'whichAlg',
      isSelect: true,
      selectFields: ["Round Robin"]
    },
    {
      label: 'Número de Quantum',
      name: 'quantum',
      type: 'text',
      placeholder: 'Número de Quantum',
    },
    {
      label: 'Número de Processos',
      name: 'processNumber',
      type: 'text',
      placeholder: 'Número de Processos',
    },
    {
      label: 'Número de Cores',
      name: 'coresNumber',
      type: 'text',
      placeholder: 'Número de Cores',
    }
  ])

  return (
    <Form>
      {fields.map((field, index) => (
        <Container key={index}>
          {field.isSelect
            ?
            <SelectSimple
              onChange={onSelectAlg}
              name={field.name}
              placeholder={'Selecione uma opção'}
              data={field.selectFields}
              defaultValue={"Round Robin"}
              noPosition
              isLeft={false}
            />
            :
            <Input
              name={field.name}
              placeholder={field.placeholder}
              onChange={onChange}
              value={state[field.name]}
            />
          }
        </Container>
      ))}
      <ButtonsContainer>
        <Button
          onClick={onClose}
          style={{ marginRight: 8 }}
        >
          Fechar
        </Button>
        <ButtonsWrapper>
          <Button
            onClick={onClose}
            style={{ marginRight: 8 }}
          >
            Limpar
        </Button>
          <Button onClick={onStartSimulation} type="primary">
            Iniciar Simulação
        </Button>
        </ButtonsWrapper>
      </ButtonsContainer>
    </Form >
  )
}

export default withLogic(DataForm);
