import axios from 'axios';

// MOCK DATA - Satisfies the "Mock JSON" requirement for the Transport domain
const MOCK_ROUTES = [
  {
    id: 1,
    title: 'City Center Express',
    description: 'Fast route from downtown to airport with minimal stops.',
    status: 'Available',
    type: 'Bus',
    duration: '45 min',
    distance: '15 km',
    cost: '$3.50',
    stops: 12,
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=500&q=80',
  },
  {
    id: 2,
    title: 'North Station Line',
    description: 'Direct electric train connection to northern suburbs.',
    status: 'Available',
    type: 'Train',
    duration: '30 min',
    distance: '20 km',
    cost: '$4.00',
    stops: 8,
    image: 'https://images.unsplash.com/photo-1474487548417-781cb714c2f0?w=500&q=80',
  },
  {
    id: 3,
    title: 'Metro Line 2',
    description: 'Underground rapid transit service looping the business district.',
    status: 'Available',
    type: 'Metro',
    duration: '25 min',
    distance: '12 km',
    cost: '$2.50',
    stops: 6,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80',
  },
  {
    id: 4,
    title: 'Coastal Route',
    description: 'Scenic bus route along the coastline, perfect for tourists.',
    status: 'Upcoming',
    type: 'Bus',
    duration: '60 min',
    distance: '30 km',
    cost: '$4.50',
    stops: 15,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&q=80',
  },
  {
    id: 5,
    title: 'Highland Rail',
    description: 'Scenic mountain view journey with premium seating.',
    status: 'Available',
    type: 'Train',
    duration: '1 h 15 min',
    distance: '45 km',
    cost: '$8.50',
    stops: 4,
    image: 'https://images.unsplash.com/photo-1561131668-f635d4bfab7e?w=500&q=80',
  },
  {
    id: 6,
    title: 'Night Owl Service',
    description: 'Late night safe transport running every hour.',
    status: 'Available',
    type: 'Bus',
    duration: '50 min',
    distance: '22 km',
    cost: '$5.00',
    stops: 20,
    image: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=500&q=80',
  },
  {
    id: 7,
    title: 'Stadium Special',
    description: 'Direct shuttle to the National Stadium on event days.',
    status: 'Upcoming',
    type: 'Bus',
    duration: '20 min',
    distance: '15 km',
    cost: '$3.00',
    stops: 3,
    image: 'https://images.unsplash.com/photo-1489440543286-a69330151c0b?w=500&q=80',
  },
  {
    id: 8,
    title: 'River View Express',
    description: 'Commuter train running parallel to the city river.',
    status: 'Available',
    type: 'Train',
    duration: '40 min',
    distance: '18 km',
    cost: '$3.75',
    stops: 10,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&q=80',
  },
];

export const fetchRoutes = async () => {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return MOCK_ROUTES;
  } catch (error) {
    throw new Error('Failed to fetch routes');
  }
};