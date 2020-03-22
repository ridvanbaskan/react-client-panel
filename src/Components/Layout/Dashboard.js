import React from 'react';
import Clients from '../Clients/Clients';
import Sidebar from '../Layout/Sidebar';

function Dashboard() {
  return (
    <div className="row  mt-5">
      <div className="col-md-10">
        <Clients />
      </div>
      <div className="col-md-2">
        <Sidebar />
      </div>
    </div>
  );
}

export default Dashboard;
