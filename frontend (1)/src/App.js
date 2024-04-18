import React from 'react'
import './App.css';
import Read from './components/read';
import MenuVertical from './components/menu';
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="main">
        <h2 className="main-header">Gerenciamento de Alunos</h2>

        <MenuVertical />

        <div style={{ marginTop: 20 }}>
          <Route exact path='/listar' component={Read} />
        </div>

      </div>
    </Router>
  );
}

export default App;
