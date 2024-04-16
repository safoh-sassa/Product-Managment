import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';
import { Product } from './components/types';

// Styled Components
const AppContainer = styled(Container)`
  margin-top: 50px;
`;

const AppHeading = styled.h2`
  color: #4dc5e1;
`;

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Function to update products
  const updateProducts = () => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  };

  useEffect(() => {
    updateProducts();
  }, []);

  return (
    <AppContainer>
      <AppHeading>Product Management</AppHeading>
      <Row>
        <Col md={5}>
          <ProductTable products={products} />
        </Col>
        <Col md={5}>
          <ProductForm updateProducts={updateProducts} />
        </Col>
      </Row>
    </AppContainer>
  );
};

export default App;
