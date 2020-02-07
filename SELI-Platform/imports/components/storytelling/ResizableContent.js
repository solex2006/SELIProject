import React, { Fragment, useState } from 'react'
import ResizableRect from 'react-resizable-rotatable-draggable'


const ResizableContent = props => {
  const [width, setWidth] = useState(props.width)
  const [height, setHeight] = useState(props.height)
  //const [top, setTop] = useState(props.top)
  //const [left, setLeft] = useState(props.left)
  const [rotateAngle, setRotateAngle] = useState(props.rotateAngle)

  const contentStyle = {
   // top,
  //  left,
    width,
    height,
    position: 'relative',
    transform: `rotate(${rotateAngle}deg)`
  }

  const contentStylerotate = {
     margin: '25px',
     position: 'relative',
     width:'0px',
     height:'0px',
    
   }

  const handleResize = (style, isShiftKey, type) => {
    const {width, height } = style
    setWidth(Math.round(width))
    setHeight(Math.round(height))
    //setTop(Math.round(top))
    //setLeft(Math.round(left))
  }

  const handleRotate = rotateAngle => {
    setRotateAngle(rotateAngle)
    props.rotateangle(rotateAngle)
    //props.coordenadaCursos(rotateAngle)
    //props.coordenada(rotateAngle)
    
  }

  const handleDrag = (deltaX, deltaY) => {
    setLeft(left + deltaX)
    setTop(top + deltaY)
  }

  return (
    <Fragment>
      <div style={contentStyle}>{props.children}</div>
      <div style={contentStylerotate}>
          <ResizableRect
          // top={top}
            rotatable
            //left={left}
            aspectRatio
            minWidth={10}
           
            minHeight={10}
           
          //  onDrag={handleDrag}
            onRotate={handleRotate}
            //onResize={handleResize}
            //zoomable="nw, ne, se, sw"
            rotateAngle={rotateAngle}
          />
      </div>
      
    </Fragment>
  )
}

export default ResizableContent