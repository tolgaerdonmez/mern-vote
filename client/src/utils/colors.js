export function getRandomColorList(length) {
	const randomColor = () => {
		var letters = "0123456789ABCDEF";
		var color = "#";
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};
	return new Array(length).map(x => randomColor());
}

const colors = [
	"#a93226",
	"#884ea0",
	"#2471a3",
	"#17a589",
	"#229954",
	"#d4ac0d",
	"#ca6f1e",
	"#839192",
	"#2e4053",
	"#cb4335",
	"#7d3c98",
	"#2e86c1",
	"#138d75",
	"#28b463",
	"#d68910",
	"#ba4a00",
	"#a6acaf",
	"#273746",
	"#d98880",
	"#c39bd3",
	"#7fb3d5",
	"#76d7c4",
	"#7dcea0",
	"#f7dc6f",
	"#f0b27a",
	"#aeb6bf",
];

export default colors;
