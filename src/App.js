import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Weather from './components/Weather'
import Error from './components/Error'

function App() {

  const [search, setSearch] = useState({
    city: '',
    country: '',
  })

  const [query, setQuery] = useState(false);

  const [result, setResult] = useState({});

  const [error, setError] = useState(false);

  const {city, country} = search;

  useEffect( () => {
    const fetchApi = async () => {

      if(query){
        const appId = '9902be6998f7918b5959865c08bfe896';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;

        const res = await fetch(url);
        const result = await res.json();

        setResult(result);
        setQuery(false);

        if(res.ok){
          setError(false);
        } else{
          setError(true);
        }
      }

    }
    fetchApi();
  }, [query])

  let component;
  if(error){
    component = <Error message="No results." />
  } else{
    component = <Weather 
                  result={result}
                />
  }

  return (
    <>
      <Header 
        title='Weather'
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Form 
              search={search}
              setSearch={setSearch}
              setQuery={setQuery}
              />
            </div>
            <div className="col m6 s12">
              {component}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
