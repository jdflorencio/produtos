import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import ProdutosHome from './ProdutosHome'
import Categoria from './Categoria'
import axios from 'axios'
import Api from './Api'

class Produtos extends Component {
  constructor(props){
    super(props)
    this.state = {
      categorias: []
    }
    // this.removeCategoria = this.removeCategoria.bind(this)
    this.handleNewCategoria = this.handleNewCategoria.bind(this)
    // this.loadCategorias = this.loadCategorias.bind(this)    
    this.renderCategoria = this.renderCategoria.bind(this)
  }

  componentDidMount(){
    // this.loadCategorias()    
  }

  removeCategoria(categoria) {
    // Api.deleteCategoria(categoria.id)
    // .then((res)=>this.loadCategorias())
  }

  renderCategoria(cat){
    return (
      <li key={cat.id}>
        <button 
          className='btn btn-sm'
          onClick={() =>this.removeCategoria(cat)}
          >
            <span className='glyphicon glyphicon-remove'></span>
        </button>
        <Link to={`/produtos/categoria/${cat.id}`}>{cat.categoria}</Link>
        
      </li>
    )
  }

  handleNewCategoria(key) {
    if(key.keyCode === 13) {
      axios
      .post(`http://localhost:3001/categorias`, {
        categoria: this.refs.categoria.value
      })
      .then(res => {
        this.refs.categoria.value = ''
        this.loadCategorias()
      })  
    }    
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
        <div className="well well-sm">
          <input 
            onKeyUp={this.handleNewCategoria}
            type='text' 
            ref='categoria' 
            placeholder='nova categoria'
            className='form-control'
            />
        </div>        
				<Link to='/produtos/categoria/1'>Categorias 1</Link>
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