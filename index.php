<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSV Viewer</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://code.jquery.com/ui/1.13.2/themes/dot-luv/jquery-ui.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/1.13.6/css/dataTables.jqueryui.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/autofill/2.6.0/css/autoFill.jqueryui.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/buttons/2.4.2/css/buttons.jqueryui.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/colreorder/1.7.0/css/colReorder.jqueryui.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/datetime/1.5.1/css/dataTables.dateTime.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/fixedcolumns/4.3.0/css/fixedColumns.jqueryui.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/fixedheader/3.4.0/css/fixedHeader.jqueryui.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/keytable/2.10.0/css/keyTable.jqueryui.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/responsive/2.5.0/css/responsive.jqueryui.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/rowgroup/1.4.0/css/rowGroup.jqueryui.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/rowreorder/1.4.1/css/rowReorder.jqueryui.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/scroller/2.2.0/css/scroller.jqueryui.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/searchbuilder/1.6.0/css/searchBuilder.jqueryui.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/searchpanes/2.2.0/css/searchPanes.jqueryui.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/select/1.7.0/css/select.jqueryui.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/staterestore/1.3.0/css/stateRestore.jqueryui.min.css" rel="stylesheet">
    <link rel="icon" href="table1.png">
</head>

<body>
    <label id="selectContainer">
        <select id="selectFolder">
            <option selected disabled>Select a Folder</option>
            <option value="">Root</option>
            <?php
            $folders = glob("*", GLOB_ONLYDIR);
            foreach ($folders as $folder) {
                echo '<option value="' . $folder . '">' . $folder . '</option>';
            }
            ?>
        </select>
        <?php include('files.php'); ?>
    </label>
    <div id="csvTable"></div>

    <script src="viewTable.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"
        integrity="sha256-lSjKY0/srUM9BE3dPm+c4fBo1dky2v27Gdjm2uoZaL0=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/dataTables.jqueryui.min.js"></script>
    <script src="https://cdn.datatables.net/autofill/2.6.0/js/dataTables.autoFill.min.js"></script>
    <script src="https://cdn.datatables.net/autofill/2.6.0/js/autoFill.jqueryui.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.jqueryui.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.colVis.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.html5.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.print.min.js"></script>
    <script src="https://cdn.datatables.net/colreorder/1.7.0/js/dataTables.colReorder.min.js"></script>
    <script src="https://cdn.datatables.net/datetime/1.5.1/js/dataTables.dateTime.min.js"></script>
    <script src="https://cdn.datatables.net/fixedcolumns/4.3.0/js/dataTables.fixedColumns.min.js"></script>
    <script src="https://cdn.datatables.net/fixedheader/3.4.0/js/dataTables.fixedHeader.min.js"></script>
    <script src="https://cdn.datatables.net/keytable/2.10.0/js/dataTables.keyTable.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.5.0/js/dataTables.responsive.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.5.0/js/responsive.jqueryui.js"></script>
    <script src="https://cdn.datatables.net/rowgroup/1.4.0/js/dataTables.rowGroup.min.js"></script>
    <script src="https://cdn.datatables.net/rowreorder/1.4.1/js/dataTables.rowReorder.min.js"></script>
    <script src="https://cdn.datatables.net/scroller/2.2.0/js/dataTables.scroller.min.js"></script>
    <script src="https://cdn.datatables.net/searchbuilder/1.6.0/js/dataTables.searchBuilder.min.js"></script>
    <script src="https://cdn.datatables.net/searchbuilder/1.6.0/js/searchBuilder.jqueryui.min.js"></script>
    <script src="https://cdn.datatables.net/searchpanes/2.2.0/js/dataTables.searchPanes.min.js"></script>
    <script src="https://cdn.datatables.net/searchpanes/2.2.0/js/searchPanes.jqueryui.min.js"></script>
    <script src="https://cdn.datatables.net/select/1.7.0/js/dataTables.select.min.js"></script>
    <script src="https://cdn.datatables.net/staterestore/1.3.0/js/dataTables.stateRestore.min.js"></script>
    <script src="https://cdn.datatables.net/staterestore/1.3.0/js/stateRestore.jqueryui.min.js"></script>
</body>

</html>