import React, { useState, useMemo } from 'react';
import { MapPin, Clock, Star, Filter, Search, Calendar, Users } from 'lucide-react';

const grounds = [
  {
    id: 1,
    name: "Green Field Turf",
    location: "Sector 21, Delhi",
    distance: "2.3 km",
    rating: 4.5,
    reviews: 127,
    price: 800,
    sports: ["Football", "Cricket"],
    amenities: ["Parking", "Washroom", "Lighting"],
    availableSlots: [
      { time: "7-9 AM", available: true, price: 800 },
      { time: "5-7 PM", available: true, price: 1000 },
      { time: "7-9 PM", available: false, price: 1000 }
    ],
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=250&fit=crop"
  },
  {
    id: 2,
    name: "NCU Sports Complex",
    location: "Gurgaon",
    distance: "5.7 km",
    rating: 4.2,
    reviews: 89,
    price: 600,
    sports: ["Badminton", "Basketball"],
    amenities: ["AC", "Parking", "Cafeteria"],
    availableSlots: [
      { time: "6-8 AM", available: true, price: 600 },
      { time: "4-6 PM", available: true, price: 800 },
      { time: "8-10 PM", available: true, price: 900 }
    ],
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=250&fit=crop"
  },
  {
    id: 3,
    name: "Alpha Stadium",
    location: "Noida",
    distance: "8.1 km",
    rating: 4.7,
    reviews: 203,
    price: 1200,
    sports: ["Football", "Athletics"],
    amenities: ["Premium Facilities", "Coaching", "Equipment"],
    availableSlots: [
      { time: "9-11 AM", available: true, price: 1200 },
      { time: "6-8 PM", available: true, price: 1500 },
      { time: "8-10 PM", available: false, price: 1500 }
    ],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop"
  },
  {
    id: 4,
    name: "PlayZone Arena",
    location: "Dwarka, Delhi",
    distance: "4.2 km",
    rating: 4.3,
    reviews: 156,
    price: 700,
    sports: ["Tennis", "Squash"],
    amenities: ["Indoor", "AC", "Pro Shop"],
    availableSlots: [
      { time: "8-10 AM", available: true, price: 700 },
      { time: "2-4 PM", available: true, price: 700 },
      { time: "6-8 PM", available: true, price: 900 }
    ],
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=250&fit=crop"
  }
];

const EnhancedGrounds = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [sortBy, setSortBy] = useState('distance');
  const [selectedGround, setSelectedGround] = useState(null);
  const [bookingSlot, setBookingSlot] = useState(null);

  const allSports = [...new Set(grounds.flatMap(g => g.sports))];

  const filteredAndSortedGrounds = useMemo(() => {
    let filtered = grounds.filter(ground => {
      const matchesSearch = ground.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ground.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSport = !selectedSport || ground.sports.includes(selectedSport);
      return matchesSearch && matchesSport;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'distance':
        default:
          return parseFloat(a.distance) - parseFloat(b.distance);
      }
    });
  }, [searchTerm, selectedSport, sortBy]);

  const handleBooking = (ground, slot) => {
    setSelectedGround(ground);
    setBookingSlot(slot);
  };

  const confirmBooking = () => {
    alert(`Booking confirmed for ${selectedGround.name} at ${bookingSlot.time} for ₹${bookingSlot.price}`);
    setSelectedGround(null);
    setBookingSlot(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Find Sports Grounds</h1>
              <p className="text-gray-600 mt-1">Book your favorite sports venue instantly</p>
            </div>
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3 lg:min-w-96">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search grounds or locations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
              >
                <option value="">All Sports</option>
                {allSports.map(sport => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>
              
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="distance">Sort by Distance</option>
                <option value="price">Sort by Price</option>
                <option value="rating">Sort by Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <p className="text-gray-600">
          {filteredAndSortedGrounds.length} ground{filteredAndSortedGrounds.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Grounds Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedGrounds.map((ground) => (
            <div key={ground.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              {/* Ground Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={ground.image} 
                  alt={ground.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                  <span className="text-sm font-semibold text-green-600">₹{ground.price}+</span>
                </div>
              </div>

              <div className="p-5">
                {/* Ground Info */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{ground.name}</h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {ground.location} • {ground.distance}
                    </div>
                  </div>
                  <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span className="text-sm font-semibold">{ground.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">({ground.reviews})</span>
                  </div>
                </div>

                {/* Sports Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {ground.sports.map((sport, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
                      {sport}
                    </span>
                  ))}
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {ground.amenities.slice(0, 3).map((amenity, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                      {amenity}
                    </span>
                  ))}
                  {ground.amenities.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                      +{ground.amenities.length - 3} more
                    </span>
                  )}
                </div>

                {/* Available Slots */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Available Today
                  </h4>
                  <div className="space-y-1">
                    {ground.availableSlots.map((slot, idx) => (
                      <div key={idx} className={`flex items-center justify-between p-2 rounded-lg border ${
                        slot.available ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                      }`}>
                        <div className="flex items-center">
                          <span className={`text-sm ${slot.available ? 'text-green-700' : 'text-gray-500'}`}>
                            {slot.time}
                          </span>
                          {!slot.available && (
                            <span className="ml-2 text-xs bg-red-100 text-red-600 px-1 py-0.5 rounded">
                              Booked
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-semibold ${slot.available ? 'text-green-700' : 'text-gray-500'}`}>
                            ₹{slot.price}
                          </span>
                          {slot.available && (
                            <button
                              onClick={() => handleBooking(ground, slot)}
                              className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-md transition-colors"
                            >
                              Book
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedGrounds.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No grounds found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedGround && bookingSlot && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Booking</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Ground:</span>
                <span className="font-semibold">{selectedGround.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-semibold">{selectedGround.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time Slot:</span>
                <span className="font-semibold">{bookingSlot.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-semibold">Today</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-gray-900 font-semibold">Total Amount:</span>
                <span className="font-bold text-blue-600">₹{bookingSlot.price}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {setSelectedGround(null); setBookingSlot(null);}}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedGrounds;