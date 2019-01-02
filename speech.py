import boto3
import cred
from watson_developer_cloud import TextToSpeechV1

class SpeechData:
    def __init__(self, audio_data, mime_string):
        self.audio = audio_data
        self.mime = mime_string

_text_to_speech = TextToSpeechV1(
    username=cred.get_ibm_username(),
    password=cred.get_ibm_password())

def ibm_voice(text):
    audio_data = _text_to_speech.synthesize(text, accept='audio/wav', voice="en-US_AllisonVoice")
    return SpeechData(audio_data, 'audio/wav')


_polly_client = boto3.Session(
    aws_access_key_id=cred.get_aws_key_id(),                     
    aws_secret_access_key=cred.get_aws_secret_key(),
    region_name='us-west-2').client('polly')

def _aws_voice_impl(text, speaker_name):
    response = _polly_client.synthesize_speech(VoiceId=speaker_name, OutputFormat='mp3', Text=text)
    audio_data = response['AudioStream'].read()
    return SpeechData(audio_data, 'audio/mpeg3')

def aws_voice(text):
    return joanna_voice(text)

def joanna_voice(text):
    return _aws_voice_impl(text, 'Joanna')

def salli_voice(text):
    return _aws_voice_impl(text, 'Salli')

def kimberly_voice(text):
    return _aws_voice_impl(text, 'Kimberly')

def kendra_voice(text):
    return _aws_voice_impl(text, 'Kendra')

def emma_voice(text):
    return _aws_voice_impl(text, 'Emma')

def amy_voice(text):
    return _aws_voice_impl(text, 'Amy')

def nicole_voice(text):
    return _aws_voice_impl(text, 'Nicole')