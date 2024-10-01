<?php
require_once 'vendor/autoload.php';

use Twilio\Jwt\AccessToken;
use Twilio\Jwt\Grants\VoiceGrant;
use Dotenv\Dotenv;

// Load environment variables from .env file
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Twilio credentials from environment variables
$account_sid = $_ENV['TWILIO_ACCOUNT_SID'];
$auth_token = $_ENV['TWILIO_AUTH_TOKEN'];
$twilio_api_key = $_ENV['TWILIO_API_KEY'];
$twilio_api_secret = $_ENV['TWILIO_API_SECRET'];
$app_sid = $_ENV['TWILIO_APP_SID'];

// Create access token for a specific user
$identity = 'lohith'; // Unique identity for the user
$accessToken = new AccessToken(
    $account_sid,
    $twilio_api_key,
    $twilio_api_secret,
    3600, // Token expiration time in seconds (1 hour)
    $identity
);

// Create a Voice grant to allow voice capabilities
$voiceGrant = new VoiceGrant();
$voiceGrant->setOutgoingApplicationSid($app_sid);

// Enable receiving incoming calls
$voiceGrant->setIncomingAllow(true); // This allows incoming calls
$accessToken->addGrant($voiceGrant);

// Output the access token as a JSON response
header('Content-Type: application/json');
echo json_encode(['token' => $accessToken->toJWT(), 'identity' => $identity]);
?>
