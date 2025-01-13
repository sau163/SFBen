import React from 'react';
import samsungMemory from './images/1.jpg';
import tab from './images/2.jpg';
function Sidebar() {
  return (
    <aside className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-4">
        <img 
          src={samsungMemory}
          alt="Advertisement"
          className="w-full rounded-lg"
        />
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <img 
          src={tab} 
          alt="Advertisement"
          className="w-full rounded-lg"
        />
      </div>
    </aside>
  );
}

export default Sidebar;