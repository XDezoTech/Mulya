export async function createAuctionApi(formData, jwt) {
  const URL = '/api/seller/addAuction';
  try {
    console.log('🔶 Sending FormData entries:');
    for (const [key, val] of formData.entries()) {
      console.log(`  • ${key}:`, val);
    }

    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
        // NOTE: do NOT set Content-Type here
      },
      body: formData,
    });

    // Log status & headers
    console.log('🔷 Response status:', response.status, response.statusText);
    console.log('🔷 Response headers:', Array.from(response.headers.entries()));

    if (!response.ok) {
      // Try JSON error…
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const errJson = await response.json();
        console.error('🔶 Error JSON body:', errJson);
        throw new Error(`Auction creation failed: ${JSON.stringify(errJson)}`);
      } else {
        const errorText = await response.text();
        console.error('🔶 Error text body:', errorText);
        throw new Error(`Auction creation failed: ${errorText}`);
      }
    }

    const message = await response.text();
    console.log('✅ Auction creation response:', message);
    return message;
  } catch (error) {
    console.error('❌ Auction API error:', error);
    throw error;
  }
}
export async function getAllAuction() {
  try {
    const response = await fetch('/api/public/allAuctions', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch auctions');
    }

    const data = await response.json();

    // Convert startTime and endTime to JS Date objects
    const formattedAuctions = data.map((auction) => ({
      ...auction,
      startTime: new Date(...auction.startTime),
      endTime: new Date(...auction.endTime),
    }));

    return formattedAuctions;
  } catch (error) {
    console.error('Error fetching auctions:', error);
    return [];
  }
}
export async function getAuctionByCategory(category) {
  try {
    const response = await fetch(
      `/api/public/categoryWiseAuctions/${category}`,
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch auctions');
    }

    const data = await response.json();

    // Convert startTime and endTime to JS Date objects
    const formattedAuctions = data.map((auction) => ({
      ...auction,
      startTime: new Date(...auction.startTime),
      endTime: new Date(...auction.endTime),
    }));
    console.log(formattedAuctions);

    return formattedAuctions;
  } catch (error) {
    console.error('Error fetching auctions:', error);
    return [];
  }
}
export async function getAuctionById(id) {
  try {
    const response = await fetch(`/api/public/getAuctionById/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch auctions');
    }

    const data = await response.json();

    // Convert startTime and endTime to JS Date objects
    const formattedAuctions = {
      ...data,
      startTime: new Date(...data.startTime),
      endTime: new Date(...data.endTime),
    };
    // console.log(formattedAuctions);

    return formattedAuctions;
  } catch (error) {
    console.error('Error fetching auctions:', error);
    return [];
  }
}
export async function getSearchAuction(search) {
  // Return early if search is empty
  if (!search || search.trim() === '') {
    return [];
  }

  try {
    // console.log(`Searching for: "${search}"`);
    const response = await fetch(
      `/api/public/SearchItem/${encodeURIComponent(search)}`,
      {
        method: 'GET',
      },
    );

    // console.log('Search response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Search API error response:', errorText);
      throw new Error(`Failed to fetch auctions: ${response.status}`);
    }

    const data = await response.json();
    // console.log('Search results:', data);

    // Handle empty results
    if (!data || Object.keys(data).length === 0) {
      return [];
    }

    // Handle array or single object response
    if (Array.isArray(data)) {
      // If it's an array, map through and format each auction
      const formattedAuctions = data.map((auction) => ({
        ...auction,
        startTime: auction.startTime ? new Date(...auction.startTime) : null,
        endTime: auction.endTime ? new Date(...auction.endTime) : null,
      }));
      return formattedAuctions;
    } else {
      // If it's a single object, format it
      const formattedAuction = {
        ...data,
        startTime: data.startTime ? new Date(...data.startTime) : null,
        endTime: data.endTime ? new Date(...data.endTime) : null,
      };
      return formattedAuction;
    }
  } catch (error) {
    console.error('Error fetching auctions:', error);
    // Return empty array instead of throwing, so the UI can handle no results
    return [];
  }
}
