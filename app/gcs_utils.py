from google.cloud import storage

def upload_to_gcs(filename, file_content, bucket_name=None):
    client = storage.Client()
    bucket = client.bucket(bucket_name)
    blob = bucket.blob(filename)
    blob.upload_from_string(file_content)
    return blob.public_url