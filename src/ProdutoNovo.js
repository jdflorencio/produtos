import React, { Component } from 'react'

class Produtos extends Component {
	
	render() {
		const { categorias } = this.props
		return (
			<div>
				<h2>Novo Produto</h2>
				<select ref='categoria'>
					{categorias.map((c) => <option value={c.id}>{c.categoria} </option> )}
				</select>
				<input 
					placeholder='nome do novo produto'
					className='form-control'
					ref='produto' />
				<button>Salvar</button>			
			</div>)
	}
}

export default Produtos