<?php
$data = @$_POST['fold'];
echo '<select id="selectFile">';
echo '<option selected disabled>Select a File</option>';
$files = glob('{' . $data . '}/*.csv', GLOB_BRACE);
$flen = 1;
while ($flen <= count($files)) {
    foreach ($files as $file) {
        echo '<option value="' . $file . '">' . substr ($file, strlen($data)+1) . '</option>';
        $flen += 1;
    }
}
echo '</select>';
?>