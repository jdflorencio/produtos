import React, { Component }from 'react'
import Api from './services/Api'
import Home from './views/home/Home'
import Sobre from './views/sobre/Sobre'
import Produtos from './views/produtos/App'

import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'

class App extends Component {

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
						<Route exact path='/produtos' component={Produtos}/>
						
	
					</div>
				</div>
			</Router>
		)
	}
}

export default App
