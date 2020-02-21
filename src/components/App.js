import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = ({ target: {value} }) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: value
      }
    })
  }

  onFindPetsClick = () => {
    let baseURL = '/api/pets'
    if (this.state.filters.type !== 'all') {
      baseURL += `?type=${this.state.filters.type}`
    }

    fetch(baseURL)
      .then(r => r.json())
      .then(petsData => this.setState({ pets: petsData }))
    // switch(this.state.filters.type) {

    //   case('all'):
    //     fetch('/api/pets')
    //     break;
    //   case('cat'):
    //   fetch('/api/pets/?type=cat')
    //     break;
    //   case('dog'):
    //     fetch('/api/pets/?type=dog')
    //     break;
    //   case('micropig'):
    //     fetch('/api/pets/?type=micropig')
    //     break;
    // }
  }

  onAdoptPet = (petId) => {
    const updatedPets = this.state.pets.map(pet => pet.id === petId ? {...pet, isAdopted: true} : pet)

    this.setState({
      pets: updatedPets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
              onChangeType={this.onChangeType}
              onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser 
              pets={this.state.pets}
              onAdoptPet={this.onAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
