import React from 'react'
import ReactDOM from 'react-dom'
import ImageForm from './imageform'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ImageForm />, div)
  ReactDOM.unmountComponentAtNode(div)
})