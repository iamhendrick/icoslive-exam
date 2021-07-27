import React from 'react';
import './dashboard.styles.css';
import {GridTable} from '../../components/grid-table';
import {mockData} from '../../constant/mock-data';

export function Dashboard() {

  return (
    <div className="wrapper">
      <div className="header-container">
        <h1 className="title">
          Student Record
        </h1>
      </div>
      <GridTable gridData={mockData} />
    </div>
  );
}