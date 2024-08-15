# UWDP

UWDP is an attempted replacement to UW Flow's schedule features and UW Path. The project is still in its early developpment stages

## Try out UWDP

Clone the repository, then you will need to run the frontend and backend.

- Frontend
```bash
cd frontend
npm install
npm run dev
```

- Backend
> [!WARNING]
> You should use a virtual environment when running this project

```bash
cd backend
pip install -r requirements.txt
python manage.py runserver
```

> [!NOTE]
> You should start by creating a superuser with `python manage.py createsuperuser`

