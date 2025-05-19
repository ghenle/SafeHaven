let config = {
  URLs: {
    locationData: '/api/locations.min.json'
  },
  color: {
    bad: '#C00',
    good: '#0C0'
  },
  google: {
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    query: {
      latlng: null,
      key: 'AIzaSyBXE7zPn59KNoPnLVbkLiTYpOaRlfzZOzY'
    }
  }
}

export { config };
