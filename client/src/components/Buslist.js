import React, { useState } from 'react';
import './buslist.css';
import { useHistory } from 'react-router-dom';




const Bus = ({ id, route, from, destination, departureTime, journeyDate }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [paymentEnabled, setPaymentEnabled] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [passengerNames, setPassengerNames] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [ticketBooked, setTicketBooked] = useState(false); // New state for ticket booked message
  const seatPrices = [500,500,500,500,500,500,500,500,500,500,500,500,500,500,500,500,500,500,500,500];

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSeatSelection = (seatNumber) => {
    const alreadySelected = selectedSeats.includes(seatNumber);
    if (alreadySelected) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const confirmSeats = () => {
    setPaymentEnabled(true);
    const amount = selectedSeats.reduce((total, seatNumber) => total + seatPrices[seatNumber - 1], 0);
    setTotalAmount(amount);
  };

  const handlePayment = () => {
    console.log("Payment done with method:", paymentMethod);
    setShowPaymentForm(true);
  };

  const handleTicketBooking = () => {
    setTicketBooked(true);
    setShowPaymentForm(false); // Hide payment form after booking tickets
  };

  const handlePassengerNameChange = (index, name) => {
    const updatedPassengerNames = [...passengerNames];
    updatedPassengerNames[index] = name;
    setPassengerNames(updatedPassengerNames);
  };

  const totalSeats = 20; 
  const seatsPerRow = 5; 
  const rows = Math.ceil(totalSeats / seatsPerRow);

  return (
    <div className="bus">
      <p>Bus {id}: Route {route}, From {from}, Destination {destination}, Departure Time {departureTime}, Journey Date {journeyDate}</p>
      <div className='button'>
        <button onClick={toggleModal}>Book Seat</button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>&times;</span>
            <p>Select seats:</p>
            <div className="seats">
              {[...Array(rows)].map((_, rowIndex) => (
                <div key={rowIndex} className="seat-row">
                  {[...Array(seatsPerRow)].map((_, index) => {
                    const seatNumber = rowIndex * seatsPerRow + index + 1;
                    const price = seatPrices[seatNumber - 1] || 0;
                    return (
                      seatNumber <= totalSeats && (
                        <div key={seatNumber} className="seat-container">
                          <button
                            className={selectedSeats.includes(seatNumber) ? "selected" : ""}
                            onClick={() => handleSeatSelection(seatNumber)}
                          >
                            {seatNumber}
                          </button>
                          <div className="price-label">&#8377;{price}</div>
                        </div>
                      )
                    );
                  })}
                </div>
              ))}
            </div>
            <button className="confirm-button" onClick={confirmSeats}>Confirm Seats</button>
          </div>
        </div>
      )}
      {paymentEnabled && (
        <div className="payment">
          <h3>Total Amount: &#8377;{totalAmount}</h3>
          {selectedSeats.map((seat, index) => (
            <input
              key={seat}
              type="text"
              placeholder={`Passenger ${index + 1} Name`}
              value={passengerNames[index] || ''}
              onChange={(e) => handlePassengerNameChange(index, e.target.value)}
            />
          ))}
          <div className="payment-methods">
            <button onClick={() => setPaymentMethod("credit_card")}>Credit Card</button>
            <button onClick={() => setPaymentMethod("debit_card")}>Debit Card</button>
          </div>
          <button className="pay-button" onClick={handlePayment}>Pay Now</button>
        </div>
      )}
      {showPaymentForm && (
        <div className="payment-form">
          <h3>Enter Card Details</h3>
          <div>
            <label htmlFor="cardNumber">Card Number:</label>
            <input type="text" id="cardNumber" name="cardNumber" />
          </div>
          <div>
            <label htmlFor="expiryDate">Expiry Date:</label>
            <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YYYY" />
          </div>
          <div>
            <label htmlFor="cvv">CVV:</label>
            <input type="text" id="cvv" name="cvv" />
          </div>
          <div>
            <label htmlFor="cardHolderName">Cardholder Name:</label>
            <input type="text" id="cardHolderName" name="cardHolderName" />
          </div>
          <button onClick={() => setShowPaymentForm(false)}>Cancel</button>
          <button onClick={handleTicketBooking}>Proceed to pay</button>
        </div>
      )}
      {ticketBooked && (
        <div className="popup">
          <p>Tickets Booked!</p>
        </div>
      )}
    </div>
  );
};







// BusList component to manage a list of buses
const BusList = () => {
  // State to manage list of buses
  const [buses, setBuses] = useState([
    { id: 1, route: ':VIA TADEPALLI', from: ':GUNTUR', destination: ':VIJAYAWADA', departureTime: '2024-03-10T09:00', journeyDate: '2024-03-10' },
    { id: 2, route: ':VIA TENALI', from: ':VIJAYAWADA', destination: ':GUNTUR', departureTime: '2024-03-10T10:30', journeyDate: '2024-03-10' },
    { id: 3, route: ':VIA NANDYAL', from: ':KURNOOL', destination: ':VIJAYAWADA', departureTime: '2024-03-10T12:00', journeyDate: '2024-03-10' },
    { id: 4, route: ':VIA DHONE', from: ':VIJAYAWADA', destination: ':KURNOOL', departureTime: '2024-03-10T09:00', journeyDate: '2024-03-10' },
    { id: 5, route: ':VIA ANNAVARAM', from: ':VIJAYAWADA', destination: ':VISHAKAPATNAM', departureTime: '2024-03-10T10:30', journeyDate: '2024-03-10' },
    { id: 6, route: 'VIA ANNAVARAM', from: ':VISHAKAPATNAM', destination: ':VIJAYAWADA', departureTime: '2024-03-10T12:00', journeyDate: '2024-03-10' },
    { id: 7, route: ':VIA NALGONDA', from: ':VIJAYAWADA', destination: ':HYDERABAD', departureTime: '2024-03-10T09:00', journeyDate: '2024-03-10' },
    { id: 8, route: ':VIA NALGONDA', from: ':HYDERABAD', destination: ':VIJAYAWADA', departureTime: '2024-03-10T10:30', journeyDate: '2024-03-10' },
    { id: 9, route: ':VIA NAIDUPET', from: ':CHENNAI', destination: ':NELLORE', departureTime: '2024-03-10T12:00', journeyDate: '2024-03-11' },
    { id: 10, route: 'VIA NAIDUPET', from: ':NELLORE', destination: ':TIRUPATHI', departureTime: '2024-03-10T09:00', journeyDate: '2024-03-11' },
    { id: 11, route: ':VIA VELLORE', from: ':TIRUPATHI', destination: ':CHENNAI', departureTime: '2024-03-10T10:30', journeyDate: '2024-03-10' },
    { id: 12, route: '', from: ':CHENNAI', destination: 'VELLORE', departureTime: '2024-03-10T12:00', journeyDate: '2024-03-10' },

    // Add more buses here with their "from" destinations
  ]);

  // State to manage the "From" destination entered in the search bar
  const [searchFromDestination, setSearchFromDestination] = useState('');
  // State to manage the "To" destination entered in the search bar
  const [searchToDestination, setSearchToDestination] = useState('');
  // State to manage the date of journey entered
  const [journeyDate, setJourneyDate] = useState('');

  // Function to handle changes in the "From" destination input
  const handleFromDestinationChange = (event) => {
    setSearchFromDestination(event.target.value);
  };

  // Function to handle changes in the "To" destination input
  const handleToDestinationChange = (event) => {
    setSearchToDestination(event.target.value);
  };

  // Function to handle changes in the journey date picker
  const handleDateChange = (event) => {
    setJourneyDate(event.target.value);
  };

  // Function to filter buses based on the entered destinations and journey date
  const filteredBuses = buses.filter(bus =>
    bus.destination.toLowerCase().includes(searchToDestination.toLowerCase()) &&
    bus.from.toLowerCase().includes(searchFromDestination.toLowerCase()) &&
    (!journeyDate || journeyDate === bus.journeyDate)
  );

  return (
    <div className="bus-list">
      <div className="header">
        <h2>List of Buses:</h2>
        <div className="search">
          <input
            type="text"
            placeholder="From Destination"
            value={searchFromDestination}
            onChange={handleFromDestinationChange}
          />
          <input
            type="text"
            placeholder="To Destination"
            value={searchToDestination}
            onChange={handleToDestinationChange}
          />
          <input
            type="date"
            value={journeyDate}
            onChange={handleDateChange}
          />
          <button onClick={() => console.log("Search clicked")}>Search</button>
        </div>
      </div>
      {filteredBuses.map(bus => (
        <Bus key={bus.id} {...bus} />
      ))}
    </div>
  );
};

export default BusList;
