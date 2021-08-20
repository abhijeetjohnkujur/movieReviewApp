import {useState, useEffect} from 'react';
import './App.css';


function App() {

  let [movieinfo,setMovieinfo] = useState(null);
  let [title, setTitle] = useState("The avengers");

  useEffect(() =>{
    
    getMovieData();

  },[])

    function readTitle(value)
    {
        setTitle(value);
    }

    function getMovieData()
    {
      let url = `https://omdbapi.com/?t=${title}&apiKey=9e2ae324`;

    fetch(url)
    .then((response) => response.json())
    .then((movie)=>{
      console.log(movie);
      setMovieinfo(movie);
    })
    .catch((error) =>{
      console.log(error);
    })
    }

  return (
    <div className="App">
      <div className="container">
          <div className="padd">
              <h1>Movie Search</h1>
              <div className="input-group">
                <input type="text" placeholder="Enter your movie name" className="search-field" onChange={(event)=>{readTitle(event.target.value)}} />
                <button className="btn" onClick={getMovieData}>Get movie</button>
              </div>

                    {
                      movieinfo?.Error === undefined? (
                        <div className="movie">
                        <div className="poster">
                            <img src={movieinfo?.Poster} className="img-poster" alt="poster"/>
                        </div>
                        <div className="details">
                            <div className="padd">
                              <h1>{movieinfo?.Title}</h1>
                              <p><strong>Genre:</strong>{movieinfo?.Genre}</p>
                              <p><strong>Directed by:</strong>{movieinfo?.Director}</p>
                              <p><strong>Plot:</strong>{movieinfo?.Plot}</p>
                              <p><strong>Actors:</strong>{movieinfo?.Actors}</p>
                              <p><strong>BoxOffice:</strong>{movieinfo?.BoxOffice}</p>
                              <p><strong>Language:</strong>{movieinfo?.Language}</p>
                              <p><strong>Release Date:</strong>{movieinfo?.Released}</p>
                              <p><strong>Runtime:</strong>{movieinfo?.Runtime}</p>
      
                              <div className="ratings">
                                {
                                  movieinfo?.Ratings.map((rating,index) => (
                                    <div key={index}>
                                    <strong>{rating.Source}</strong>
                                    <h3>{rating.Value}</h3>
                                  </div>             
                                  ))
                                }
                                 
                                  
                              </div>
      
                            </div>
                        </div>
                    </div>
                      ):
                      (
                        <h1>Movie not found</h1>
                      )
                    }        
          </div>
      </div>
    </div>
  );
}

export default App;
