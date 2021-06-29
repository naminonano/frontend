import React,{useState} from 'react';

const Timeselector = () => {
	let [time,settime]=useState()
	let x
	const changetime =(e)=>{
		console.log(e.target.value)
		if (e.target.value.includes(':')){
			x = (e.target.value.replace(':','')) 
		}
		else{
			x = e.target.value
		}
		if(time){
		if (time.length>2){
			settime( x.slice(0,2)+':'+x.slice(2,4))
		}
	
		else{
			settime(x)
		}
	}
		
		return
	}
	// console.log(x)
	return (
		
		<div>
		<input value={time} onChange={changetime}>
		</input>	
		</div>
	);
};

export default Timeselector;