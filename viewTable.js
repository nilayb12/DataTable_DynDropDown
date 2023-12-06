let prefers = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
let html = document.querySelector('html');
html.classList.add(prefers);
html.setAttribute('class', prefers);

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
        dom: 'PlBfritp',
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
        // responsive: true,
        deferRender: true,
        buttons: [
            'colvis',
            {
                extend: 'csv',
                text: 'Download CSV',
                title: csvFileSelected.value.substr(folderSelected.value.length,
                    csvFileSelected.value.length - folderSelected.value.length - 4),
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
                .after('<span class="fa-icon"><i class="fa-solid fa-magnifying-glass"></i></span>');
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
