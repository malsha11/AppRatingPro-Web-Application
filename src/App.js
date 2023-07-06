import React, { useState } from 'react'
import './App.css'

const App = () => {
  const [images, setImages] = useState([])
  const [attributes, setAttributes] = useState([])
  const [rating, setRating] = useState(null)

  const [noInstalls, setNoInstalls] = useState(null)
  const [price, setPrice] = useState(null)
  const [noRatings, setNoRatings] = useState(null)
  const [noReviews, setNoReviews] = useState(null)
  const [free, setFree] = useState(null)
  const [adSupported, setAdSupported] = useState(null)
  const [containsAds, setContainsAds] = useState(null)

  const handleImageUpload = (event) => {
    const files = event.target.files
    setImages(files)
  }

  const handleAttributeChange = (event, index) => {
    const { name, value } = event.target
    const updatedAttributes = [...attributes]
    updatedAttributes[index] = { ...updatedAttributes[index], [name]: value }
    setAttributes(updatedAttributes)
  }

  const handleSubmit = async () => {
    const formData = new FormData()

    if (images.length !== 3) {
      setRating('Please upload three images')
    } else if (
      noInstalls === null ||
      noRatings === null ||
      noReviews === null ||
      price === null ||
      adSupported === null ||
      containsAds === null ||
      free === null
    ) {
      setRating('Please fill all the data')
    } else {
      formData.append(`image1`, images[0])
      formData.append(`image2`, images[1])
      formData.append(`image3`, images[2])

      formData.append(`noInstalls`, parseInt(noInstalls))
      formData.append(`noReviews`, parseInt(noReviews))
      formData.append(`price`, parseFloat(price))
      formData.append(`noRatings`, parseInt(noRatings))

      if (adSupported === 'adSupported') {
        formData.append(`isAdSupported`, parseInt(1))
      } else {
        formData.append(`isAdSupported`, parseInt(0))
      }

      if (containsAds === 'adContains') {
        formData.append(`containsAds`, parseInt(1))
      } else {
        formData.append(`containsAds`, parseInt(0))
      }

      if (containsAds === 'free') {
        formData.append(`isFree`, parseInt(1))
      } else {
        formData.append(`isFree`, parseInt(0))
      }

      console.log(formData)
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      setRating(data.rating)
      console.log(rating)
    }
  }

  return (
    <div className='container'>
      <div className='titleBar'>
        <h1 className='title'>AppRatingPro</h1>
      </div>

      <div className='formContainer'>
        <div>
          <h2 className='subTitle'>Upload three screenshots of the app</h2>
          <input type='file' multiple onChange={handleImageUpload} />
        </div>
        <div className='formSubContainer'>
          <h2>Enter following details</h2>
          <div className='inputNumber'>
            <label className='label'>Number of Installs</label>
            <input
              type='number'
              name='noInstalls'
              placeholder='Number of Installs'
              onChange={(e) => {
                setNoInstalls(e.target.value)
              }}
            />
          </div>
          <div className='inputNumber'>
            <label className='label'>Price</label>
            <input
              type='number'
              name='price'
              placeholder='Price'
              onChange={(e) => {
                setPrice(e.target.value)
              }}
            />
          </div>
          <div className='inputNumber'>
            <label className='label'>Number of Ratings</label>
            <input
              type='number'
              name='noRatings'
              placeholder='Number of Ratings'
              onChange={(e) => {
                setNoRatings(e.target.value)
              }}
            />
          </div>
          <div className='inputNumber'>
            <label className='label'>Number of Reviews</label>

            <input
              type='number'
              name='noReviews'
              placeholder='Number of Reviews'
              onChange={(e) => {
                setNoReviews(e.target.value)
              }}
            />
          </div>

          <div className='radioButtonContainer'>
            <label className='label'>Is app free or not?</label>
            <div>
              <input
                type='radio'
                value='free'
                name='free'
                onChange={(e) => {
                  setFree(e.target.value)
                }}
              />
              Free
            </div>
            <div>
              <input
                type='radio'
                value='noFfree'
                name='free'
                onChange={(e) => {
                  setFree(e.target.value)
                }}
              />
              No Free
            </div>
          </div>
          <div className='radioButtonContainer'>
            <label className='label'>Does app support ads?</label>
            <div>
              <input
                type='radio'
                value='adSupported'
                name='adSupported'
                onChange={(e) => {
                  setAdSupported(e.target.value)
                }}
              />
              Ad Supported
            </div>
            <div>
              <input
                type='radio'
                value='noAdSupported'
                name='adSupported'
                onChange={(e) => {
                  setAdSupported(e.target.value)
                }}
              />
              Not Ad Supported
            </div>
          </div>
          <div className='radioButtonContainer'>
            <label className='label'>Does app contain ads?</label>
            <div>
              <input
                type='radio'
                value='adContains'
                name='adContains'
                onChange={(e) => {
                  setContainsAds(e.target.value)
                }}
              />
              Ad Contains
            </div>
            <div>
              <input
                type='radio'
                value='noAdContains'
                name='adContains'
                onChange={(e) => {
                  setContainsAds(e.target.value)
                }}
              />
              Doesn't contains ad
            </div>
          </div>
        </div>
        <button onClick={handleSubmit}>Predict</button>
        {rating && <p>Predicted Rating: {rating}</p>}
      </div>
    </div>
  )
}

export default App
