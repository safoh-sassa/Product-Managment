import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import { Product, ProductFormProps } from './types';

// Styled Components
const FormContainer = styled.div`
  max-width: 500px;
  margin: auto;
  margin-top: 19px;
  background-color: #01335c;
  color: white;
  padding: 20px;
`;

const SubmitButton = styled.button`
  margin-top: 15px;
  margin-bottom: 15px;
  background-color: #3fba3b;
`;

const BoldLabel = styled(Form.Label)`
  font-weight: bold;
`;

const BoldCheckBox = styled(Form.Check.Label)`
  font-weight: bold;
`;

const ProductForm: React.FC<ProductFormProps> = ({ updateProducts }) => {
    const [product, setProduct] = useState<Product>({
        name: '',
        payment: 'Not specified',
        occurrence: false,
    });

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handlePaymentChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value as 'reimbursed' | 'unreimbursed' | 'not specified',
        }));
    };

    const handleOccurrenceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Store product data in localStorage
        const storedProducts = localStorage.getItem('products');
        let products: Product[] = storedProducts ? JSON.parse(storedProducts) : [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));

        // Reset form fields
        setProduct({
            name: '',
            payment: 'Not specified',
            occurrence: false,
        });

        // Call updateProducts function to update the table
        updateProducts();
    };

    return (
        <FormContainer>
            <center><h2>Add Product</h2></center>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="productName">
                    <BoldLabel>Product Name</BoldLabel>
                    <Form.Control
                        type="text"
                        placeholder="Enter product"
                        name="name"
                        value={product.name}
                        onChange={handleNameChange}
                        required
                        className="w-50"
                    />
                </Form.Group>
                <br />
                <Form.Group controlId="paymentType">
                    <BoldLabel>Payment Type</BoldLabel>
                    <Form.Control
                        as="select"
                        name="payment"
                        value={product.payment}
                        onChange={handlePaymentChange}
                        className="w-50"
                    >
                        <option value="Not specified">Not Specified</option>
                        <option value="Reimbursed">Reimbursed</option>
                        <option value="Unreimbursed">Unreimbursed</option>
                    </Form.Control>
                </Form.Group>
                <br />
                <Form.Group controlId="occurrenceCheckbox">
                    <Form.Check
                        type="checkbox"
                        label={<BoldCheckBox>Occurrence on Market</BoldCheckBox>}
                        name="occurrence"
                        checked={product.occurrence}
                        onChange={handleOccurrenceChange}
                    />
                </Form.Group>
                <SubmitButton type="submit">
                    Add Product
                </SubmitButton>
            </Form>
        </FormContainer>
    );
};

export default ProductForm;
