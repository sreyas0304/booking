import React, {useContext, Fragment, useState} from "react"
import MovieContext from "../contexts/MovieContext"
import "./styles/price_cal.css";
import "./styles/price_cal.css";

import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const PriceCalculator = () => {

	const publishableKey = "pk_test_51MqoAmLu6sgpXpmBBnxpITXhxK5IlPvvWElIOgmkhb3wNkkQxPVjMAswsNzbI2R2wi78kZgzbbH5CcJAJdsqjZyY00v3yv2rQX";

	const {movies} = useContext(MovieContext);

	const [snacks, setSnacks] = useState([]);
  	const [totalPrice, setTotalPrice] = useState(0);
	  const [snackCounts, setSnackCounts] = useState({});

	const snacksList = [
	{ name: "Popcorn", price: 5 },
	{ name: "Soda", price: 3 },
	{ name: "Nachos", price: 6 },
	// Add more snacks and drinks as needed
	];

	// Function to add a snack to the cart
	// const addSnack = (snack) => {
	// 	setSnacks([...snacks, snack]);
	// 	setTotalPrice(totalPrice + snack.price);
	// };

	const addSnack = (snack) => {
		const updatedSnacks = [...snacks, snack];
		setSnacks(updatedSnacks);
		setTotalPrice(totalPrice + snack.price);
		const updatedSnackCounts = {...snackCounts};
		updatedSnackCounts[snack.name] = (updatedSnackCounts[snack.name] || 0) + 1;
		setSnackCounts(updatedSnackCounts);
	};

	// Function to remove a snack from the cart
	// const removeSnack = (snack) => {
	// 	const updatedSnacks = snacks.filter((s) => s !== snack);
	// 	setSnacks(updatedSnacks);
	// 	setTotalPrice(totalPrice - snack.price);
	// };

	const removeSnack = (snack) => {
		const updatedSnacks = snacks.filter((s) => s !== snack);
		setSnacks(updatedSnacks);
		setTotalPrice(totalPrice - snack.price);
		const updatedSnackCounts = {...snackCounts};
		updatedSnackCounts[snack.name] = (updatedSnackCounts[snack.name] || 1) - 1;
		setSnackCounts(updatedSnackCounts);
	};

	const onToken = token => {
		const body = {
		amount: ((movies.totalSeats * movies.moviePrice) + totalPrice)*100,
		token: token
	};

	console.log(`Total Price: ${(movies.totalSeats * movies.moviePrice) + totalPrice}`)

	axios.post("http://localhost:8000/payment", body)
      .then(response => {
        console.log(response);
        alert("Payment Success");
		window.location.reload();
      })
      .catch(error => {
        console.log("Payment Error: ", error);
        alert("Payment Error");
      });
  };

	// const handleButtonClick = () => {
	// 	console.log(`Total Price: ${movies.totalSeats * movies.moviePrice}`);
	// 	// window.location.reload();
	// };

	return (
		<div className="price-calculator-container">
			<p>Selected {movies.totalSeats} seats and the total price is ${movies.totalSeats*movies.moviePrice}</p>
			{/* <button className="price-calculator-button" onClick={handleButtonClick}>Book Seats</button> */}
			<h3>Snacks & Drinks</h3>
			<ul>
				{snacksList.map((snack) => (
				// <li key={snack.name}>
				// 	{snack.name} - ${snack.price} &nbsp;&nbsp;&nbsp;
				// 	<button onClick={() => addSnack(snack)}>+</button>&nbsp;
				// 	<button onClick={() => removeSnack(snack)}>-</button>
				// </li>

				<li key={snack.name}>
					{snack.name} - ${snack.price} &nbsp; &nbsp;&nbsp;
					<button onClick={() => addSnack(snack)}>+</button>&nbsp;
					<span>{snackCounts[snack.name] || 0}</span>&nbsp;
					<button onClick={() => removeSnack(snack)}>-</button>
				</li>

				))}
			</ul>
			<h4>Price for Snacks & Drinks: ${totalPrice}</h4>

			<StripeCheckout
			label="Book Tickets" //Component button text
			name="WatchAFlickk" //Modal Header
			description="Upgrade to a premium account today."
			panelLabel="Book Tickets" //Submit button in modal
			amount={((movies.totalSeats*movies.moviePrice) + totalPrice)*100} //Amount in cents $9.99
			token={onToken}
			stripeKey={publishableKey}
			image="./logo.png" //Pop-in header image
			billingAddress={false}
			/>
		</div>
	)
}
export default PriceCalculator
