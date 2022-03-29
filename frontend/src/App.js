import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {

  return (
    <div>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Welcome to Adey-Abeba</h1>
        </Container>        
      </main>
      <Footer />
    </div>
  );
};

export default App;
