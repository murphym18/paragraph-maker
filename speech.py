import cred

from watson_developer_cloud import TextToSpeechV1

_text_to_speech = TextToSpeechV1(
    username=cred.get_ibm_username(),
    password=cred.get_ibm_password())

def ibm_voice(text):
    return _text_to_speech.synthesize(text, accept='audio/wav', voice="en-US_AllisonVoice")