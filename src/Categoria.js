import React, {Component}from 'react'
import axios from 'axios'

class Categoria extends Component{
	constructor(props){
    super(props)
    this.loadData = this.loadData.bind(this)
    this.state = {
        produtos: []
    }
  }
	componentDidMount (){
    const id = this.props.match.params.catId
    this.loadData(id)
  }

  loadData(id) {
    axios
    .get(`http://localhost:3001/produtos?categoria=${id}`)
    .then(res => (
        this.setState({
          produtos: res.data
        })
    ))
  }

	componentWillReceiveProps(newProps) {
	this.loadData(newProps.match.params.catId)
	}
	
	render(){

	return (
	<div>
			<h2>Categoria {this.props.match.params.catId}</h2>
			<p>{JSON.stringify(this.state.produtos)}</p>
	</div>)
	}
}

export default Categoria