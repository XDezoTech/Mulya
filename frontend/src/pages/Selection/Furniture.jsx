import { useGetAuctionByCategory } from '../../features/auctions/useAuction';
import Card from '../../ui/Card';
import Filter from '../../ui/Filter';

function Furniture() {
  const { auctions, isLoading, error } = useGetAuctionByCategory('furniture');

  if (isLoading) return <p>Loading furniture…</p>;
  if (error) return <p>Failed to load furniture auctions.</p>;

  return (
    <div className="container mx-auto grid grid-cols-12 gap-6 px-4 py-6">
      <Filter />
      <section className="col-span-9 grid grid-cols-3 gap-4">
        {auctions.map((item, idx) => (
          <div
            key={item.auctionTitle}
            className="cursor-pointer rounded-lg bg-white shadow-sm"
          >
            <Card key={idx} {...item} />
          </div>
        ))}
      </section>
    </div>
  );
}

export default Furniture;

// import { useOutletContext } from 'react-router-dom';

// function Furniture() {
//   const { auctions } = useOutletContext(); // Access auctions from context

//   return (
//     <div>
//       <h1>Furniture Auctions</h1>
//       <ul>
//         {auctions && auctions.length > 0 ? (
//           auctions.map((auction, index) => (
//             <li key={auction.id || index}>
//               {' '}
//               {/* Use auction.id or fallback to index */}
//               <h2>{auction.title}</h2>
//               <p>{auction.description}</p>
//             </li>
//           ))
//         ) : (
//           <p>No auctions available for this category.</p>
//         )}
//       </ul>
//     </div>
//   );
// }

// export default Furniture;
