import React from 'react'

import { render } from '@testing-library/react'

import ImageForm from './ImageForm'

describe('ImageForm', () => {
	it('should render', () => {
		const { container } = render(<ImageForm />)
		expect(container).toMatchSnapshot()
	})
})