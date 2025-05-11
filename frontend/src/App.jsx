// App.jsx
import React from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

// Layouts & Pages
import Applayout from './ui/Applayout';
import HomeLayout from './ui/HomeLayout';
import Explore from './pages/Selection/Explore';
import CardView from './pages/CardView';
import SellItem from './pages/SellItem';
import PageNotFound from './pages/PageNotFound';

// Individual category pages
import Books from './pages/Selection/Books';
import Clothes from './pages/Selection/Clothes';
import Art from './pages/Selection/Art';
import Collectibles from './pages/Selection/Collectibles';
import Electronics from './pages/Selection/Electronics';
import Furniture from './pages/Selection/Furniture';
import Jewelry from './pages/Selection/Jewelry';
import RealEstate from './pages/Selection/RealEstate';
import Sports from './pages/Selection/Sports';
import Vehicles from './pages/Selection/Vehicles';
import Watches from './pages/Selection/Watches';

// Map route param to component
const categoryComponents = {
  books: Books,
  clothes: Clothes,
  art: Art,
  collectibles: Collectibles,
  electronics: Electronics,
  furniture: Furniture,
  jewelry: Jewelry,
  realestate: RealEstate,
  sports: Sports,
  vehicles: Vehicles,
  watches: Watches,
};

// Router component that renders the matching category page or a 404
function CategoryRouter() {
  const { category } = useParams();
  const Component = categoryComponents[category];
  return Component ? <Component /> : <PageNotFound />;
}

function App() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 60 * 1000 } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<Applayout />}>
            <Route index element={<Navigate replace to="home" />} />

            <Route path="home" element={<HomeLayout />}>
              <Route index element={<Explore />} />
              {/* Dynamic category routing replaces individual static routes */}
              <Route path=":category" element={<CategoryRouter />} />
            </Route>

            <Route path="card/:id" element={<CardView />} />
            <Route path="sellItem" element={<SellItem />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'var(--color-grey-0)',
            color: 'var(--color-grey-700)',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
