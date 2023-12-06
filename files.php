<?php
$data = @$_POST['fold'];
echo '<select id="selectFile">';
// echo '<option selected disabled>Choose Data Source</option>';
$files = glob('{' . $data . '}/*.csv', GLOB_BRACE);
$flen = 1;
$dlen = strlen($data);
if (empty($files)) {
    echo '<option value="Empty" selected disabled>No Data</option>';
} else {
    foreach ($files as $file) {
        echo '<option value="' . $file . '">' . substr($file, $dlen + 1, strpos($file, '.') - $dlen - 1) . '</option>';
        // strtok($file, '.')
        $flen += 1;
    }
}
echo '</select>';
?>