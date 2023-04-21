import React from "react"
import Seat from './Seat'
import './styles/Seat.css'

const GenerateSeats = (seatNumbers) => {
	return (
		<div className="row">
			{
				seatNumbers.map((seatNumber) => {
					return <Seat seatno={seatNumber} key={seatNumber}/>
				})
			}
		</div>
	)
}

const SeatMatrix = () => {
	return (
		<div className="movie-complex">
			<div className="screen-logo"></div>
			<div className="container row movie-layout">
				<div className="movie-column-1">
					{GenerateSeats([1,2,3,4])}
					{GenerateSeats([5,6,7,8])}
					{GenerateSeats([9,10,11,12])}
					{GenerateSeats([13,14,15,16])}
				</div>
				<div className="movie-column-2">
					{GenerateSeats([17, 18, 19, 20, 21])}
					{GenerateSeats([22, 23, 24, 25, 26])}
					{GenerateSeats([27, 28, 29, 30, 31])}
					{GenerateSeats([32, 33, 34, 35, 36])}
				</div>
				<div className="movie-column-3">
					{GenerateSeats([37,38,39,40])}
					{GenerateSeats([41,42,43,44])}
					{GenerateSeats([45,46,47,48])}
					{GenerateSeats([49,50,51,52])}
				</div>
			</div>
		</div>
	)
}

export default SeatMatrix
