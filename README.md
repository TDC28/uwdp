# UWDP

UWDP is an attempted replacement for UW Path, which is no longer maintained. UWDP is still in development.

## Try UWDP

To run the UWDP full-stack web application, follow these steps to set up both the frontend and backend.

- Frontend
```bash
cd frontend
npm install
npm run dev
```

- Backend
> [!NOTE]
> We recommend using a python virtual environment.

```bash
cd backend
pip install -r requirements.txt
python manage.py createsuperuser # Create a superuser
python manage.py runserver
```
