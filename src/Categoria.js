import React, {Component}from 'react'

class Categoria extends Component{
	constructor(props){
    super(props)
    
    this.state = {
        id: null
    }
    this.loadData = this.loadData.bind(this)
    this.renderProduto = this.renderProduto.bind(this)
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
      <p className='well' key={produto.id}>
      {produto.produto}
      <button 
      className="btn btn-danger"
      onClick={() => {
        this.props.removeProduto(produto)
          .then(res => this.loadData(this.props.match.params.catId))
      }}>
        Excluir
      </button>
      </p>
    )
  }

	render(){
	return (
	<div>
      <h2> {this.props.categoria}</h2>
      {this.props.produtos.length === 0 &&
        <p className='alert alert-danger'>Nenhum produto</p>
      }
			<p>{this.props.produtos.map(this.renderProduto)}</p>
	</div>)
	}
}

export default Categoria