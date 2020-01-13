import React, { Fragment, useState } from 'react'
import ResizableRect from 'react-resizable-rotatable-draggable'



const ResizableContent = props => {
  const [width, setWidth] = useState(props.width)
  const [height, setHeight] = useState(props.height)
  const [top, setTop] = useState(props.top)
  const [left, setLeft] = useState(props.left)
  const [rotateAngle, setRotateAngle] = useState(props.rotateAngle)

  const contentStyle = {
    top,
    left,
    width,
    height,
    position: 'relative',
    transform: `rotate(${rotateAngle}deg)`
  }
  console.log("left",props.left)
  return (
    <Fragment>
      <div style={contentStyle}>{props.children}</div>
    </Fragment>
  )
}

export default ResizableContent