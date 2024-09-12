import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './YtTable.css'; // Import the custom CSS

const commentRenderer = (params) => {
    const { value } = params;
  
    // Render the HTML content using dangerouslySetInnerHTML
    return (
        <div dangerouslySetInnerHTML={{ __html: value }} />
    );
  };

const YtTable = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const columnDefs = [
    {
      headerName: "Title",
      field: "title",
      cellRenderer: function(params) {
        return <a href={params.data.url} target="_blank" rel="noopener" className="video-link">
            {params.value}
            <span className="external-link-icon">↗</span>
        </a>
      
      },
      autoHeight: true,
      wrapText: true,
    },
    { 
        headerName: "Views", 
        field: "view_count", 
        autoHeight: true, 
        wrapText: true
    },
    { 
        headerName: "Comments", 
        field: "comment_count", 
        autoHeight: true, 
        wrapText: true 
    },
    { 
        headerName: "What did users like?", 
        field: "user_liked", 
        autoHeight: true, 
        wrapText: true, 
        flex: 1,
        cellRenderer: commentRenderer 
    },
    { 
        headerName: "Suggested Improvements", 
        field: "improvements", 
        autoHeight: true, 
        wrapText: true, 
        flex: 1,
        cellRenderer: commentRenderer  
    },
    { 
        headerName: "Ideas", 
        field: "ideas", 
        autoHeight: true, 
        wrapText: true,
        flex: 1 ,
        cellRenderer: commentRenderer 
    },
  ];

  useEffect(() => {
    const apiUrl = 'https://wfp2byht3i.execute-api.us-east-2.amazonaws.com/api/topyoutubers';

    axios.get(apiUrl)
      .then((response) => {
        setRowData(response.data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const onGridReady = (params) => {
    if (params && params.columnApi) {
      const allColumnIds = params.columnApi.getAllColumns().map(col => col.getColId());
      params.columnApi.autoSizeColumns(allColumnIds);

      // Add this to handle resizing when data changes or on initial load
      window.addEventListener('resize', () => {
        params.columnApi.autoSizeColumns(allColumnIds);
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  const gridOptions = {
    enableCellTextSelection: true,
    ensureDomOrder: true, // Important for accessibility
    suppressRowHoverHighlight:true,
  };

  return (
    <div className="full-page">
      <h2>Top YouTubers</h2>
      <div className="ag-theme-alpine custom-grid">
        <AgGridReact
          columnDefs={columnDefs}
          gridOptions={gridOptions}
          rowData={rowData}
          onGridReady={onGridReady}
          domLayout="autoHeight"
          defaultColDef={{
            resizable: true,
            autoHeight: true,
            wrapText: true,
            editable: true,
            sortable: true,
            filter: true,
          }}
        />
      </div>
    </div>
  );
};

export default YtTable;
