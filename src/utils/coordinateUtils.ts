
export interface LocationCoordinates {
  [key: string]: [number, number];
}

// Enhanced Nigerian coordinates with more precise locations
export const locationCoordinates: LocationCoordinates = {
  // Major Universities with precise coordinates
  'University of Lagos': [3.3972, 6.5158],
  'University of Ibadan': [3.8964, 7.3775],
  'Ahmadu Bello University': [7.6508, 11.1846],
  'University of Port Harcourt': [7.0498, 4.8156],
  'Obafemi Awolowo University': [4.5185, 7.5248],
  'University of Nigeria, Nsukka': [7.4085, 6.8442],
  'Federal University of Technology, Akure': [5.1931, 7.2571],
  'University of Benin': [5.6037, 6.3350],
  'Covenant University': [3.1609, 6.6706],
  'Babcock University': [3.4533, 6.8947],
  'Lagos State University': [3.3470, 6.5802],
  'Federal University of Agriculture, Abeokuta': [3.3440, 7.2441],
  
  // States/Major Cities with precise coordinates
  'Lagos': [3.3792, 6.5244],
  'Abuja': [7.5399, 9.0765],
  'Port Harcourt': [7.0498, 4.8156],
  'Kano': [8.5207, 12.0022],
  'Ibadan': [3.9470, 7.3986],
  'Kaduna': [7.4951, 10.5364],
  'Benin City': [5.6037, 6.3350],
  'Jos': [8.8965, 9.9200],
  'Ilorin': [4.5420, 8.4799],
  'Enugu': [7.5148, 6.4641],
  'Owerri': [7.0240, 5.4840],
  'Calabar': [8.3275, 4.9517],
  'Maiduguri': [13.0059, 11.8469],
  'Sokoto': [5.2339, 13.0585],
  'Akure': [5.1931, 7.2571],
  'Abeokuta': [3.3440, 7.2441],
  'Ado-Ekiti': [5.2209, 7.6134],
  'Lokoja': [6.7338, 7.7997],
  'Minna': [6.5569, 9.6140]
};

export const getCoordinates = (location: string): [number, number] => {
  // Extract the base location name (before comma for universities)
  const baseName = location.includes(',') ? location.split(',')[0].trim() : location;
  return locationCoordinates[baseName] || locationCoordinates[location] || [3.3792, 6.5244]; // Default to Lagos
};

export const calculateDistance = (coord1: [number, number], coord2: [number, number]): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (coord2[1] - coord1[1]) * Math.PI / 180;
  const dLon = (coord2[0] - coord1[0]) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(coord1[1] * Math.PI / 180) * Math.cos(coord2[1] * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const estimateTravelTime = (distance: number): string => {
  // More realistic Nigerian road travel estimates
  const averageSpeed = distance > 200 ? 45 : 55; // Lower speed for longer distances
  const hours = distance / averageSpeed;
  
  if (hours < 1) {
    return `${Math.round(hours * 60)} mins`;
  } else if (hours < 24) {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    return minutes > 0 ? `${wholeHours}h ${minutes}m` : `${wholeHours}h`;
  }
  return `${Math.round(hours)} hours`;
};

export const formatDistance = (km: number): string => {
  if (km < 1) {
    return `${Math.round(km * 1000)}m`;
  }
  return `${Math.round(km)}km`;
};
