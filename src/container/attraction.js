import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../UI/spinner/spinner";
import Listbox from "../components/attraction/listbox";
import { connect } from "react-redux";
import * as action from '../store/action'
import classes from "../components/attraction/list.module.css";
const Attraction = (props) => {
	const [load, setload] = useState(true);
	const [content, setcontent] = useState();
	const [favorite,setfavorite] = useState()
	const [c, selectedcat] = useState("");
	const type = [
		"All",
		"market",
		"art_gallery",
		"shopping_mall",
		"library",
		"palace",
		"local_government_office",
		"health",
		"park",
		"zoo",
		"aquarium",
		"playground",
		"children",
		"amusement_park",
		"museum",
		"monument",
		"royal",
		"store",
		"religious structure",
		"surfing",
		"hall",
		"premise",
		"bridge",
		"residence",
		"place_of_worship",
		"fort",
		"memorial",
		"culture",
		"theater",
		"buddhist temple",
		"motorsports",
		"movie_theater",
		"finance",
		"church",
		"hindu_temple",
		"food",
		"cafe",
		"restaurant",
		"book_store",
		"place of worship",
		"meditation",
		"transit_station",
		"veterinary_care",
		"stadium",
		"show",
		"grocery_or_supermarket",
		"historic building",
		"mosque",
		"department_store",
		"beauty_salon"
	];
	useEffect(() => {
		let ar = [];
	

		const q = {
			query: `
			
				
				query 
				
				Getuserinfo($email:String!){
				getallinfo{
					name finaltype totalreview rating
				}
				getuserinfo(email:$email){
					locations
				}}
				
			
			`
			,
			variables: {
				email: 'najullawat@gmail.com',
			}
		};

		setload(true);
		// console.time("doSomething");

		axios
			.post("http://localhost:8000/graphql", q)
			.then((res) => {
				
				props.updatefav( res.data.data.getuserinfo['locations']);
				res.data.data.getallinfo.map((i) => ar.push(i));

				setcontent(ar);
				setload(false);
				// console.timeEnd("doSomething");
			})
			.catch((err) => console.log(err));
	}, []);
	let all = true;
	const click = (i) => {
		all = false;
		selectedcat(i);
	};

	const clickall = () => {
		all = true;
		selectedcat(" ");
	};
	let cat = type.map((i) => (
		<button
			className={i === c ? classes.a : classes.cat}
			onClick={() => click(i)}
		>
			{i.replaceAll("_", " ")}
		</button>
	));
	
	return (
		<div>
			{load ? (
				<Loading />
			) : (
				<div>
					<div>
						{/* {allbut} */}
						{cat}
					</div>
					<Listbox list={content} category={c}  />
				</div>
			)}
		</div>
	);
};
const matchdispatch = (dispatch) => {
	return {
		updatefav:(fav)=>dispatch(action.updatefav(fav))
	};
};
export default connect( null,matchdispatch)(Attraction);
