// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import { useEffect, useState } from 'react';

import { useState } from 'react';
import styles from './location.module.css'
import { AdvancedMarker, APIProvider, InfoWindow, Map } from "@vis.gl/react-google-maps";
import { Element } from 'react-scroll';

// const mapContainerStyle = {
//     width: '800px',
//     height: '400px',
// };

// const API_KEY = 'AIzaSyDcxKvhslqsyJK405ALQFLmhtH6gfiOI64';
// const placeName = 'Bela Vista - Chácara Espaço para Festas e Eventos em Mococa';

// export default function Location() {
//     const [center, setCenter] = useState(null);

//     useEffect(() => {
//         fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(placeName)}&key=${API_KEY}`)
//             .then(response => response.json())
//             .then(data => {
//                 if (data.results.length > 0) {
//                     const location = data.results[0].geometry.location;
//                     setCenter(location);
//                 }
//             })
//             .catch(error => console.error('Erro ao obter coordenadas:', error));
//     }, []);

//     if (!center) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <LoadScript googleMapsApiKey={API_KEY}>
//             <GoogleMap
//                 mapContainerStyle={mapContainerStyle}
//                 center={center}
//                 zoom={15}
//             >
//                 {/* Adiciona um marcador na localização obtida */}
//                 <Marker
//                     position={center}
//                     icon='http://maps.google.com/mapfiles/ms/icons/red-dot.png' // Ícone vermelho
//                 />
//             </GoogleMap>
//         </LoadScript>
//     );
// }

"use_client";

export default function Location() {
    const positon = {
        lat: - 21.48637294488083, lng: -47.012823587981295
    }


    const [open, setOpen] = useState(false)
    return (

        <Element name='location'>
            <APIProvider
                apiKey='AIzaSyDcxKvhslqsyJK405ALQFLmhtH6gfiOI64'>
                <div className={styles.container}>
                    <Map
                        zoom={15}
                        center={positon}
                        mapId={'e6865a8da6bd778'}
                    >
                        <AdvancedMarker
                            position={positon}
                            onClick={() => setOpen(true)}
                        >
                            {/* <Pin
                            background={"grey"}
                            borderColor={"yellow"}
                            glyphColor={"purple"}
                        ></Pin> */}

                        </AdvancedMarker>
                        {open && <InfoWindow
                            position={positon}
                            onCloseClick={() => setOpen(false)}
                        >
                            <p className={styles.text}>
                                <button>
                                    <a href='https://www.google.com.br/maps/place/Bela+Vista+-+Ch%C3%A1cara+Espa%C3%A7o+para+Festas+e+Eventos+em+Mococa/@-21.4863992,-47.0132393,19z/data=!3m1!4b1!4m6!3m5!1s0x94b7b86185518a27:0xcd1300923be74145!8m2!3d-21.4864004!4d-47.0125956!16s%2Fg%2F1tcyyjc_?entry=ttu' >
                                        Clique aqui para ir ao local
                                    </a>
                                </button>
                            </p>

                        </InfoWindow>}
                    </Map>
                </div>
            </APIProvider>
        </Element>

    )

}
