# UWDP

UWDP is an attempted replacement for UW Path, which is no longer maintained. UWDP is still in its early developpment stages.

## Try UWDP

Clone the repository, then run the frontend and backend.

- Frontend
```bash
cd frontend
npm install
npm run dev
```

- Backend
> [!WARNING]
> You should use a virtual environment

```bash
cd backend
pip install -r requirements.txt
python manage.py createsuperuser # Create a superuser
python manage.py runserver
```
