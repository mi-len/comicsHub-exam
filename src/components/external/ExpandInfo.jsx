import React, { Component } from 'react'
import marvRequester from './marvRequester'
import Modal from 'react-bootstrap/Modal'

export default class ExpandInfo extends Component {
  constructor(props) {
    super(props)

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      expand: false,
      title: '',
      images: [],
      description: '',
      pageCount: 0,
      featured: [],
      show: false
    }
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  getComic = (urlComics) => {
    if (this.state.expand) {
      this.setState({
        expand: false,
        images: [],
        description: '',
      })
      return
    }

    marvRequester.getComic(urlComics)
      .done((data) => {
        this.setState({
          expand: true,
          title: data.data.results[0].title,
          images: data.data.results[0].images,
          description: data.data.results[0].description,
          pageCount: data.data.results[0].pageCount,
          featured: data.data.results[0].characters.items
        })
      })
      .fail((err) => {
        console.log(err);
      });
  }

  setHero = (hero) => {
    sessionStorage.setItem('hero', hero)
    this.props.setSearch(hero)
  }

  expandInfo = () => {
    return (
      <div className='marvExt_exp_container'>
        <div className='marvExt_description'>
          {this.state.description === null ? <p>No description available</p> : <p dangerouslySetInnerHTML={{ __html: this.state.description }} />}
        </div>
        <div>
          {this.state.images.map((p, i) => <span><img src={p.path + '.' + p.extension} key={i} className='marvExt_img' alt="" onClick={this.handleShow} />
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>{this.state.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body><img src={p.path + '.' + p.extension} key={i} alt="" className='marvExp_img_mod' onClick={this.handleClose} /></Modal.Body>
            </Modal>
          </span>)}

        </div>
        <div className="marvExt_featured">
          featured: {this.state.featured.map((p, i) => <span key={i} onClick={() => this.setHero(p.name)}>  {p.name}</span>)}
        </div>
      </div>
    )
  }

  render = () => {
    return (
      <span>
        <li style={{ fontWeight: this.state.expand ? '700' : '' }}
          className='marv_li_c'
          key={this.props.key}
          onClick={() => this.getComic(this.props.resourceURI)}
        >
          {this.props.name}
        </li>
        {this.state.expand ? this.expandInfo() : null}
      </span>
    )
  }
}