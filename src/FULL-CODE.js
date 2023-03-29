import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

class BookingItem {

    title = ''
    price =  0
    cost = 0

    constructor( t, c ) {
        this.title = t
        this.cost = c
        this.price = c
    }

    setPrice(n) {
        this.price = n * this.cost
    }

    showPrice() {
        return(this.price)
    }
}

/// OBJECT POOL
/// Bestaat nu alleen uit nieuwe instanties van BookingItem, maar
/// zal normaliter uit verschillende objecten bestaan
const arrangements = [
    new BookingItem('vlucht', 1200),
    new BookingItem('hotel', 350),
    new BookingItem('huurauto', 500),
    new BookingItem('Excursie', 50)
]

class Booking {
    _traveler = {}
    _bookingArrangements = {}

    setTraveler(t) {
        this._traveler = t
    }

    setArrangements(a)  {
        this._bookingArrangements = a
    }
}

const bookingFactory = (traveler, bookingArrangments) => {
    const b = new Booking()
    /// DEPENDENCY INJECTION(S)
    b.setTraveler(traveler)
    b.setArrangements(JSON.parse(JSON.stringify(bookingArrangments)))
    return(b)
}


const App = () => {

    const [numOfPeople, setNumOfPeople] = useState(0)
    const [customer, setCustomer] = useState('')
    const [bookingArrangements, setBookingArrangements] = useState(arrangements)
    const [booking, setBooking] = useState({})

    useEffect( () => {

        if(numOfPeople > 0) {
            /// OBSERVER PATTERN
            /// Easy edition
            const b = bookingArrangements.map(item => {
                item.setPrice(numOfPeople)
                return (item)
            })
            setBookingArrangements(b)
        }
    },[numOfPeople])

    const saveBooking = () => {
        /// FACTORY
        console.log('running!')
        const traveler = { name: customer }
        setBooking(bookingFactory(traveler, bookingArrangements))
    }

    const decorateBooking  = (obj) => {
        const total = obj._bookingArrangements?.reduce( (total, item) => total + parseInt(item.price), 0)
        return(
            <div>
                <h2>Booking</h2>
                <h3>{ obj._traveler?.name }</h3>
                Total: &euro; { total }
            </div>
        )
    }

    return (
        <div className="App">
            <section className="App-header">
                <img src={logo} alt="logo" className='App-logo'/>

                <table>
                    <tbody>
                    <tr>
                        <td>Klant</td>
                        <td>
                            <input type='text'
                                   value={customer}
                                   onChange={ (e) => setCustomer(e.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Aantal personen</td>
                        <td><input type='number'
                                   value={numOfPeople}
                                   onChange={ (e) => setNumOfPeople(e.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Onderdelen</td>
                        <td>
                            {
                                bookingArrangements.map( (item, index) => {

                                    return(
                                        <div key={index}>
                                            {item.title} &euro;{ item.showPrice()}
                                        </div>
                                    )

                                })
                            }

                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className="App-button" onClick={ () => saveBooking() }>Bevestigen</div>

                <div>{ booking && decorateBooking(booking) }</div>
            </section>
        </div>
    )

}

export default App
