import React from 'react'

export default function Offers() {
    return (
        <div className="offers-container">
                <div className="offer">
                    <div className="offer-head">
                        <h3 className='title'>API Plan</h3>
                    </div>
                    <div className="offer-body">
                        <div className="description">
                            I made an API for your APP
                        </div>
                        <ul>
                            <li>Auth System</li>
                            <li>4 Components</li>
                            <li>Lorem</li>
                        </ul>
                    </div>
                    <div className="offer-footer">
                        <div className="price">
                            <p>10 <i class="fas fa-euro-sign"></i></p>
                        </div>
                    </div>
                </div>

                <div className="offer">
                    <div className="offer-head">
                        <h3 className='title'>Client Plan</h3>
                    </div>
                    <div className="offer-body">
                        <div className="description">
                            I made an Client for you app
                        </div>
                        <ul>
                            <li>ReactJs / ElectronJS / ReactNative</li>
                            <li>Custom CSS</li>
                            <li>Modifiable SCSS</li>
                        </ul>
                    </div>
                    <div className="offer-footer">
                        <div className="price">
                            <p>10 <i class="fas fa-euro-sign"></i></p>
                        </div>
                    </div>
                </div>

                <div className="offer">
                    <div className="offer-head">
                        <h3 className='title'>API + Client Plan</h3>
                    </div>
                    <div className="offer-body">
                        <div className="description">
                            I made an Client for you app
                        </div>
                        <ul>
                            <li>Fully Customizable</li>
                            <li>ReactJs / ElectronJS / ReactNative</li>
                            <li>Custom CSS</li>
                            <li>Modifiable SCSS</li>
                        </ul>
                    </div>
                    <div className="offer-footer">
                        <div className="price">
                            <p>50 <i class="fas fa-euro-sign"></i></p>
                        </div>
                    </div>
                </div>
        </div>
    )
}
