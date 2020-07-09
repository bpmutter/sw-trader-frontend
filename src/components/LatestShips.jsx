import React, {useEffect, useState} from 'react';
import ShipResults from './ShipResults';


const LatestShips = () => {
    const [latest,setLatest] = useState(null);
    useEffect( ()=>{
      (async ()=>{
        const res = await fetch("http://localhost:5000/ships/all");
        const data = await res.json();
        setLatest(data.star_ships.reverse().slice(0,9));
        // console.log('LATEST SHIPS::', data.star_ships)
      })()
    }, [])
    return (
        <ShipResults title="Latest Listings" ships={latest}/>
    );
}

export default LatestShips;