import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel/';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form/';

import './app.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      term: '',
      filter: 'all'
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onToggleCompleted = this.onToggleCompleted.bind(this);
    this.onUpdateSearch = this.onUpdateSearch.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);
    this.maxId = 4;
  }

  deleteItem(id) {
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);
      const before = data.slice(0, index);
      const after = data.slice(index + 1);
      const newArr = [...before, ...after];

      return {
        data: newArr
      }
    });
  }

  addItem(body) {
    const newItem = {
      title: body,
      completed: false,
      id: this.maxId++
    }
    this.setState(({data}) => {
      const newArr = [...data, newItem];
      return{
        data: newArr
      }
    })
  }
  onToggleCompleted(id) {
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);
      const old = data[index];
      const newItem = {...old, completed: !old.completed};
      const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
      return{
        data: newArr
      }
    });
  }
  searchPost(items, term) {
    if (term ||term.length === 0) {
      return items
    }
      return items.filter( (item) => {
        return item.lable.indexOf(term) > -1
      });
  }
  filterPosts(items, filter) {
    if (filter === 'completed') {
      return items.filter(item => item.completed)
    } else {
      return items
    }
  }
  onUpdateSearch(term) {
    this.setState({term})
  }
  onFilterSelect(filter) {
    this.setState({filter})
  }
  
  render() {
    const {data, term, filter} = this.state;
    const done = data.filter((item) => item.completed).length;
    const allPosts = data.length;

    const visiblePosts = this.filterPosts(this.searchPost(data, term), filter);
    return (
      <div className="app">
        <AppHeader
          done={done}
          allPosts={allPosts}/>
        <div className="search-panel d-flex">
          <SearchPanel
            onUpdateSearch={this.onUpdateSearch}/>
          <PostStatusFilter
            filter={filter}
            onFilterSelect={this.onFilterSelect}/>
        </div>
        <PostList 
          posts={visiblePosts}
          onDelete={this.deleteItem}
          onToggleCompleted={this.onToggleCompleted}
          />
        <PostAddForm
          onAdd={this.addItem}/>
      </div>
    )
  }

} 





  
