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
      categorias: [],
      produtos: []
    }
    this.loadCategorias = this.loadCategorias.bind(this)
    this.removeCategoria = this.removeCategoria.bind(this)
    this.createCategoria = this.createCategoria.bind(this)
    this.editCategoria = this.editCategoria.bind(this)
    this.createProduto = this.createProduto.bind(this)
    this.loadProdutos = this.loadProdutos.bind(this)
  }

  loadCategorias() {
    this.props.api.loadCategorias()
      .then(res => {        
        this.setState({
          categorias: res.data
        })
      })
      .catch( error => {
        console.log('error, ', error)
      })
  }

  removeCategoria(categoria) {
    this.props.api.deleteCategoria(categoria.id)
    .then((res)=>this.loadCategorias())
  }

  createCategoria(categoria) {
    this.props.api.createCategoria(categoria)
    .then((res) => this.loadCategorias())
  }

  editCategoria(categoria) {
    this.props.api.editCategoria(categoria)
    .then((res) => this.loadCategorias())
  }

  createProduto(produto) {
    return this.props.api.createProduto(produto)
  }

  loadProdutos(categoria) {
    console.log('passando aqui =>', categoria)
    this.props.api.loadProdutos(categoria)
      .then((res) => {
        console.log('retorno ',res.data)
        this.setState({
        produtos: res.data
      })})
      console.log(this.state.produtos)
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

          <Route path='/produtos'  render={(props)=> {
            return (<Produtos {...props} 
              loadCategorias={this.loadCategorias}
              categorias={this.state.categorias}
              removeCategoria={this.removeCategoria}
              createCategoria={this.createCategoria}
              editCategoria={this.editCategoria}
              
              createProduto={this.createProduto}
              loadProdutos={this.loadProdutos}
              produtos={this.state.produtos}
              />
              
            )}        
          }/>
  
        </div>
        </div>
      </Router>
    )
  }
}

export default App
