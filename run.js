const yearSelector = document.querySelector("section#yearSelector");
const monthSelector = document.querySelector("section#monthSelector");
const details = document.querySelector("section#details");

let data;

document.querySelector("input#input").addEventListener("change", e => {
	details.classList.remove("unloaded");

	details.innerHTML = "";

	file = new FileReader();

	file.addEventListener("load", () => {
		data = JSON.parse(file.result);

                const years = Object.keys(data);
		const months = Object.keys(data[years[0]]);

		years.forEach((e, i) => {
			const yearSelectorItem = document.createElement("span");

			yearSelectorItem.classList.add("yearSelectorItem");
                        yearSelectorItem.addEventListener("click", yearLoader);
			yearSelectorItem.innerText = e;

			if(i === 0) yearSelectorItem.classList.add("current");

			yearSelector.appendChild(yearSelectorItem);
		});

		months.forEach((e, i) => {
			const monthSelectorItem = document.createElement("span");

			monthSelectorItem.classList.add("monthSelectorItem");
			monthSelectorItem.addEventListener("click", monthLoader);
			monthSelectorItem.innerText = e;

			if(i === 0) monthSelectorItem.classList.add("current");

			monthSelector.appendChild(monthSelectorItem);
		});

		Object.keys(data[years[0]][months[0]]).forEach(e => {
			const detailsHeader = document.createElement("span");

			detailsHeader.classList.add("detailsHeader");
			detailsHeader.innerText = e;

			details.appendChild(detailsHeader);

			data[years[0]][months[0]][e].forEach(e => {
				const detailsEntry = document.createElement("p");

				detailsEntry.innerText = "-" + e;

				details.appendChild(detailsEntry);
			});
		});
	});

	file.readAsText(e.target.files[0]);
});

function yearLoader(){
	if(!this.classList.contains("current")){
		document.querySelector("span.yearSelectorItem.current").classList.remove("current");

		this.classList.add("current");

		monthSelector.innerHTML = "";
		details.innerHTML = "";

		const months = Object.keys(data[this.innerText]);

		months.forEach((e, i) => {
			const monthSelectorItem = document.createElement("span");

			monthSelectorItem.classList.add("monthSelectorItem");
			monthSelectorItem.addEventListener("click", monthLoader);
			monthSelectorItem.innerText = e;

			if(i === 0) monthSelectorItem.classList.add("current");

			monthSelector.appendChild(monthSelectorItem);
		});

		Object.keys(data[this.innerText][months[0]]).forEach(e => {
			const detailsHeader = document.createElement("span");

			detailsHeader.classList.add("detailsHeader");
			detailsHeader.innerText = e;

			details.appendChild(detailsHeader);

			data[this.innerText][months[0]][e].forEach(e => {
				const detailsEntry = document.createElement("p");

				detailsEntry.innerText = "-" + e;

				details.appendChild(detailsEntry);
			});
		});
	}
}

function monthLoader(month){
	if(!this.classList.contains("current")){
		document.querySelector("span.monthSelectorItem.current").classList.remove("current");

		this.classList.add("current");

		details.innerHTML = "";

		const year = document.querySelector("span.yearSelectorItem.current").innerText;

		Object.keys(data[year][this.innerText]).forEach(e => {
			const detailsHeader = document.createElement("span");

			detailsHeader.classList.add("detailsHeader");
			detailsHeader.innerText = e;

			details.appendChild(detailsHeader);

			data[year][this.innerText][e].forEach(e => {
				const detailsEntry = document.createElement("p");

				detailsEntry.innerText = "-" + e;

				details.appendChild(detailsEntry);
			});
		});
	}
}