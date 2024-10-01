<?php
// Set the content type to XML for TwiML response
header('Content-type: text/xml');
?>
<Response>
    <!-- Dial the number received in the POST request with the specified caller ID -->
    <Dial callerId="+14157365698"><?php echo $_POST['To']; ?></Dial>
</Response>
