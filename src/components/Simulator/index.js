import React, { useState } from 'react'
import styled from 'styled-components';
import withLogic from './withLogic'
import { Button, Drawer } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import DataForm from './DataForm'

export const Container = styled.div`
  /* height: 100vh; */
  width: 100%;
`;

export const NewSimulationButton = styled(Button)`
  position: fixed;
  top: 30px;
  right: 30px;
`

const Simulator = ({isDrawerVisible, setIsDrawerVisible }) => {
  
  return (
    <Container>
      <NewSimulationButton type="primary" onClick={() => setIsDrawerVisible(true)}>
        <PlusOutlined /> New account
      </NewSimulationButton>
      <Drawer
        title="Formulário para nova Simulação"
        width={500}
        visible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        footer={
          <div>

          </div>
        }
      >
       <DataForm/> 
      </Drawer>
    </Container>
  )
}

// export default Simulator

export default withLogic(Simulator)
