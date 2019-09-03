import React, {Component}from 'react'
import axios from 'axios'

class Categoria extends Component{
	constructor(props){
    super(props)
    this.loadData = this.loadData.bind(this)
    this.state = {
        categoria: {},
        id: null
    }
  }
	componentDidMount (){
    const id = this.props.match.params.catId
    this.loadData(id)
  }

  loadData(id) {
    this.setState({ id })    
    this.props.loadProdutos(id)
    axios
    .get(`http://localhost:3001/categorias/${id}`)
    .then(res => (
        this.setState({
          categoria: res.data
        })
    ))
  }

	componentWillReceiveProps(newProps) {
    if( newProps.match.params.catId !== this.state.id) {
      this.loadData(newProps.match.params.catId)
    }	
  }
  
  renderProduto(produto) {
    return (
      <p className='well' key={produto.id}>{produto.produto}</p>
    )
  }

	render(){
	return (
	<div>
			<h2> {this.state.categoria.categoria}</h2>
			<p>{this.props.produtos.map(this.renderProduto)}</p>
	</div>)
	}
}

export default Categoria