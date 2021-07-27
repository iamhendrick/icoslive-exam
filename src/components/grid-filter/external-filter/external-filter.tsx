import React from 'react';
import './external-filter.styles.css';
import {ExternalFilterProps} from './external-filter.props';

export function GridExternalFilter(props: ExternalFilterProps) {

  const handleChange = (event: any, field: string) => {
    props.handleExternalFilterChange(event, field);
  };

  const renderExternalFilterItem = () => {
    return props.externalFilterData.map((item: any, index: number) => {
      if (item.type === "dropdown") {
        return (
          <div key={index} className="grid-external-filter-option">
            {item.title
              ? <label className="external-filter-title">{item.title}</label>
              : null
            }
            <select className="external-filter-dropdown" onChange={event => {handleChange(event, item.field)}} >
              {item.options.map((subItem: any, subItemIndex: number) => {
                return (
                  <option key={subItemIndex} value={subItem.value}>
                    {subItem.label}
                  </option>
                );
              })}
            </select>
          </div>
         
        );
      } else {
        return null;
      }
      
    });
  }

  return (
    <div className="grid-external-filter-container">
      {renderExternalFilterItem()}
    </div>
  );
}