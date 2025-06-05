
// Nigerian university coordinates
const universityCoordinates: Record<string, [number, number]> = {
  "Babcock University, Ilishan-Remo": [3.9056, 6.8926],
  "Afe Babalola University, Ado-Ekiti": [5.2314, 7.6134],
  "Redeemer's University, Ede": [4.4522, 7.7319],
  "Bowen University, Iwo": [4.1830, 7.6306],
  "Covenant University, Ota": [3.1590, 6.6720],
  "Lead City University, Ibadan": [3.9027, 7.3775],
  "Pan-Atlantic University, Lagos": [3.3792, 6.5244],
  "Landmark University, Omu-Aran": [5.1027, 8.1449],
  "American University of Nigeria, Yola": [12.4964, 9.2001],
  "University of Lagos": [3.4006, 6.5244],
  "University of Ibadan": [3.9027, 7.3775],
  "Ahmadu Bello University": [7.6667, 11.2167],
  "University of Nigeria, Nsukka": [7.4167, 6.8667],
  "Obafemi Awolowo University": [4.5167, 7.5167],
  "University of Benin": [5.6167, 6.3167],
  "University of Port Harcourt": [7.0167, 4.8333],
  "University of Ilorin": [4.6667, 8.5000],
  "Federal University of Technology, Akure": [5.2167, 7.2500],
  "Lagos State University": [3.3500, 6.6167],
  "Delta State University": [5.8833, 6.2667]
};

// Nigerian state coordinates (approximate centers)
const stateCoordinates: Record<string, [number, number]> = {
  "Abia": [7.5248, 5.4527],
  "Adamawa": [12.3984, 9.3265],
  "Akwa Ibom": [7.8500, 5.0500],
  "Anambra": [6.2209, 6.4981],
  "Bauchi": [10.3134, 9.8400],
  "Bayelsa": [6.0699, 4.7719],
  "Benue": [8.7336, 7.3336],
  "Borno": [13.0760, 11.8311],
  "Cross River": [8.3270, 5.9631],
  "Delta": [6.1992, 5.6815],
  "Ebonyi": [8.1137, 6.2649],
  "Edo": [6.3350, 5.6037],
  "Ekiti": [7.7193, 5.3110],
  "Enugu": [7.4951, 6.4187],
  "FCT - Abuja": [7.3986, 9.0765],
  "Gombe": [11.1717, 10.2900],
  "Imo": [7.0256, 5.4527],
  "Jigawa": [12.2924, 9.3526],
  "Kaduna": [10.5105, 7.4165],
  "Kano": [8.5177, 11.9416],
  "Katsina": [12.9908, 7.6178],
  "Kebbi": [12.4639, 4.1975],
  "Kogi": [6.7401, 7.7999],
  "Kwara": [4.5795, 8.9669],
  "Lagos": [3.3792, 6.5244],
  "Nasarawa": [8.5371, 8.5447],
  "Niger": [6.5569, 9.0820],
  "Ogun": [3.3500, 7.1608],
  "Ondo": [4.8395, 7.2538],
  "Osun": [4.5521, 7.5629],
  "Oyo": [3.9470, 8.0037],
  "Plateau": [9.7179, 8.8965],
  "Rivers": [7.0498, 4.8156],
  "Sokoto": [5.2339, 13.0059],
  "Taraba": [9.7799, 8.0037],
  "Yobe": [11.7466, 12.2924],
  "Zamfara": [6.2649, 12.1658]
};

// Nigerian cities and their coordinates for location suggestions
export const nigerianCities: Record<string, [number, number]> = {
  // Lagos State
  "Lagos": [3.3792, 6.5244],
  "Ikeja": [3.3375, 6.5952],
  "Victoria Island": [3.4244, 6.4281],
  "Ikoyi": [3.4467, 6.4581],
  "Surulere": [3.3517, 6.5028],
  "Yaba": [3.3792, 6.5156],
  "Agege": [3.2339, 6.6156],
  
  // Ogun State
  "Abeokuta": [3.3458, 7.1475],
  "Sagamu": [3.6467, 6.8319],
  "Ijebu-Ode": [3.9178, 6.8194],
  "Ota": [3.1590, 6.6720],
  
  // Oyo State
  "Ibadan": [3.9027, 7.3775],
  "Ogbomoso": [4.2667, 8.1333],
  "Iseyin": [3.5833, 7.9833],
  "Oyo": [3.9333, 7.8500],
  
  // Kano State
  "Kano": [8.5177, 11.9416],
  
  // FCT
  "Abuja": [7.3986, 9.0765],
  "Gwagwalada": [7.0833, 8.9500],
  
  // Rivers State
  "Port Harcourt": [7.0167, 4.8333],
  
  // Kaduna State
  "Kaduna": [7.4165, 10.5105],
  "Zaria": [7.7167, 11.0833],
  
  // Plateau State
  "Jos": [8.8965, 9.7179],
  
  // Enugu State
  "Enugu": [7.4951, 6.4187],
  
  // Delta State
  "Warri": [5.7500, 5.5167],
  "Asaba": [6.2209, 6.1981],
  
  // Cross River State
  "Calabar": [8.3270, 4.9588],
  
  // Akwa Ibom State
  "Uyo": [7.9333, 5.0333]
};

export const getCoordinates = (location: string): [number, number] => {
  // Check universities first
  if (universityCoordinates[location]) {
    return universityCoordinates[location];
  }
  
  // Check states
  if (stateCoordinates[location]) {
    return stateCoordinates[location];
  }
  
  // Check cities
  if (nigerianCities[location]) {
    return nigerianCities[location];
  }
  
  // Default to Lagos if location not found
  console.warn(`Location "${location}" not found in coordinates database. Using Lagos as default.`);
  return [3.3792, 6.5244];
};

export const calculateDistance = (coord1: [number, number], coord2: [number, number]): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (coord2[1] - coord1[1]) * Math.PI / 180;
  const dLon = (coord2[0] - coord1[0]) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coord1[1] * Math.PI / 180) * Math.cos(coord2[1] * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const estimateTravelTime = (distanceKm: number): string => {
  const averageSpeedKmh = 60; // Average highway speed
  const timeHours = distanceKm / averageSpeedKmh;
  
  if (timeHours < 1) {
    return `${Math.round(timeHours * 60)} minutes`;
  } else {
    const hours = Math.floor(timeHours);
    const minutes = Math.round((timeHours - hours) * 60);
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }
};

export const formatDistance = (distanceKm: number): string => {
  return `${Math.round(distanceKm)} km`;
};

// Location suggestion function for autocomplete
export const getLocationSuggestions = (query: string, type: 'state' | 'city' = 'city'): string[] => {
  if (!query || query.length < 2) return [];
  
  const searchQuery = query.toLowerCase();
  
  if (type === 'city') {
    return Object.keys(nigerianCities)
      .filter(city => city.toLowerCase().includes(searchQuery))
      .slice(0, 10); // Limit to 10 suggestions
  } else {
    return Object.keys(stateCoordinates)
      .filter(state => state.toLowerCase().includes(searchQuery))
      .slice(0, 10);
  }
};
