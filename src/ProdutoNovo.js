import React, { Component } from 'react'

class Produtos extends Component {
	constructor(props) {
		super(props)
		this.handleNewProduto = this.handleNewProduto.bind(this)
	}
	handleNewProduto() {
		const produto = {
			produto: this.refs.produto.value,
			categoria: this.refs.categoria.value,
		}
		this.props.createProduto(produto)
	}
	
	render() {
		const { categorias } = this.props
		return (
			<div>
				<h2>Novo Produto</h2>
				<select ref='categoria'>
					{categorias.map((c) => <option key={c.id} value={c.id}>{c.categoria} </option> )}
				</select>
				<input 
					placeholder='nome do novo produto'
					className='form-control'
					ref='produto' />
				<button onClick={this.handleNewProduto}>Salvar</button>			
			</div>)
	}
}

export default Produtos