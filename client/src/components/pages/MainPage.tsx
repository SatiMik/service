import { Carousel } from 'react-bootstrap';

export default function MainPage() {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1 style={{ fontSize: '32px', color: '#2e3b55', marginBottom: '20px' }}>Добро пожаловать на наш сайт!</h1>
        <p style={{ fontSize: '18px', marginBottom: '10px' }}>Здесь вы найдете нужную вам информацию.</p>
        <p style={{ fontSize: '18px', marginBottom: '10px' }}>Исследуйте раздел сервисы после авторизации пользователя</p>
        {/* <Link to="/articles" style={{ fontSize: '20px', color: '#2e3b55', textDecoration: 'none', padding: '10px 20px', border: '2px solid #2e3b55', borderRadius: '5px', transition: 'background-color 0.3s, color 0.3s' }}>Перейти к статьям</Link> */}
      </div>
  );
}