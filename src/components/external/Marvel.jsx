import React, { Component } from 'react'
import { Spin } from 'antd'
import ExpandInfo from './ExpandInfo'
import marvRequester from './marvRequester'
import { Input } from 'antd';

const Search = Input.Search;

export default class Marvel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // search: '',
      description: '',
      img: '',
      comics: [],
      name: '',
      match: false,
      notFound: false
    }
  }

  setSearch = (hero) => {
    this.getHero(hero)
  }

  getHero = (hero) => {
    this.setState({ comics: [] })
    
    marvRequester.getHero(hero)
      .done((data) => {
        if (data.data.results.length === 0) {
          this.notFound()
          return
        }

        this.setState({
          description: data.data.results[0].description,
          img: data.data.results[0].thumbnail.path + '.' + data.data.results[0].thumbnail.extension,
          comics: data.data.results[0].comics.items,
          name: data.data.results[0].name,
          match: true,
          notFound: false
        })
      })
      .fail((err) => {
        console.log('err >> ', err);
      });
  }

  componentDidMount = () => {
    // document.body.style = 'background:  rgb(60, 73, 133);'
    document.body.style = 'background:  rgb(133, 60, 90);;'
    window.scrollTo(0, 0)
  }

  componentWillUnmount = () => {
    document.body.style = 'background:  initial;'
  }

  notFound = () => {
    this.setState({ notFound: true })
  }

  searchResult = () => {
    return (
      <div className='marv_hero'>
        <h2>{this.state.name}</h2>
        <img className='marvel_img' src={this.state.img} alt="" />
        <div className='marv_descr'>{this.state.description}</div>
        <div className='marv_c_with'>Comics with {this.state.name}:</div>
        <ul>
          {this.state.comics.length > 0
            ? this.state.comics.map((p, i) => <ExpandInfo key={i} {...p} setSearch={this.setSearch} />)
            : <Spin size="large" id='spinner_m' />}
        </ul>
        <a href="http://marvel.com " target='blank'>Data provided by Marvel. © 2019 MARVEL</a>
      </div>

    )
  }

  render = () => {
    return (
      <div className='container'>
        <Search
          placeholder="Search superhero by name:"
          name="name"
          onSearch={value => this.getHero(value)}
          // enterButton
          allowClear
        />
        {this.state.notFound ? <div className='marv_nfound'>Nothing found, try different search.</div> : null}
        {this.state.match ? this.searchResult() : null}
      </div>
    )
  }
}