---
layout: layout
permalink: /codam-movies/
---

This is a list of all the movies submitted. It is displayed in random order as
not to influence the results. You can vote using a link in your email once a
date has been decided.

<template id="movie-template">
	<h1></h1>
	<div style="display: flex;">
		<img style="margin-right: 16px" height="268">
		<div>
			<p></p>
			<a>Info</a> - <a>Trailer</a>
		</div>
	</div>
</template>

<div id="movies">
JavaScript appears to be disabled. JavaScript is used to randomize the order of
movies, please enable it.
</div>

<script>
const template = document.querySelector('#movie-template');
const dest = document.querySelector('#movies');

let movies = [
	{
		title: "Hackers",
		description: "Hackers are blamed for making a virus that will capsize five oil tankers.",
		info: "https://www.imdb.com/title/tt0113243/", trailer: "https://youtu.be/Rn2cf_wJ4f4",
		img: "https://m.media-amazon.com/images/M/MV5BNmExMTkyYjItZTg0YS00NWYzLTkwMjItZWJiOWQ2M2ZkYjE4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg"
	},
	{
		title: "Jiro Dreams of Sushi",
		description: "A documentary on 85-year-old sushi master Jiro Ono, his renowned Tokyo restaurant, and his relationship with his son and eventual heir, Yoshikazu.",
		info: "https://www.imdb.com/title/tt1772925/", trailer: "https://www.youtube.com/watch?v=8R02NE050Jk",
		img: "https://m.media-amazon.com/images/M/MV5BMTA5NzQzODUxOTheQTJeQWpwZ15BbWU3MDIwODg1MDc@._V1_UY268_CR5,0,182,268_AL_.jpg"
	},
	{
		title: "Oh brother, where art thou?",
		description: "In the deep south during the 1930s, three escaped convicts search for hidden treasure while a relentless lawman pursues them.",
		info: "https://www.imdb.com/title/tt0190590/", trailer: "https://youtu.be/n9UlbxlM5nE",
		img: "https://m.media-amazon.com/images/M/MV5BMjZkOTdmMWItOTkyNy00MDdjLTlhNTQtYzU3MzdhZjA0ZDEyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg"
	},
	{
		title: "Princess Mononoke",
		description: "On a journey to find the cure for a Tatarigami's curse, Ashitaka finds himself in the middle of a war between the forest gods and Tatara, a mining colony. In this quest he also meets San, the Mononoke Hime.",
		info: "https://myanimelist.net/anime/164/Mononoke_Hime", trailer: "https://www.youtube.com/watch?v=4OiMOHRDs14",
		img: "https://cdn.myanimelist.net/images/anime/7/75919.jpg"
	},
	{
		title: "A Silent Voice",
		description: "A young man is ostracized by his classmates after he bullies a deaf girl to the point where she moves away. Years later, he sets off on a path for redemption.",
		info: "https://myanimelist.net/anime/28851/Koe_no_Katachi", trailer: "https://www.youtube.com/watch?v=nfK6UgLra7g",
		img: "https://cdn.myanimelist.net/images/anime/1122/96435.jpg"
	},
	{
		title: "Kick-Ass 2",
		description: "Following Kick-Ass' heroics, other citizens are inspired to become masked crusaders. But Red Mist leads his own group of evil supervillains to get revenge, kill Kick-Ass and destroy everything he stands for.",
		info: "https://www.imdb.com/title/tt00001650554/", trailer: "https://www.imdb.com/title/tt1650554/videoplayer/vi1509927193",
		img: "https://m.media-amazon.com/images/M/MV5BMTQ4OTQxNzc0N15BMl5BanBnXkFtZTcwOTQxOTU5OQ@@._V1_UY268_CR1,0,182,268_AL_.jpg"
	},
	{
		title: "Die Hard",
		description: "An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.",
		info: "https://www.imdb.com/title/tt0095016/", trailer: "https://youtu.be/jaJuwKCmJbY",
		img: "https://m.media-amazon.com/images/M/MV5BZjRlNDUxZjAtOGQ4OC00OTNlLTgxNmQtYTBmMDgwZmNmNjkxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg"
	},
	{
		title: "Return of the Killer Tomatoes",
		description: "Crazy old Professor Gangreen has developed a way to make tomatoes look human for a second invasion.",
		info: "https://www.imdb.com/title/tt0095989/", trailer: "https://youtu.be/2aIXhmygh3A",
		img: "https://m.media-amazon.com/images/M/MV5BOTExZmViMGYtNTBiMy00NmJlLThkNmEtOWFiMWVjMmZmOGUxXkEyXkFqcGdeQXVyMTQ2MjQyNDc@._V1_UX182_CR0,0,182,268_AL_.jpg"
	},
	{
		title: "Modern times",
		description: "The Tramp struggles to live in modern industrial society with the help of a young homeless woman.",
		info: "https://www.imdb.com/title/tt0027977/", trailer: "https://youtu.be/GLeDdzGUTq0",
		img: "https://m.media-amazon.com/images/M/MV5BYjJiZjMzYzktNjU0NS00OTkxLWEwYzItYzdhYWJjN2QzMTRlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg"
	},
	{
		title: "V for Vendetta",
		description: "In a future British tyranny, a shadowy freedom fighter, known only by the alias of "V", plots to overthrow it with the help of a young woman.",
		info: "https://www.imdb.com/title/tt0434409/", trailer: "https://youtu.be/lSA7mAHolAw",
		img: "https://m.media-amazon.com/images/M/MV5BYzllMjJkODAtYjMwMi00YmNhLWFhYzAtZjZjODg5YzEwOGUwXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UY268_CR0,0,182,268_AL_.jpg"
	},
	{
		title: "Planet of the Apes",
		description: "An astronaut crew crash-lands on a planet in the distant future where intelligent talking apes are the dominant species, and humans are the oppressed and enslaved.",
		info: "https://www.imdb.com/title/tt0063442/", trailer: "https://youtu.be/VjcpRHuPjOI",
		img: "https://m.media-amazon.com/images/M/MV5BMTg0NjUwMzg5NF5BMl5BanBnXkFtZTgwNDQ0NjcwMTE@._V1_UX182_CR0,0,182,268_AL_.jpg"
	},
	{
		title: "Watchmen",
		description: "In 1985 where former superheroes exist, the murder of a colleague sends active vigilante Rorschach into his own sprawling investigation, uncovering something that could completely change the course of history as we know it.",
		info: "https://www.imdb.com/title/tt0409459/", trailer: "https://www.youtube.com/watch?v=wglmbroElU0",
		img: "https://m.media-amazon.com/images/M/MV5BY2IzNGNiODgtOWYzOS00OTI0LTgxZTUtOTA5OTQ5YmI3NGUzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg"
	},
	{
		title: "Be kind rewind",
		description: "Two bumbling store clerks inadvertently erase the footage from all of the tapes in their video rental store. In order to keep the business running, they re-shoot every film in the store with their own camera, with a budget of zero dollars.",
		info: "https://www.imdb.com/title/tt0799934/", trailer: "https://www.youtube.com/watch?v=J7C8nHAAs70",
		img: "https://m.media-amazon.com/images/M/MV5BMTU4MjY2MTU2MV5BMl5BanBnXkFtZTYwNjUzODc4._V1_UX182_CR0,0,182,268_AL_.jpg"
	},
];

// https://stackoverflow.com/a/12646864
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

shuffleArray(movies);

dest.innerHTML = '';
movies.forEach(movie => {
	const clone = document.importNode(template.content, true);
	clone.querySelector('h1').textContent = movie.title;
	if (movie.description)
		clone.querySelector('p').textContent = movie.description;
	clone.querySelectorAll('a')[0].href = movie.info;
	clone.querySelectorAll('a')[1].href = movie.trailer;
	clone.querySelector('img').src = movie.img;
	dest.appendChild(clone);
});
</script>
