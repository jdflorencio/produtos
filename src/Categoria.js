import React, {Component}from 'react'

class Categoria extends Component{
    render(){

    return (
    <div>
        <h2>Categoria {this.props.match.params.catId}</h2>
    </div>)
    }
}

export default Categoria