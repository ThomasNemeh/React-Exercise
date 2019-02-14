import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color:	#AFEEEE;
    position: relative;
    left: 2vw;
    margin-top: 5px;
    margin-bottom: 5px;
    border:2pt solid black;
    cursor: pointer;

`

const Icon = props => {
  /** If on lefthand side, display caption. No caption if icon is on righthand side */
  let caption;
  if (props.name != null) {
    caption = <figcaption className="icon-caption">{props.name + '()'}</figcaption>;
  }
  else {
    caption = null;
  }

  return (
    <div>
      <Button>
        <b className="expression-label">{props.id}</b>
      </Button>
      {caption}
    </div>
  )
}

export default Icon;
