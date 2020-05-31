import React from 'react'
import MemoryBlock from '../../../struct/MemoryBlock'
import { storiesOf } from '@storybook/react'
import { withKnobs, number, text } from '@storybook/addon-knobs'
import MemoryBlockCard from './'

const memoryBlock = new MemoryBlock({
  totalBlockSize: 1000,
  occupiedSize: 100,
  blockId: 1,
  nextFreeBlock: null
})

storiesOf('UI|MemoryBlock', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ padding: '5px', display: 'flex', flexDirection: 'column' }}>
      <MemoryBlockCard
        size={number('Porcentage', 10)}
        pid={text('pid', '7')}
        {...memoryBlock}
      />
    </div>
  ))
