import React from 'react'

function SectionContainer(props) {
    let { className, children }  = props
    return (
        <div className={className} >{children}</div>
    )
}

export default SectionContainer
