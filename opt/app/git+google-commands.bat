gsutil mb gs://mingle-stack
gsutil defacl set public-read gs://mingle-stack

gcloud auth login
gcloud config set compute/zone us-east1-c
gcloud compute ssh my-app-instance
gcloud compute ssh nginx-plus-1-vm
gcloud config set project mingle-stack
gcloud components update
sudo chown -R svasudev /etc/nginx/
gcloud compute copy-files package.json \ my-app-instance:/opt/app --zone us-east1-c

gcloud compute instances create my-app-instance --zone us-east1-c --machine-type g1-small --image debian-8 --tags http-server --metadata-from-file startup-script=../gce/startup-script.sh --scopes userinfo-email,cloud-platform
gcloud compute instances get-serial-port-output my-app-instance --zone us-east1-c
gcloud compute firewall-rules create default-allow-http-8080 --allow tcp:8080 --source-ranges 0.0.0.0/0 --target-tags http-server --description "Allow port 8080 access to http-server"
gcloud compute firewall-rules create default-allow-http-80 --allow tcp:80 --source-ranges 0.0.0.0/0 --target-tags http-server --description "Allow port 80 access to http-server"


nslookup myip.opendns.com resolver1.opendns.com

https://srikanthvpai@gmail.com@source.developers.google.com/

cloud_sql_proxy_x64.exe -dir=/cloudsql -instances=mingle-stack:us-east1:mist01=tcp:3306 mysql -u root --host 127.0.0.1

cloud_sql_proxy_x64.exe -dir=./cloudsql -instances=mingle-stack:us-east1:mist01=tcp:3307 mysql -u=root --host=104.196.44.145

gcloud preview app deploy /opt/app/servers/app.yaml

git commit -am "Updating configuration"
git config credential.helper gcloud.cmd
git remote add cloud https://source.developers.google.com/p/mingle-stack/
git remote add google https://source.developers.google.com/p/mingle-stack/r/mistrepo
git push cloud
git push --all google
git pull google master
git branch -d master
git remote add origin ""

mysql --host=104.196.44.145 --user=root

git commit -m "revision one" [to push to github]
git add .  [to add to staging env]
git init [to initialize a git repo]
git status 
git checkout -b master



