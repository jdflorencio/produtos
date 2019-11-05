import React, { Component }from 'react'
import Produtos from './Produtos'
import Api from '../../services/Api'

import {
  BrowserRouter as Router,
  Route  
} from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      categorias: [],
      produtos: [],
      categoria: ''
    }

    this.loadCategorias = this.loadCategorias.bind(this)
    this.removeCategoria = this.removeCategoria.bind(this)
    this.createCategoria = this.createCategoria.bind(this)
    this.editCategoria = this.editCategoria.bind(this)
    this.createProduto = this.createProduto.bind(this)
    this.loadProdutos = this.loadProdutos.bind(this)
    this.readCategoria = this.readCategoria.bind(this)
    this.removeProduto = this.removeProduto.bind(this)
    this.readProduto = this.readProduto.bind(this)
    this.editProduto = this.editProduto.bind(this)

  }

  loadCategorias() {
    Api.loadCategorias()
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
    Api.deleteCategoria(categoria.id)
    .then((res)=>this.loadCategorias())
  }

  createCategoria(categoria) {
    Api.createCategoria(categoria)
    .then((res) => this.loadCategorias())
  }

  editCategoria(categoria) {
    Api.editCategoria(categoria)
    .then((res) => this.loadCategorias())
  }

  createProduto(produto) {
    return Api.createProduto(produto)
  }

  loadProdutos(categoria) {
    Api.loadProdutos(categoria)
      .then((res) => {
        this.setState({
        produtos: res.data
      })})
  }

  readCategoria(categoria) {
    Api.readCategoria(categoria)
      .then((res) => {
        this.setState({
          categoria: res.data.categoria
        })
      })
  }

  removeProduto(produto) {
    return Api.deleteProduto(produto.id)
  }

  readProduto(id) {
    return Api.readProduto(id)
  }

  editProduto(produto) {
    return Api.editProduto(produto)
  }

  render() {
    return (
      <Router>
        <div >
   
        <div className='container'>
        

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

              readCategoria={this.readCategoria}
              categoria={this.state.categoria}
              removeProduto={this.removeProduto}
              editProduto={this.editProduto}
              readProduto={this.readProduto}
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