// Note: This is for representation only. We can also set this
// as a response from API. But on this case, we are using this
// setup to display and represent different possible options to
// handle defaultColDef of AG Grid.
export const GridTableColDef = {
  filter: true,
  floatingFilter: true,
  flex: 1,
  floatingFilterComponentParams: {
    suppressFilterButton: true
  },
  resizable: true,
  width: 120,
  suppressSizeToFit: true,
};

export interface GridTableProps {
  gridData?: any;
}
