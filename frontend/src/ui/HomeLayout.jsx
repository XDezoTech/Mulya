import { Outlet } from 'react-router-dom';
import Hero from './Hero';
import Selection from './Selection';

function HomeLayout() {
  return (
    <div className="mx-auto w-90/100">
      <Hero />
      <Selection />
      {/* Pass auctions as context to Outlet */}
      <Outlet />
    </div>
  );
}

export default HomeLayout;

// import { Outlet } from 'react-router-dom';
// import Hero from './Hero';
// import Selection from './Selection';
// import { useParams } from 'react-router-dom';
// import { useGetAuctionByCategory } from '../features/auctions/useAuction';

// function HomeLayout() {
//   const { category } = useParams();
//   const { auctions, isLoading, error } = useGetAuctionByCategory(category);

//   if (isLoading) return <p>Loading {category}…</p>;
//   if (error) return <p>Failed to load auctions for {category}.</p>;

//   return (
//     <div className="mx-auto w-90/100">
//       <Hero />
//       <Selection />
//       {/* Pass auctions as context to Outlet */}
//       <Outlet context={auctions} />
//     </div>
//   );
// }

// export default HomeLayout;
