import React from "react"
import Seat from './Seat'

const SeatAvailability = () => {
	return (
		<div className="row">
			Unoccupied : <Seat seatColor="seat-red" />
			Occupied : <Seat seatColor="seat-white" />
		</div>
	)
}

export default SeatAvailability
