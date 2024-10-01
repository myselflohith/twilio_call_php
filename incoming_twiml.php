<?php
// Set the content type to XML for TwiML response
header('Content-Type: application/xml');

// Output XML declaration
echo '<?xml version="1.0" encoding="UTF-8"?>';
?>
<Response>
    <!-- Provide a voice message to the caller -->
    <Say>Thank you for calling! We are connecting your call now.</Say>
    
    <!-- Dial the client with the specified name (lohith) -->
    <Dial>
        <Client>lohith</Client>
    </Dial>
</Response>
