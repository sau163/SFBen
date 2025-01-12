import React from 'react';

function Sidebar() {
  return (
    <aside className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-4">
        <img 
          src="/images/ad-1.jpg" 
          alt="Advertisement"
          className="w-full rounded-lg"
        />
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <img 
          src="/images/ad-2.jpg" 
          alt="Advertisement"
          className="w-full rounded-lg"
        />
      </div>
    </aside>
  );
}

export default Sidebar;