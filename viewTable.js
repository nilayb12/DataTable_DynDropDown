const folderSelected = document.getElementById('selectFolder');
['', 'change'].forEach(function (ev) {
    folderSelected.addEventListener(ev, (ev) => {
        $.ajax({
            type: "POST",
            url: "files.php",
            data: {fold: ev.target.value},
            success: function (data) {
                $('#selectFile').html(data);
            }
        })
    });
});

const csvFileSelected = document.getElementById('selectFile');
var fval = $('#selectFile').val();
$.get(fval, function (data) {
    if (fval.length > 0 && fval != 'Empty') {
        papaParse(data)
    }
});
// ['change', 'mouseover'].forEach(function (ev) {
//     csvFileSelected.addEventListener(ev, (ev) => {
//         // location.href=event.target.value;
//         var fval = ev.target.value;
//         $.get(fval, function (data) {
//             if (fval.length > 0) {
//                 papaParse(data)
//             }
//         });
//     });
// });
const buttonClicked = document.getElementById('selectButton');
buttonClicked.addEventListener('click', () => {
    var fval = csvFileSelected.value;
    $.get(fval, function (data) {
        if (fval.length > 0 && fval != 'Empty') {
            papaParse(data)
        }
    });
});

function papaParse(csvFile) {
    Papa.parse(csvFile, {
        worker: true,
        complete: function (result) {
            if (result.data && result.data.length > 0) {
                htmlTableGen(result.data)
            }
        }
    });
}

function htmlTableGen(content) {
    let csv_preview = document.getElementById('csvTable');
    let html = '<table id="tableData" class="table table-condensed table-hover table-striped cell-border hover order-column stripe display" style="width:100%">';

    if (content.length == 0 || typeof (content[0]) === 'undefined') {
        return null
    } else {
        const header = content[0];
        const data = content.slice(1);
        html += '<thead>';
        html += '<tr>';
        header.forEach(function (colData) {
            html += '<th>' + colData + '</th>';
        });
        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
        data.forEach(function (row) {
            if (header.length === row.length) {
                html += '<tr>';
                row.forEach(function (colData) {
                    html += '<td>' + colData + '</td>';
                });
                html += '</tr>';
            }
        });
        html += '</tbody>';
        html += '<tfoot>';
        html += '<tr>';
        header.forEach(function (colData) {
            html += '<th>' + colData + '</th>';
        });
        html += '</tr>';
        html += '</tfoot>';
        html += '</table>';
        csv_preview.innerHTML = html;
        initDataTable();
    }
}

function initDataTable() {
    $('#tableData').DataTable({
        scrollX: true,
        scrollY: '75vh',
        scrollCollapse: true,
        dom: "P<'row'<'col-sm-4 col-md-auto'l><'col-sm-4 col-md-8'B><'col-sm-4 col-md-auto'f>>" +
        'r'+ "<'row'<'col-sm-12't>>"+
        "<'row'<'col-sm-12 col-md-4'i><'col-sm-12 col-md-8'p>>",
        processing: true,
        pagingType: "full_numbers",
        keys: true,
        searchPanes: {
            layout: 'columns-3',
            initCollapsed: true,
            cascadePanes: true
        },
        language: {
            search: '',
            searchPlaceholder: 'Enter Search Query'
        },
        // "drawCallback": function( settings ) {
        //     alert( 'DataTables has redrawn the table' );
        // },
        // "rowCallback": function (row, data, index) {
        //     var re = /^(.+)\\([^\\]+)$/;
        //     if (re.test(data)) {
        //         $('td:eq(2)', row).html('<a href="' + data[2] + '"target="_blank" download>' + data[2].substr(data[2].lastIndexOf('\\') + 1) + '</a>');
        //     }
        // },
        responsive: true,
        deferRender: true,
        buttons: [
            {
                extend: 'colvis',
                // collectionTitle: 'Column Visibility Panel'
            },
            {
                extend: 'csv',
                text: '<i class="fa-solid fa-file-csv fa-lg" />',
                title: csvFileSelected.value.substr(folderSelected.value.length,
                    csvFileSelected.value.length - folderSelected.value.length - 4),
                titleAttr: 'Download Data as CSV',
                exportOptions: {
                    columns: ':visible'
                }
            }
        ],
        initComplete: function () {
            this.api()
                .columns()
                .every(function () {
                    var column = this;
                    var title = column.footer().textContent;
                    $('<input type="text" placeholder="Search ' + title + '" />')
                        .appendTo($(column.footer()).empty())
                        .on('keyup change clear', function () {
                            if (column.search() !== this.value) {
                                column.search(this.value).draw();
                            }
                        });
                });
            $('#tableData_filter input')
                .after('<span class="fa-icon" /><i class="fa-solid fa-magnifying-glass" />');
        },
        columnDefs: [
            {
                //targets: 1,
                render: function (data, type, row, meta) {
                    return '<a href="' + data + '">' + data + '</a>';
                }
            }
        ]
    })
}
