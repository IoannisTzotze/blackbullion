import React from 'react';
import "./ListItem.css";

const ListItem = (props) => {
    const {item} = props;

  return (
    <div data-testid="list_item" className="listItem">
        <div className="listItem__image">
            <img src={item.image} alt="" />
        </div>
        <div className="listItem__info">
            <h2 data-testid="list_header">{item.title}</h2>
            <p data-testid="list_intro">{item.intro}</p>
            <p data-testid="list_duration">{item.duration}</p>
            <span><a href={item.url}>View</a></span>
        </div>
    </div>
  )
}

export default ListItem
