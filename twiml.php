<?php
header('Content-type: text/xml');
?>
<Response>
    <Dial callerId="+14157365698"><?php  echo $_POST['To'];?></Dial>
</Response>