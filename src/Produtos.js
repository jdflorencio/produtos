import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import ProdutosHome from './ProdutosHome'
import Categoria from './Categoria'
import axios from 'axios'

class Produtos extends Component {
  constructor(props){
    super(props)
    this.state = {
      categorias: []
    }

  }
  componentDidMount(){
    axios
      .get(`http://localhost:3001/categorias`)
      .then(res => {
        this.setState({
          categorias: res.data
        })
      })    
  }
  renderCategoria(cat){
    return (
      <li key={cat.id}>
        <Link to={`produtos/categoria/${cat.id}`}>{cat.categoria}</Link>
      </li>
    )
  }
	render() {
		const { match } = this.props
    const { categorias } = this.state
		return(
		<div className='row'>
			<div className='col-md-2'>
        <h3>Categorias</h3>
        <ul>
        {categorias.map(this.renderCategoria)}
        </ul>
        
				<Link to='produtos/categoria/1'>Categorias 1</Link>
      </div>
			<div className='col-md-10'>
				<h3>Produtos</h3>
					<Route exact path={match.url} component={ProdutosHome} />
          <Route  path={match.url+'/categoria/:catId'} component={Categoria} />
			</div>
		</div>)
		}
}
export default Produtos