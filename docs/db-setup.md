The mysql db on an EC2 instance is set up following this [tutorial](https://towardsdatascience.com/running-mysql-databases-on-aws-ec2-a-tutorial-for-beginners-4301faa0c247). 
The following is a summary of the steps taken.

1. Create an EC2 instance with Ubuntu 18.04
2. Download pem file from lastpass
3. SSH into the EC2 instance
   1. From the AWS console select the EC2 instance and click on `Connect`
   2. Follow the instructions under `SSH client` to ssh into the instance
4. Install mysql-server and mysql-client
5. Update the root user password (stored in lastpass)

To login to Sequel Ace, use the following settings:
MySQL Host: 127.0.0.1
Username: root
Password: <password stored in lastpass>
Dtatabase: mysql
Port: 3306
SSH Host: <public DNS of EC2 instance found in AWS console i.e. `ec2-12-345-678-90.compute-1.amazonaws.com`>
SSH User: ubuntu
SSH Key: <path to pem file downloaded from lastpass>