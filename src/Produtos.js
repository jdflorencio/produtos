import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import ProdutosHome from './ProdutosHome'
import Categoria from './Categoria'

class Produtos extends Component {
  constructor(props){
    super(props)
    this.handleNewCategoria = this.handleNewCategoria.bind(this)
    this.renderCategoria = this.renderCategoria.bind(this)
  }

  componentDidMount(){
    this.props.loadCategorias()
  } 

  renderCategoria(cat){
    return (
      <li key={cat.id}>
        <button 
          className='btn btn-sm'
          onClick={() =>this.props.removeCategoria(cat)}
          >
            <span className='glyphicon glyphicon-remove'></span>
        </button>
        <Link to={`/produtos/categoria/${cat.id}`}>{cat.categoria}</Link>
        
      </li>
    )
  }

  handleNewCategoria(key) {
    if(key.keyCode === 13) {
      this.props.createCategoria({
        categoria: this.refs.categoria.value
      })
      this.refs.categoria.value = ''
    }    
  }

	render() {
    const { match, categorias } = this.props
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