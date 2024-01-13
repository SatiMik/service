import { Carousel, Typography } from '@mui/material';
import ExampleCarouselImage from 'components/ExampleCarouselImage';
export default function MainPage() {
  return (
    <Carousel>
      <Carousel.Item>
        <ExampleCarouselImage text="First slide" />
        <Carousel.Caption>
          <Typography variant="h3">First slide label</Typography>
          <Typography variant="body1">Nulla vitae elit libero, a pharetra augue mollis interdum.</Typography>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Second slide" />
        <Carousel.Caption>
          <Typography variant="h3">Second slide label</Typography>
          <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Third slide" />
        <Carousel.Caption>
          <Typography variant="h3">Third slide label</Typography>
          <Typography variant="body1">Praesent commodo cursus magna, vel scelerisque nisl consectetur.</Typography>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>)
}
