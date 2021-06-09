import React, { useState } from "react";
import Datepicker from "./datepicker/datepicker";
import classes from "./calendar.module.css";
import { faGreaterThan, faLessThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Calendar = () => {
	const now = new Date();
	const [month, setmonth] = useState(now.getMonth() + 1); //jan =1
	const [year, setyear] = useState(now.getFullYear());
	let nextmonth = month + 1;
	let nextyear = year;
	if (month === 12) {
		nextmonth = 1;
		nextyear = year + 1;
	}
	const montharray = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];

	const topreviousmonth = () => {
		if (month === 1) {
			setmonth(12);
			setyear(year - 1);
		} else {
			setmonth(month - 1);
		}
	};
	const tonextmonth = () => {
		if (month === 12) {
			setmonth(1);
			setyear(year + 1);
		} else {
			setmonth(month + 1);
		}
	};

	return (
		<div className={classes.Calendarbox}>
			<div className={classes.Datepickerbox}>
				<div className={classes.Innerdatepickerbox}>
					<div className={classes.Text}>
						<FontAwesomeIcon
							size={"sm"}
							icon={faLessThan}
							onClick={() => topreviousmonth()}
							className={[classes.Lefticon, classes.icon].join(" ")}
						/>
						{montharray[month - 1]}
						{year}
					</div>

					<Datepicker firstmonth month={month} year={year} />
				</div>

				<div className={classes.Innerdatepickerbox}>
					<div className={classes.Righttext}>
						{montharray[nextmonth - 1]}
						{nextyear}

						<FontAwesomeIcon
							onClick={() => {
								tonextmonth();
							}}
							icon={faGreaterThan}
							size={"sm"}
							className={[classes.Righticon, classes.icon].join(" ")}
						/>
					</div>
					<Datepicker month={nextmonth} year={nextyear} />
				</div>
			</div>
		</div>
	);
};
export default Calendar;
