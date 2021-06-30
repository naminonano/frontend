import React,{useState} from "react";
import classes from "./list.module.css";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import axios from "axios";
import * as action from '../../store/action'
const List = (props) => {
	// const [isfav,setisfav] = useState(props.favorite)
	let star = [0, 0, 0, 0, 0];
	const score = parseFloat(props["rating"]);
	for (let i = 0; i < score - 1; i++) {
		star[i] = 1;
	}
	if (score % 1 >= 0.5) {
		star[Math.floor(score)] = 0.5;
	}
	
	

	let st = (
		<div className={classes.row}>
			{star.map((i) => (
				<div>
					<FontAwesomeIcon
						icon={i !== 0.5 ? faStar : faStarHalf}
						size={"sm"}
						className={i > 0 ? classes.yellow : classes.grey}
					/>
				</div>
			))}
		</div>
	);
	const addfav = name=>{
		let a = [...props.favorite,name]
				
				props.updatefav(a)
		
	}
	const removefav = name=>{
		let a = [...props.favorite]
		a = a.filter(i=>i!== name)
		
		props.updatefav(a)
	}
	return (
		<div className={classes.list}>
			{score}
			<div>{props.name}</div>
			<div>{props.website}</div>
			<div>{st}</div>
			<div> {props.totalreview}</div>

			{props.favorite.includes(props.name) ?<button className={classes.a} onClick={()=>removefav(props.name)}>Remove from favorites</button>:<button className={classes.cat} onClick={()=>addfav(props.name)}>Add to favorites</button>}
			
		</div>
	);
};
const matchstate = (state) => {
	return {
		favorite:state.logininfo.favorite
	};
};
const matchdispatch = (dispatch) => {
	return {
		updatefav:fav=>dispatch(action.updatefav(fav))
	};
};
export default connect(matchstate, matchdispatch)(List);

