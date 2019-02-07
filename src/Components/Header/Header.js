import React from 'react';
import './Header.css';
import Form from './Form/Form';

export default function Header(props) {
  return (
    <div>
        <header>
            <div className="site-header">
                <h1 className='site-title'>Find A SpaceX Flight</h1>
                <Form runFn={props.search}/>
            </div>
        </header>
    </div>
  )
}
