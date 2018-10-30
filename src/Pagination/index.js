import React, { Component } from 'react';
import './styles.css';

class Pagnation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      numberOfPages: 0,
      pages: []
    }

    this.onPageClick = this.onPageClick.bind(this);
    this.getArrayOfPages = this.getArrayOfPages.bind(this);
  }

  componentDidMount() {
    this.getArrayOfPages();
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.currentPage !== this.props.currentPage) ||
      (prevProps.itemsPerPage !== this.props.itemsPerPage) ||
      (prevProps.itemsCount !== this.props.itemsCount)
    ) {
      this.getArrayOfPages();
    }
  }

  getArrayOfPages() {
    if (Number(this.props.itemsCount) && Number(this.props.itemsPerPage) && Number(this.props.currentPage)) {
      const numberOfPages = Math.ceil(this.props.itemsCount / this.props.itemsPerPage);
      const arrayOfPages = Array(Math.ceil(numberOfPages)).fill().map((item, index) => index + 1 );
      const indexOfCurrentPage = arrayOfPages.indexOf(this.props.currentPage);
      let pages = [];
      
  
      if (!indexOfCurrentPage) {
        pages = [arrayOfPages[indexOfCurrentPage], arrayOfPages[indexOfCurrentPage + 1]]
      } else if (indexOfCurrentPage === arrayOfPages - 1) {
        pages = [arrayOfPages[indexOfCurrentPage - 1], arrayOfPages[indexOfCurrentPage]]
      } else {
        pages = [arrayOfPages[indexOfCurrentPage - 1], arrayOfPages[indexOfCurrentPage], arrayOfPages[indexOfCurrentPage + 1]]
      }

      this.setState({
        numberOfPages,
        pages
      });
    }
  }

  onPageClick(page) {
    this.props.onChange(page);
  }

  render() {
    return (
      <div className="container">
        { this.props.currentPage !== 1 &&
          <button
            className="move-btn"
            onClick={() => this.onPageClick(this.props.currentPage - 1)}
          >
            &#8249;
          </button>
        }
        <ul className="pagination">
          { this.state.pages.map((page, index) => (
            <li key={index}>
              <button 
                disabled={page === this.props.currentPage}
                onClick={() => this.onPageClick(page)}
              >
                { page }
              </button>
            </li>
          ))}
        </ul>
        { this.state.numberOfPages !== this.props.currentPage &&
          <button
            className="move-btn"
            onClick={() => this.onPageClick(this.props.currentPage + 1)}
          >
            &#8250;
          </button>
        }
      </div>
    );
  }
}

export default Pagnation;
