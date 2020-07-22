import React, {Component} from 'react'

import defaultImage from '../../assets/images/defaultImage.jpg'

class ImageForm extends Component {
	/** Initialize the state */
    constructor(props) {
		super(props)
		this.state = {
			file: '',
			imgSrc: '',
			msg: 'Pneumonia: [Result]'
		}
	}

	/** When the user uploads an image, it changes default image with users image */
	onFileChange = (event) => {
		event.preventDefault()

		this.setState({
			file: event.target.files[0]
		})

		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

		reader.onloadend = () => {
			this.setState({
				imgSrc: reader.result
			})
		}
  }
  	/** Sends an image as post request to the REST API and gets the prediction value */
	uploadFileData = (event) => {
		event.preventDefault()

		this.setState({msg: ''})
		
		let data = new FormData()
		data.append('file', this.state.file)
		
		const INTERNAL_IP = process.env.REACT_APP_INTERNAL_IP
		const INTERNAL_PORT = process.env.REACT_APP_INTERNAL_PORT

		console.log(INTERNAL_IP)
		console.log(INTERNAL_PORT)
		console.log(process.env)

		let API_URL = 'http://' + INTERNAL_IP + INTERNAL_PORT+ '/api/predict'

		fetch(API_URL, {
			method: 'POST',
			body: data
		})
		.then(response => { 			
			response.json().then((jsonResponse) => {
				this.setState({
					msg: jsonResponse.pred
				})
		})}).catch(err => {
			this.setState({error: err})
		})
    }

    render() {
        return(
            <div className="imageForm">
              <h1 className="title">Pneumonia Diagnosis</h1>
              {
                this.state.file ?
                (
                  <img className="image" src={this.state.imgSrc} alt="Chest x-ray"/>
                )
                :
                (
                  <img className="image default" src={defaultImage} alt="Chest x-ray"/>
                )
              }
              <form className="form" onSubmit={this.uploadFileData}>
                <input className="input" onChange={this.onFileChange} type="file" />
                <button className="btn" disabled={!this.state.file} type="submit">Predict</button>
              </form>
              <p className="result">{this.state.msg}</p>
            </div>
        )
    }
}

export default ImageForm