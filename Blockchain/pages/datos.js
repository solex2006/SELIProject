import { Component } from 'react'
import Link from 'next/link'


export default class extends Component {
  static async getInitialProps ({ req, query }) {
    const isServer = !!req

    console.log('getInitialProps called:', isServer ? 'server' : 'client')

    if (isServer) {
      console.log('dellegada');
      console.log({ item: query.itemData });
      return { item: query.itemData }
    } 
  }

  render () {
    return (
      <div className='item'>
  
        <h1>{this.props.item.title}</h1>
        <h2>
          {this.props.item.subtitle} - {this.props.item.seller}
        </h2>
      </div>
    )
  }
}