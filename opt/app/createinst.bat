gcloud compute instances create my-app-instance \
    --machine-type=g1-small \
    --image=debian-8 \
    --scopes userinfo-email,cloud-platform \
    --metadata-from-file startup-script=gce/startup-script.sh \
    --zone us-east1-c \
    --tags http-server