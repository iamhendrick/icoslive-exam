import React, {useState} from 'react';
import {AgGridReact, AgGridColumn} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './grid-table.styles.css';
import {GridTableColDef, GridTableProps} from './grid-table.props';
import {GridFilterDataType, GridFilterType} from '../grid-filter/grid-filter.props';
import {GridExternalFilter} from '../grid-filter/external-filter';
import {passValueFormatter} from '../../utils/pass';
import {dateComparator, dateValueFormatter} from '../../utils/date';


export function GridTable(props: GridTableProps) {
  const [gridApi, setGridApi] = useState([] as any);
  const [rowData, setRowData] = useState([] as any);
   const [selectedExternalFilter, setSelectedExternalFilter] = useState({
    statusFilter: "",
    groupFilter: "",
  });

  const onGridReady = (params: any) => {
    console.log(params)
    setGridApi(params.api);
    setRowData(props.gridData?.data);
  };

  const generateFilter = (filterType: string) => {
    switch (filterType) {
      case GridFilterDataType.Text:
        return GridFilterType.TextFilter;
      case GridFilterDataType.Number:
        return GridFilterType.NumberFilter;
      case GridFilterDataType.Date:
        return GridFilterType.DateFilter;
      case GridFilterDataType.DropwDown:
        return GridFilterType.TextFilter;
      default:
        break;
    }
  }

  const filterDateParams = {
    comparator: (filterLocalDateAtMidnight: any, cellValue: any) => {
      const dateAsString = cellValue;
      const dateParts = dateAsString.split('/');
      const cellDate = new Date(
        Number(dateParts[2]),
        Number(dateParts[1]) - 1,
        Number(dateParts[0])
      );
      if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        return 0;
      }
      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      }
      if (cellDate > filterLocalDateAtMidnight) {
        return 1;
      }
    },
  };

  const handleExternalFilterChange = (event: any, field: string) => {
    setSelectedExternalFilter({
      ...selectedExternalFilter,
      statusFilter: field === "status" ? event.target.value : selectedExternalFilter.statusFilter,
      groupFilter: field === "group" ? event.target.value : selectedExternalFilter.groupFilter,
    });
  };

  const isExternalFilterPresent = () => {
    return true;
  };

  const doesExternalFilterPass = (node: any) => {
    let boolStatus = selectedExternalFilter.statusFilter === "pass" ? true : false
    if (selectedExternalFilter.statusFilter !== "" && selectedExternalFilter.groupFilter !== "") {
      return node.data.pass === boolStatus && node.data.group === selectedExternalFilter.groupFilter;
    } else if (selectedExternalFilter.statusFilter !== "" && selectedExternalFilter.groupFilter === "") {
      return node.data.pass === boolStatus;
    } else if (selectedExternalFilter.statusFilter === "" && selectedExternalFilter.groupFilter !== "") {
      return node.data.group === selectedExternalFilter.groupFilter;
    }
    else {
      return true;
    }
  };

  const resetGrid = () => {
    setSelectedExternalFilter({
      ...selectedExternalFilter,
      statusFilter: "",
      groupFilter: "",
    });
  }

  return (
    <div className="table-container">
      {props.gridData?.config && props.gridData?.config?.externalFilter.length
        ? <GridExternalFilter
            externalFilterData={props.gridData.config.externalFilter}
            handleExternalFilterChange={handleExternalFilterChange}
          />
        : null
      }
      <div className="grid-header-button-container">
        <button className="grid-header-button" onClick={resetGrid}>Reset</button>
      </div>
      <div className="ag-theme-alpine grid-container">
        {props.gridData && props.gridData?.data.length
          ? <AgGridReact
              isExternalFilterPresent={isExternalFilterPresent}
              doesExternalFilterPass={doesExternalFilterPass}
              onGridReady={onGridReady}
              rowData={rowData}
              defaultColDef={GridTableColDef}
            >
              {props.gridData?.config?.columnDefs.map((item: any, index: number) => {
                if (item.visible) {
                  return (
                    <AgGridColumn
                      key={index}
                      headerName={item.headerName}
                      headerClass={`header-${item.headerClass}`}
                      width={item.width}
                      field={item.field}
                      type={item.columnTypeParams}
                      filter={generateFilter(item.filterType)}
                      comparator={item.filterType === GridFilterDataType.Date ? dateComparator : undefined}
                      valueFormatter={
                        item.field === 'pass' 
                          ? passValueFormatter
                          : item.field === 'birthday'
                            ? dateValueFormatter
                            : ''
                          }
                      filterParams={item.filterType === GridFilterDataType.Date ? filterDateParams : null}
                      // cellStyle={item.field === 'pass' ? generateCellStyle : {}}
                      cellStyle={params => {
                        if (item.field === 'pass' || item.field === 'grade') {
                          return {
                            'display': 'flex ',
                            'background-color': (params.value === true || params.value > 74.99) ? "#c3e6cb" : "#f5c6cb" ,
                            'align-items': item.textStyle?.textAlign,
                            'justify-content': item.textStyle?.textAlign === 'center'
                              ? 'center'
                              : item.textStyle?.textAlign === 'left'
                                ? 'flex-start'
                                : 'flex-end'
                          }
                        } else {
                          return {
                            'display': 'flex ',
                            'align-items': item.textStyle?.textAlign,
                            'justify-content': item.textStyle?.textAlign === 'center'
                              ? 'center'
                              : item.textStyle?.textAlign === 'left'
                                ? 'flex-start'
                                : 'flex-end'
                          }
                        }
                      }}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </AgGridReact>
          : null
        }
      </div>
    </div>
  );
}