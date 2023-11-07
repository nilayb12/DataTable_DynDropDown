<?php
$data = @$_POST['fold'];
echo '<select id="selectFile">';
// echo '<option selected disabled>Choose Data Source</option>';
$files = glob('{' . $data . '}/*.csv', GLOB_BRACE);
$flen = 1;
if (empty($files)) {
    echo '<option value="Empty" selected disabled>Empty</option>';
} else {
    foreach ($files as $file) {
        echo '<option value="' . $file . '">' . substr($file, strlen($data) + 1, 10) . '</option>';
        $flen += 1;
    }
}
echo '</select>';
?>