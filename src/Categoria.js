import React, {Component}from 'react'
import axios from 'axios'

class Categoria extends Component{
	constructor(props){
    super(props)
    
    this.state = {
        id: null
    }
    this.loadData = this.loadData.bind(this)
  }

	componentDidMount (){
    const id = this.props.match.params.catId
    this.loadData(id)
  }

  loadData(id) {
    this.setState({ id })    
    this.props.loadProdutos(id)
    this.props.readCategoria(id)
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
			<h2> {this.props.categoria}</h2>
			<p>{this.props.produtos.map(this.renderProduto)}</p>
	</div>)
	}
}

export default Categoria