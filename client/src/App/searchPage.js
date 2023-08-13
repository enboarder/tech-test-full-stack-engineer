import { useState } from 'react';
import SearchBar from './searchBar';
import SearchResult from './searchResult';


export default function SearchPage() {
  const [data, setData] = useState([]);
    
  return (
    <section>
    < SearchBar handleData={setData}/>
    < SearchResult data={data}/>
    </section>
  );
}