import { useGetAuctionByCategory } from '../../features/auctions/useAuction';
import Card from '../../ui/Card';
import Filter from '../../ui/Filter';
import Spinner from '../../ui/Spinner';

function Books() {
  const { auctions, isLoading, error } = useGetAuctionByCategory('books');

  if (isLoading) return <Spinner />;
  if (error) return <p>Failed to load books auctions.</p>;

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

export default Books;
