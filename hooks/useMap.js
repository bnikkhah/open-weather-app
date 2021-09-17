import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import Image from 'next/image'
import marker from '../public/mapbox-icon.png'

const useMap = (lon, lat) => {

    const Map = ReactMapboxGl({
        accessToken: process.env.NEXT_PUBLIC_MAPBOX_PK
      });

    return (
        <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
            height: '400px',
            width: '100%'
            }}
            center={[lon, lat]}
        >
            <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                <Feature coordinates={[lon, lat]} />
            </Layer>
            <Marker
                coordinates={[lon, lat]}
                anchor="bottom"
            >
                <Image
                    src={marker}
                    alt="marker"
                    width={40}
                    height={40}
                />
            </Marker>
        </Map>
    )
}

export default useMap