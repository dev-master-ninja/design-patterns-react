import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'


const App = () => {

    const [numOfPeople, setNumOfPeople] = useState(0)
    const [customer, setCustomer] = useState('')

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
                          BOOKING ARRANGEMENTS
                      </td>
                  </tr>
                  </tbody>
              </table>
              <div className="App-button" >Bevestigen</div>

              <div></div>
          </section>
        </div>
      )

}

export default App
