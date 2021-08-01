import { ReactElement } from 'react';
import NavMenu from '@components/NavMenu';
import CategoryFilter from '@components/CategoryFilter';
import ProductList from '@components/ProductList';
import CartSidebar from '@components/CartSidebar';

export default function Home(): ReactElement {
  return (
    <div>
      <NavMenu />
      <main className="px-[100px] py-[24px]">
        <CategoryFilter />
        <ProductList />

        {/* Cart */}
        <CartSidebar />
      </main>
    </div>
  );
}
