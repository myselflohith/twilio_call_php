<?php
require_once 'vendor/autoload.php';

use Twilio\Jwt\AccessToken;
use Twilio\Jwt\Grants\VoiceGrant;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Twilio credentials
$account_sid = $_ENV['TWILIO_ACCOUNT_SID'];
$auth_token = $_ENV['TWILIO_AUTH_TOKEN'];
$twilio_api_key = $_ENV['TWILIO_API_KEY'];
$twilio_api_secret = $_ENV['TWILIO_API_SECRET'];
$app_sid = $_ENV['TWILIO_APP_SID'];

// Create access tokenstill
$identity = 'lohith'; // Unique identity for the user
$accessToken = new AccessToken(
    $account_sid,
    $twilio_api_key,
    $twilio_api_secret,
    3600,
    $identity
);

// Create a Voice grant
$voiceGrant = new VoiceGrant();
$voiceGrant->setOutgoingApplicationSid($app_sid);
$accessToken->addGrant($voiceGrant);

// Output the access token
header('Content-Type: application/json');
echo json_encode(['token' => $accessToken->toJWT()]);
?>
