import React from 'react'
import ReactDOM from 'react-dom'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Cropper from 'react-easy-crop'
import ImgDialog from './ImgDialog'
import getCroppedImg from './cropImage'
import './styles.css'

const minZoom = 0.4

class App extends React.Component {
  state = {
    imageSrc:
      'https://ae01.alicdn.com/kf/HTB1AboSJFXXXXXZXpXXq6xXFXXX8/New-6-5x10ft-Studio-Photo-Backdrop-Screen-Hot-Selling-Green-Nature-Landscape-Photography-Wedding-Portrait-Background.jpg_640x640.jpg',
    crop: { x: 0, y: 0 },
    zoom: minZoom,
    aspect: 4 / 3,
    croppedAreaPixels: null,
    croppedImage: null,
  }

  onCropChange = (crop) => {
    this.setState({ crop })
  }

  onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
    this.setState({ croppedAreaPixels })
  }

  onZoomChange = (zoom) => {
    this.setState({ zoom })
  }

  showCroppedImage = async () => {
    const croppedImage = await getCroppedImg(
      this.state.imageSrc,
      this.state.croppedAreaPixels
    )
    console.log(croppedImage)
    this.setState({ croppedImage })
  }

  handleClose = () => {
    this.setState({ croppedImage: null })
  }

  render() {
    const { classes } = this.props
    return (
      <div className="App">
        <div className="crop-container">
          <Cropper
            minZoom={minZoom}
            image={this.state.imageSrc}
            crop={this.state.crop}
            zoom={this.state.zoom}
            aspect={this.state.aspect}
            restrictPosition={false}
            onCropChange={this.onCropChange}
            onCropComplete={this.onCropComplete}
            onZoomChange={this.onZoomChange}
          />
        </div>
        <div className="controls">
          <Slider
            value={this.state.zoom}
            min={minZoom}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e, zoom) => this.onZoomChange(zoom)}
            classes={{ container: 'slider' }}
          />
          <Button
            onClick={this.showCroppedImage}
            variant="contained"
            color="primary"
            classes={{ root: classes.cropButton }}
          >
            Show Img
          </Button>
        </div>
        <ImgDialog img={this.state.croppedImage} onClose={this.handleClose} />
      </div>
    )
  }
}

const styles = {
  cropButton: {
    flexShrink: 0,
    marginLeft: 16,
  },
}

const StyledApp = withStyles(styles)(App)

const rootElement = document.getElementById('root')
ReactDOM.render(<StyledApp />, rootElement)
