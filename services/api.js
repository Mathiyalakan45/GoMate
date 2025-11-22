import axios from 'axios';

// Base URL - Using dummyjson.com for mock data or you can replace with your API
const BASE_URL = 'https://dummyjson.com';

// Mock transport routes data
const MOCK_ROUTES = [
  {
    id: 1,
    title: 'City Center Express',
    description: 'Fast route from downtown to airport',
    status: 'Available',
    type: 'Bus',
    duration: '45 min',
    distance: '15 km',
    cost: '$3.50',
    stops: 12,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400',
  },
  {
    id: 2,
    title: 'North Station Line',
    description: 'Direct connection to northern suburbs',
    status: 'Available',
    type: 'Train',
    duration: '30 min',
    distance: '20 km',
    cost: '$4.00',
    stops: 8,
    image: 'https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?w=400',
  },
  {
    id: 3,
    title: 'East-West Corridor',
    description: 'Connecting east and west districts',
    status: 'Upcoming',
    type: 'Bus',
    duration: '55 min',
    distance: '25 km',
    cost: '$3.00',
    stops: 18,
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400',
  },
  {
    id: 4,
    title: 'River View Express',
    description: 'Scenic route along the river',
    status: 'Available',
    type: 'Train',
    duration: '40 min',
    distance: '18 km',
    cost: '$3.75',
    stops: 10,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
  },
  {
    id: 5,
    title: 'Metro Line 2',
    description: 'Underground rapid transit service',
    status: 'Available',
    type: 'Metro',
    duration: '25 min',
    distance: '12 km',
    cost: '$2.50',
    stops: 6,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
  },
  {
    id: 6,
    title: 'Coastal Route',
    description: 'Beautiful beachfront connection',
    status: 'Upcoming',
    type: 'Bus',
    duration: '60 min',
    distance: '30 km',
    cost: '$4.50',
    stops: 15,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
  },
  // --- NEW ROUTES ADDED BELOW ---
  {
    id: 7,
    title: 'Tech Park Shuttle',
    description: 'Direct commuter service to Tech Hub',
    status: 'Available',
    type: 'Bus',
    duration: '35 min',
    distance: '10 km',
    cost: '$2.00',
    stops: 5,
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400',
  },
  {
    id: 8,
    title: 'Highland Rail',
    description: 'Scenic mountain view journey',
    status: 'Available',
    type: 'Train',
    duration: '1 h 15 min',
    distance: '45 km',
    cost: '$8.50',
    stops: 4,
    // UPDATED IMAGE: Scenic Train
    image: 'https://images.unsplash.com/photo-1561131668-f635d4bfab7e?w=400',
  },
  {
    id: 9,
    title: 'Downtown Loop',
    description: 'Frequent city center circular route',
    status: 'Available',
    type: 'Metro',
    duration: '40 min',
    distance: '8 km',
    cost: '$1.50',
    stops: 14,
    image: 'https://images.unsplash.com/photo-1617103996702-96ff29b1c467?w=400',
  },
  {
    id: 10,
    title: 'Night Owl Service',
    description: 'Late night safe transport',
    status: 'Upcoming',
    type: 'Bus',
    duration: '50 min',
    distance: '22 km',
    cost: '$5.00',
    stops: 20,
    // UPDATED IMAGE: Night Transport/Neon
    image: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=400',
  },
  {
    id: 11,
    title: 'Stadium Special',
    description: 'Event day transport to Arena',
    status: 'Upcoming',
    type: 'Train',
    duration: '20 min',
    distance: '15 km',
    cost: '$3.00',
    stops: 3,
    // UPDATED IMAGE: Stadium
    image: 'https://images.unsplash.com/photo-1489440543286-a69330151c0b?w=400',
  },
];

// Fetch routes - simulating API call
export const fetchRoutes = async () => {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    return MOCK_ROUTES;
  } catch (error) {
    throw new Error('Failed to fetch routes');
  }
};

// Alternative: Fetch from real API (if you have one)
export const fetchRoutesFromAPI = async () => {
  try {
    // Example: Using dummyjson products as placeholder
    const response = await axios.get(`${BASE_URL}/products?limit=6`);
    // Transform the data to match our route structure
    return response.data.products.map((product, index) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      status: index % 2 === 0 ? 'Available' : 'Upcoming',
      type: ['Bus', 'Train', 'Metro'][index % 3],
      duration: `${20 + index * 5} min`,
      distance: `${10 + index * 2} km`,
      cost: `$${(2.5 + index * 0.5).toFixed(2)}`,
      stops: 5 + index * 2,
      image: product.images[0] || MOCK_ROUTES[index % MOCK_ROUTES.length].image,
    }));
  } catch (error) {
    // Fallback to mock data on error
    return MOCK_ROUTES;
  }
};