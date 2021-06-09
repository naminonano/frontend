import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../UI/spinner/spinner";
import Listbox from "../components/attraction/listbox";
const Attraction = () => {
	const [load, setload] = useState(true);
	const [content, setcontent] = useState();

	useEffect(() => {
		let ar = [];

		const q = {
			query: `
			{
				getallinfo{
					name finaltype totalreview website rating
				}
			}
			`
		};
		// const q = {
		// 	query: `
		// 	mutation {createuser (locations:["Suan Luang Rama IX","MR Kukrit Pramoj House"] ,name:"nano" )}

		// 	`
		// };
		// mutation {createuser ( userinput:{name:"sss"} )}
		// 	const q ={ query: `
		//     mutation UpdateUserStatus($userStatus: String!) {
		//       updateStatus(status: $userStatus) {
		//         status
		//       }
		//     }
		//   `}
		// const q = {
		// 	query: ` { createuser (locations:Siam Paragon)}`
		// };
		setload(true);
		// console.time("doSomething");

		axios
			.post("http://localhost:8000/graphql", q)
			.then((res) => {
				console.log(res);
				res.data.data.getinfo.map((i) => ar.push(i));

				setcontent(ar);
				setload(false);
				// console.timeEnd("doSomething");
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			{load ? (
				<Loading />
			) : (
				<div>
					<Listbox list={content} />
				</div>
			)}
		</div>
	);
};

export default Attraction;
