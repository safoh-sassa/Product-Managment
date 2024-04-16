export interface Product {
    name: string;
    payment: 'Reimbursed' | 'Unreimbursed' | 'Not specified';
    occurrence: boolean;
}

export interface ProductFormProps {
    updateProducts: () => void;
}

export interface ProductTableProps {
    products: Product[];
}