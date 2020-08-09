import React, { useState } from 'react'
import defaultImage from '../../assets/images/defaultImage.jpg'
 
const ImageForm: React.FC = () => {
	const [file, setFile] = useState<File>()
	const [imgSrc, setImgSrc] = useState<string>()
	const [msg, setMsg] = useState<string>('Pneumonia: [Result]')
 
	/** When the user uploads an image, it changes default image with users image */
	const onFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		event.preventDefault()
 
		setFile(event.target.files![0])
 
		const reader = new FileReader()
		reader.readAsDataURL(event.target.files![0])
 
		reader.onloadend = () => {
			setImgSrc(String(reader.result))
		}
	}
 
	/** Sends an image as post request to the REST API and gets the prediction value */
	const uploadFileData = (event: React.BaseSyntheticEvent): void => {
		event.preventDefault()
 
		const data = new FormData()
		data.append('file', file!)
 
		const INTERNAL_IP = process.env.REACT_APP_INTERNAL_IP
		const INTERNAL_PORT = process.env.REACT_APP_INTERNAL_PORT
 
		console.log(INTERNAL_IP)
		console.log(INTERNAL_PORT)
		console.log(process.env)
 
		const API_URL = 'http://' + INTERNAL_IP + INTERNAL_PORT + '/api/predict'
 
		fetch(API_URL, {
			method: 'POST',
			body: data
		}).then(response => {
			response.json().then((jsonResponse) => {
				setMsg(jsonResponse.pred)
			})
		}).catch(err => {
			setMsg(String(err))
		})
	}
	return (
		<div className='imageForm'>
			<h1 className='title'>Pneumonia Diagnosis</h1>
			{
				file ?
					(
						<img className='image' src={imgSrc} alt='Chest x-ray' />
					)
					:
					(
						<img className='image default' src={defaultImage} alt='Chest x-ray' />
					)
			}
			<form className='form' onSubmit={uploadFileData}>
				<input className='input' onChange={onFileChange} type='file' />
				<button className='btn' disabled={!file} type='submit'>Predict</button>
			</form>
			<p className='result'>{msg}</p>
		</div>
	)
}
 
export default ImageForm


