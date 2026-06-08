import React, { useState } from "react";
import Nav from "./Nav";
import HogCard from "./HogCard";

import hogsData from "../porkers_data";

function App() {
	const [hogs, setHogs] = useState(
		hogsData.map((h) => ({ ...h, hidden: false }))
	);
	const [greasedOnly, setGreasedOnly] = useState(false);
	const [sortBy, setSortBy] = useState("");

	const [name, setName] = useState("");
	const [weight, setWeight] = useState("");
	const [specialty, setSpecialty] = useState("");
	const [newGreased, setNewGreased] = useState(false);

	const handleHide = (hogName) => {
		setHogs((prev) => prev.map((h) => (h.name === hogName ? { ...h, hidden: true } : h)));
	};

	const handleAdd = (e) => {
		e.preventDefault();
		const newHog = {
			name,
			specialty,
			greased: !!newGreased,
			weight: Number(weight),
			"highest medal achieved": "",
			image: "",
			hidden: false,
		};
		setHogs((prev) => [...prev, newHog]);
		setName("");
		setWeight("");
		setSpecialty("");
		setNewGreased(false);
	};

	const visibleHogs = hogs.filter((h) => !h.hidden).filter((h) => (greasedOnly ? h.greased : true));

	const sortedHogs = [...visibleHogs];
	if (sortBy === "name") {
		sortedHogs.sort((a, b) => a.name.localeCompare(b.name));
	} else if (sortBy === "weight") {
		sortedHogs.sort((a, b) => a.weight - b.weight);
	}

	return (
		<div className="App">
			<Nav />

			<div style={{ padding: "1rem" }}>
				<div>
					<label htmlFor="greased-filter">Greased Pigs Only?</label>
					<input
						id="greased-filter"
						type="checkbox"
						checked={greasedOnly}
						onChange={() => setGreasedOnly((s) => !s)}
					/>
				</div>

				<div>
					<label htmlFor="sort-select">Sort by:</label>
					<select id="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
						<option value="">None</option>
						<option value="name">name</option>
						<option value="weight">weight</option>
					</select>
				</div>

				<form onSubmit={handleAdd} style={{ marginTop: "1rem" }}>
					<div>
						<label htmlFor="name-input">Name:</label>
						<input id="name-input" value={name} onChange={(e) => setName(e.target.value)} />
					</div>
					<div>
						<label htmlFor="weight-input">Weight:</label>
						<input id="weight-input" value={weight} onChange={(e) => setWeight(e.target.value)} />
					</div>
					<div>
						<label htmlFor="specialty-input">Specialty:</label>
						<input id="specialty-input" value={specialty} onChange={(e) => setSpecialty(e.target.value)} />
					</div>
					<div>
						<label htmlFor="greased-input">Greased?</label>
						<input id="greased-input" type="checkbox" checked={newGreased} onChange={() => setNewGreased((s) => !s)} />
					</div>
					<button type="submit">Add Hog</button>
				</form>
			</div>

			<div className="ui grid container">
				{sortedHogs.map((hog) => (
					<div className="ui eight wide column" key={hog.name}>
						<HogCard hog={hog} onHide={handleHide} />
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
