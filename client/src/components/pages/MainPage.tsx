import { Carousel } from 'react-bootstrap';

export default function MainPage() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://via.placeholder.com/800x400/000000"
          alt="Первый слайд"
        />
        <Carousel.Caption>
          <h3>Надпись первого слайда</h3>
          <p>Некоторый текст о первом слайде.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://via.placeholder.com/800x400/000000"
          alt="Второй слайд"
        />
        <Carousel.Caption>
          <h3>Надпись второго слайда</h3>
          <p>Некоторый текст о втором слайде.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}