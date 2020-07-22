import React, {Component} from 'react'

import './assets/sass/base.scss'

import ImageForm from './components/ImageForm/imageform'

class App extends Component {
	render() {
		return(
			<div className="App">
				<ImageForm />
			</div>
		)
	}
}

export default App;
