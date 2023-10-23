import React, { useEffect, useState } from 'react';
import './App.css';

function Movie() {
    const [movie, setMovie] = useState([]);

    const fetchMovie = () => {
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=27bd4dad0754c77391111e35f827bd6a')
            .then(response => response.json())
            .then(json => setMovie(json.results))
    }
    useEffect(() => {
        fetchMovie()
    }, [])

    const search = async (q) => {
        const URL = `https://api.themoviedb.org/3/discover/movie?api_key=27bd4dad0754c77391111e35f827bd6a/search/${q}`;
        const response = await fetch(URL);
        const data = await response.json();

        if (data.Search) {
            setMovie(data.Search);
        }
    };

    return (
        <div className='container'>
            <form
                action=""
                className="search-bar"
                onSubmit={(e) => {
                    e.preventDefault();
                    const searchValue = e.target.querySelector('.MovieSearch').value;
                    search(searchValue);
                }}
            >
                <input
                    placeholder='Enter Film..'
                    className='MovieSearch'
                />
                <button className="search-btn" type="submit">
                    <span>Search</span>
                </button>
            </form>
            <div className='toogle'>
                <h2>#3: Toggle with checkbox (Hack)</h2>
                <p>Click on the button and toggle the dropdown menu</p>
            </div>

            <div className="dropdown">
                <input type="checkbox" id="dropdown" />
                <label for="dropdown" className="dropdown-btn">
                    <span>Framework</span>
                    <span className="arrow"></span>
                </label>

                <ul className="dropdown-content" role="menu">
                    <li>Movie</li>
                    <li>Series</li>
                    <li>Episode</li>
                </ul>
            </div>
            <div className="card-container">
                {movie.map((val, index) => (
                    <div div className="card" key={index} >
                        <div className="wrapper">
                            <img src={val.Poster} className="cover-image" alt={val.Title} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Movie;
