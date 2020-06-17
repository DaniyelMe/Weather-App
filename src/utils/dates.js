const parseDate = dataDate => {
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	const date = dataDate.split('T')[0];
	let parseDate = date.split('-').reverse();
	parseDate[1] = parseDate[1].split('')[0] == 1 ? monthNames[parseDate[1]] : monthNames[parseDate[1].split('')[1]];

	return Array.from(parseDate).join(' ');
};

export default {
	parseDate
};
