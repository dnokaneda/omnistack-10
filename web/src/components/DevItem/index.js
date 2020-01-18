import React from 'react';

import './styles.css';

function DevItem({ devs }) {
   return (
      <li className="dev-item">
         <header>
            <img src={devs.avatar_url} alt={devs.name} />
            <div className="user-info">
            <strong>{devs.name}</strong>
            <span>{devs.techs.join(', ')}</span>
            </div>
         </header>
         <p>{devs.bio}</p>
         <a href={`https://github.com/${devs.github_username}`}>Acessar perfil no Github</a>
      </li>
   );
}

export default DevItem;