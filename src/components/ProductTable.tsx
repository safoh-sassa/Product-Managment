import React from 'react';
import styled from 'styled-components';
import { ProductTableProps } from './types';

// Styled Components
const StyledTable = styled.table`
  margin-top: 20px;
  width: 100%;
  tbody tr:nth-child(odd) {
    background-color: #3fba3b !important;
  }

  tbody tr:nth-child(even) {
    background-color: #f9a70e !important;
  }

  tbody tr:hover {
    background-color: #4dc5e1 !important;
  }

  tbody tr,
  tbody td,
  thead th {
    border: 2px solid black !important;
  }
`;

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
    return (
        <StyledTable>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Payment Type</th>
                    <th>Occurrence on Market</th>
                </tr>
            </thead>
            {products.length > 0 ? (
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.payment}</td>
                            <td>{product.occurrence ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            ) : (
                <tbody>
                    <tr>
                        <td colSpan={3} style={{ textAlign: 'center' }}>
                            <b>Table is empty</b>
                        </td>
                    </tr>
                </tbody>
            )}
        </StyledTable>
    );
};

export default ProductTable;
