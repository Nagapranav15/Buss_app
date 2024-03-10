import React, { useState } from 'react';
import './MyBookings.css'; // Import your CSS file for styling
import axios from 'axios';

const Mybookings = () => {
  // State to manage the list of bookings
  const [bookings, setBookings] = useState([
    { id: 1, busId: 3, seatNumber: 'A3', passengerName: 'John Doe', journeyDate: '2024-03-10' },
    { id: 2, busId: 7, seatNumber: 'B2', passengerName: 'Jane Doe', journeyDate: '2024-03-11' },
    // Add more bookings as needed
  ]);

  // State to manage whether to display the email text box
  const [showEmailTextBox, setShowEmailTextBox] = useState(false);
  // State to manage whether to display the pop-up message
  const [showPopup, setShowPopup] = useState(false);

  // Function to handle canceling a ticket
  const cancelTicket = (bookingId) => {
    // Logic to cancel the ticket (remove it from the bookings list)
    setBookings(bookings.filter(booking => booking.id !== bookingId));
  };

  // Function to handle sending ticket to email
  const sendTicketToEmail = async (bookingId) => {
    setShowEmailTextBox(true); // Show the email text box when sending email is clicked
    try {
      // Logic to send the ticket to email using an API endpoint
      const response = await axios.post('/api/sendTicketToEmail', { bookingId });
      console.log(response.data);
      setShowPopup(true); // Show the pop-up message after sending email
    } catch (error) {
      console.error('Error sending ticket to email:', error);
    }
  };

  return (
    <div className="my-bookings">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul>
          {bookings.map(booking => (
            <li key={booking.id}>
              <div>Booking ID: {booking.id}</div>
              <div>Bus ID: {booking.busId}</div>
              <div>Seat Number: {booking.seatNumber}</div>
              <div>Passenger Name: {booking.passengerName}</div>
              <div>Journey Date: {booking.journeyDate}</div>
              <div className="buttons">
                <button className="cancel-btn" onClick={() => cancelTicket(booking.id)}>Cancel Ticket</button>
                <button className="send-email-btn" onClick={() => sendTicketToEmail(booking.id)}>Send Ticket to Email</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {showEmailTextBox && (
        <div className="email-textbox">
          <input type="text" placeholder="Enter email address" />
          <button onClick={() => setShowPopup(true)}>Send</button>
        </div>
      )}
      {showPopup && (
        <div className="popup">
          <p>Message Sent!</p>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Mybookings;
