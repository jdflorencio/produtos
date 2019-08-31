import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import ProdutosHome from './ProdutosHome'
import Categoria from './Categoria'

class Produtos extends Component {
  constructor(props){
    super(props)
    this.state = {
      editingCategoria: ''
    }
    this.handleNewCategoria = this.handleNewCategoria.bind(this)
    this.renderCategoria = this.renderCategoria.bind(this)
    this.editCategoria = this.editCategoria.bind(this)
    this.cancelEdit  =this.cancelEdit.bind(this)
    this.handleEditNewCategoria = this.handleEditNewCategoria.bind(this)
  }

  componentDidMount(){
    this.props.loadCategorias()
  }

  editCategoria(categoria) {
    this.setState({
      editingCategoria: categoria.id 
    })
  }
  cancelEdit() {
    this.setState({
      editingCategoria: ''
    })
  }

  renderCategoria(cat){
    return (
      <li key={cat.id}>
      {this.state.editingCategoria ===cat.id && 
      <div className="input-group">
        <div className="input-group-btn">
          <input onKeyUp={this.handleEditNewCategoria} ref={'cat-'+cat.id} className="form-control" type="text" defaultValue={cat.categoria} />
          <button className="btn" onClick={ this.cancelEdit}>Cancelar</button>
        </div>
      </div>
      }
      {this.state.editingCategoria !== cat.id && 
        <div>        
          <button 
              className='btn btn-sm m1-2'
              onClick={() =>this.props.removeCategoria(cat)}
              >
                <span className='glyphicon glyphicon-remove'></span>
            </button>
            <button 
              className='btn btn-sm'
              onClick={() =>this.editCategoria(cat)}
              >
                <span className='glyphicon glyphicon-pencil'></span>
            </button>
          <Link to={`/produtos/categoria/${cat.id}`}>{cat.categoria}</Link>
        </div>
    }
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

  handleEditNewCategoria(key) {
    if(key.keyCode === 13) {
      console.log('aqui')
      this.props.editCategoria({
        id: this.state.editingCategoria,
        categoria: this.refs['cat-'+this.state.editingCategoria].value
      })
      this.setState({
        editingCategoria: ''
      })
    }    
  }

	render() {
    const { match, categorias } = this.props
		return(
    <div className='row'>      
			<div className='col-md-2'>
        <h3>Categorias</h3>
        <ul style={{listStyle: 'none', padding: 0}}>
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