import React from 'react'
import OffersModule from './module/OffersModule';

export default function Offers() {
    return (
        <div className="container" key="test">

            <div className="thread-head" key="test2">
                <h1 className="title">Les Offres</h1>
            </div>
            <div>
                <OffersModule />
            </div>

        </div>
    )
}
