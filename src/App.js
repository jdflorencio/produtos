import React, { Component }from 'react'
import Home from './Home'
import Sobre from './Sobre'
import Produtos from './Produtos'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categorias: []
    }
    this.loadCategorias = this.loadCategorias.bind(this)
  }

  loadCategorias() {
    this.props.api.loadCategorias()
      .then(res => {
        this.setState({
          categorias: res.data
        })
      })
  }

  render() {
    return (
      <Router>
        <div >
        <nav className='navbar navbar-inverse'>
          <div className='container'>
            <div className='navbar-header'>
              <a href='/' className='navbar-brand'>
                Gerenciador de Produtos
              </a>
            </div>
            <ul className='nav navbar-nav'>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/produtos'>Produtos</Link></li>
              <li><Link to='/sobre'>Sobre</Link></li>
            </ul>
          </div>
        </nav>
        <div className='container'>
          <Route exact path='/' component={Home}/>
          <Route exact path='/sobre' component={Sobre}/>
          <Route path='/produtos' component={Produtos}/>
        </div>
        </div>
      </Router>
    )
  }
}

export default App
