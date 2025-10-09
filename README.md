# Scientific Calculator - DevOps Mini Project

A CLI-based scientific calculator deployed via a complete CI/CD pipeline.

## 🚀 Pipeline Flow
1. Push to GitHub → triggers webhook
2. Jenkins pipeline runs tests, builds Docker image
3. Pushes image to Docker Hub
4. Ansible pulls image and runs container locally
5. Email notification on success/failure

## 🧰 Tools
- **SCM:** GitHub  
- **CI/CD:** Jenkins  
- **Build:** Docker  
- **Config Management:** Ansible  
- **Testing:** Pytest  

## 🐳 Docker Commands
```bash
docker build -t yourdockerhubusername/scientific-calculator .
docker run -it yourdockerhubusername/scientific-calculator
```

## 📦 Ansible Deploy
```bash
ansible-playbook ansible/deploy.yml
```
