import React from 'react';
import './post-list-item.css';
import gotService from '../../services/gotService';


export default class PostListItem extends React.Component {
  constructor() {
    super();
    this.updateTask();
  }
  gotService = new gotService();
  state = {
    userId: null,
    id: null,
    title: null,
    completed: false
  }
  updateTask() {
    const id = Math.floor(Math.random()*10 + 1);
    this.gotService.getTask(id)
      .then((task) => {
        this.setState({
          userId: task.userId,
          id: task.id,
          title: task.title,
          completed: task.completed
        })
      });
  }
  render () {
    const {userId, id, title, completed} = this.state;
    const {onDelete, onToggleCompleted} = this.props;
    let classNames = 'app-list-item d-flex justify-content-between';
      if (completed) {
        classNames += ' important';
      }  
        return (
          <div className={classNames}>
              <button 
                type="button" 
                className="btn-star btn-sm"
                onClick={onToggleCompleted}>  
                <i className="fa fa-star"></i>
              </button>
            <span className="app-list-item-label">
                  {title}</span>
            <div className="d-flex justify-content-center align-items-center">
              <button 
                type="button" 
                className="btn-trash btn-sm"
                onClick={onDelete}>
                <i className="fa fa-trash-o"></i>
              </button>
              
            </div>
          </div>
        )
  }
}
    


