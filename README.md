# 🧠 AI Salary Intelligence Platform

[![Python 3.11](https://img.shields.io/badge/python-3.11-blue.svg)](https://www.python.org/downloads/release/python-3110/)
[![Flask 2.3](https://img.shields.io/badge/flask-2.3-green.svg)](https://flask.palletsprojects.com/)
[![Scikit-Learn](https://img.shields.io/badge/scikit--learn-1.3.0-orange.svg)](https://scikit-learn.org/)
[![SQLite](https://img.shields.io/badge/database-SQLite-blue.svg)](https://www.sqlite.org/)
[![PythonAnywhere](https://img.shields.io/badge/deployed-PythonAnywhere-brightgreen.svg)](https://Paliwal2209.pythonanywhere.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **AI-Powered Salary Prediction Platform** — Predict salary expectations using machine learning trained on 250,000 real-world salary records. Analyze your professional profile and get instant predictions with detailed market insights.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Technology Stack](#️-technology-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [Machine Learning Pipeline](#-machine-learning-pipeline)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)
- [Acknowledgments](#-acknowledgments)
- [Support](#-support)

---

## 🎯 Overview

**AI Salary Intelligence Platform** is a machine learning-powered web application that predicts salary expectations based on professional profile information. The platform uses a Ridge Regression model trained on 250,000 salary records to provide accurate predictions along with industry benchmarking.

### Who It's For

| Audience | Benefit |
|---|---|
| **Job Seekers** | Understand fair market value for your skills and experience |
| **Career Planners** | Get data-driven salary expectations before career moves |
| **Professionals** | Benchmark your compensation against industry standards |

### Key Benefits

- 📈 **Accurate Predictions** — Ridge Regression model with **96.35% R² score**
- ⚡ **Fast Inference** — Get predictions in seconds with detailed analysis
- 📊 **Market Insights** — Compare your prediction against industry averages and percentiles
- 💾 **Prediction History** — Track all your salary predictions in a persistent database
- 📄 **Professional Reports** — Download comprehensive PDF reports with analysis and recommendations

---

## 🌐 Live Demo

The application is successfully deployed and publicly accessible on **PythonAnywhere**.

> 🔗 **Website:** [https://Paliwal2209.pythonanywhere.com](https://Paliwal2209.pythonanywhere.com)

Users can access the live application to:
- Upload datasets and perform salary prediction
- Analyze salary data across industries and roles
- Generate and download professional PDF reports
- View prediction history and market benchmarks

---

## ✨ Features

### 🤖 AI Salary Prediction
- **Ridge Regression Model**: Trained on 250,000 salary records with 42 engineered features
- **Comprehensive Input Analysis**: Job title, experience, education, skills, industry, company size, location, remote work preference, and certifications
- **Accurate Predictions**: R² Score 0.9635 (96.35% variance explained) with MAE of $5,434

### 📤 Dataset Upload
- Upload custom datasets for analysis and processing
- Supports CSV format with salary and professional attribute data
- Automatic data validation and preprocessing on upload

### 🧹 Data Cleaning
- Handle missing values, outliers, and data validation automatically
- Categorical encoding and feature scaling pipeline
- Robust preprocessing to ensure high-quality model inputs

### 📊 Data Analysis
- **Industry Benchmarking**: Compare your prediction against industry and job-title averages
- **Percentile Ranking**: See where you stand relative to peers (0–99 percentile)
- **Salary Ranges**: Low (10th percentile), Mid (50th percentile), and High (90th percentile) projections
- **Salary Differential**: Understand how your prediction compares to the market average

### 🤖 Machine Learning
- **Feature Contribution**: See which factors most influence the prediction
- **Confidence Scoring**: Model confidence level for each prediction
- **Experience Projections**: Estimated salary growth trends based on years of experience
- **Explainability Data**: Detailed breakdown of model decision factors

### 📄 PDF Report Generation
- **Executive Summary**: Predicted salary, market comparison, and key insights
- **Detailed Analysis**: Complete breakdown of input parameters and their impact
- **Market Insights**: Industry benchmarks and percentile analysis
- **Recommendations**: Actionable suggestions based on the analysis
- **Visual Charts**: Professional visualizations of salary trends and comparisons

### 🎨 Responsive User Interface
- **Full Responsiveness**: Optimized for desktop, tablet, and mobile devices
- **Interactive Visualizations**: Chart.js powered graphs for salary analysis
- **3D Animations**: Three.js powered interactive globe on prediction page
- **Smooth Interactions**: Loading animations and progress indicators
- **Professional Design**: Clean, modern interface with gradient effects

### 🐍 Flask Backend
- Lightweight, production-ready Python web framework
- RESTful route structure with clean URL design
- Integrated SQLite database for persistent prediction history

### 🔬 Scikit-learn Integration
- End-to-end ML pipeline with OneHotEncoder and StandardScaler
- Ridge Regression with L2 regularization for robust salary predictions
- Joblib model serialization for efficient loading and inference

---

## 🛠️ Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| HTML5 | Semantic markup and page structure |
| CSS3 | Modern styling with gradients and animations |
| JavaScript | Client-side logic and interactivity |
| Bootstrap | Responsive grid and UI components |
| Three.js | 3D animated globe visualizations |
| Chart.js | Professional interactive charts |
| jsPDF | Client-side PDF report generation |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Flask | 2.3.3 | Lightweight Python web framework |
| Python | 3.11 | Modern Python runtime |
| Gunicorn | 21.2 | Production WSGI application server |

### Machine Learning

| Library | Version | Purpose |
|---|---|---|
| Scikit-learn | 1.3.0 | Ridge Regression model and preprocessing |
| Pandas | 2.0.3 | Data manipulation and feature engineering |
| NumPy | 1.24.3 | Numerical computations |
| Joblib | 1.3.1 | Model and preprocessor serialization |

### Database

| Technology | Purpose |
|---|---|
| SQLite 3 | Persistent storage for prediction history |
| JSON | Configuration and statistics storage |

### Deployment

| Platform | Purpose |
|---|---|
| PythonAnywhere | Live production hosting |
| GitHub | Source code version control and collaboration |

---

## 📁 Project Structure

```
salary-ai-platform/
│
├── app.py                          # Flask application entry point
├── config.py                       # Configuration settings
├── requirements.txt                # Python dependencies
├── runtime.txt                     # Python version specification
├── Procfile                        # Deployment configuration (Gunicorn)
├── wsgi.py                         # WSGI entry point for PythonAnywhere
├── render.yaml                     # Render.com Blueprint specification
├── LICENSE                         # MIT License
├── README.md                       # Project documentation
├── CHANGELOG.md                    # Version history and release notes
├── .gitignore                      # Git ignore rules
├── .env.example                    # Example environment variable file
│
├── src/                            # Source code modules
│   ├── __init__.py
│   ├── predict.py                  # ML prediction pipeline
│   ├── database.py                 # SQLite operations
│   ├── logger.py                   # Logging configuration
│   ├── exception.py                # Custom exception handling
│   ├── utils.py                    # Utility functions
│   └── generate_stats.py           # Statistics generation script
│
├── artifacts/                      # Pre-trained models & artifacts
│   ├── best_salary_model.pkl       # Trained ML model
│   ├── preprocessor.pkl            # Feature preprocessor
│   ├── scaler.pkl                  # Data scaler
│   ├── model_metrics.json          # Model performance metrics
│   └── summary_stats.json          # Pre-computed salary statistics
│
├── data/                           # Training & reference data
│   └── job_salary_prediction_dataset.csv
│
├── static/                         # Static assets
│   ├── css/
│   │   └── style.css               # Main stylesheet (premium design)
│   ├── js/
│   │   ├── script.js               # Main JavaScript (animations, globe)
│   │   ├── loading.js              # Loading screen handler
│   │   └── result.js               # Results page logic & charts
│   └── images/
│       └── (brand assets)
│
├── templates/                      # Jinja2 HTML templates
│   ├── index.html                  # Landing page
│   ├── predict.html                # Prediction form page
│   ├── result.html                 # Results & PDF generation
│   ├── history.html                # Prediction history dashboard
│   ├── about.html                  # Model information & metrics
│   └── error.html                  # Error handling page
│
├── logs/                           # Application logs (generated at runtime)
└── history.db                      # SQLite database (prediction history)
```

---

## 🚀 Installation

### Prerequisites

- Python 3.11 or higher
- `pip` or `conda` package manager
- Virtual environment (recommended)

### Step 1: Clone the Repository

```bash
git clone https://github.com/paliwalpriyanjal-hash/salary-ai-platform.git
cd salary-ai-platform
```

### Step 2: Create a Virtual Environment

```bash
# Using venv
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Run the Application

```bash
python app.py
```

The application will start at `http://localhost:5000`.

### Step 5: Access the Platform

| Page | URL |
|---|---|
| Home | [http://localhost:5000/](http://localhost:5000/) |
| Predict | [http://localhost:5000/predict](http://localhost:5000/predict) |
| History | [http://localhost:5000/history](http://localhost:5000/history) |
| About Model | [http://localhost:5000/about](http://localhost:5000/about) |

---

## 📖 Usage

### Basic Salary Prediction

1. **Navigate to Predict Page** — Click "Predict Salary" on the homepage.
2. **Fill the Form** — Enter your professional details:
   - Job Title
   - Years of Experience
   - Education Level
   - Skills Count
   - Certifications
   - Industry
   - Company Size
   - Location
   - Remote Work Preference
3. **Get Results** — The AI model processes and returns an instant prediction.
4. **View Analytics** — Explore:
   - Predicted salary
   - Industry benchmarks
   - Percentile ranking
   - Experience trend
   - Feature importance
5. **Generate Report** — Download a professional PDF report.
6. **View History** — All predictions are automatically saved for later reference.

### Advanced Features

#### Prediction History

```
GET  /history                     → View all past predictions
GET  /history/view/<report_id>    → View a specific prediction
POST /history/delete/<report_id>  → Remove a specific prediction
```

#### API Endpoint

```bash
GET /api/salary-stats
# Returns salary statistics for industry/job_title combinations
```

---

## 🤖 Machine Learning Pipeline

### Dataset

| Property | Value |
|---|---|
| Total Records | 250,000 salary records |
| Training Records | 200,000 (80%) |
| Test Records | 50,000 (20%) |
| Engineered Features | 42 professional attributes |
| Coverage | Multiple industries and job roles |

### Preprocessing Steps

1. **Data Cleaning** — Handle missing values, outliers, and data validation
2. **Categorical Encoding** — OneHotEncoder for categorical features
3. **Feature Scaling** — StandardScaler for numerical features
4. **Train-Test Split** — 80/20 stratified split for robust model validation

### Feature Engineering

| Feature Category | Encoding Method |
|---|---|
| Job Title | Categorical encoding (42 total features) |
| Experience | Continuous numerical variable |
| Education Level | Categorical ordinal encoding |
| Skills & Certifications | Count-based encoding |
| Industry | Categorical encoding |
| Company Size | Categorical (Small, Medium, Enterprise) |
| Location | Categorical encoding |
| Remote Work Status | Binary categorical encoding |

### Model Training

- **Algorithm**: Ridge Regression with L2 regularization
- **Preprocessing**: OneHotEncoder + StandardScaler scikit-learn pipeline
- **Training Set**: 200,000 records (80%)
- **Test Set**: 50,000 records (20%)

### Model Performance

| Metric | Value |
|---|---|
| **R² Score** | **0.9635** (96.35% variance explained) |
| **RMSE** | $7,124.67 |
| **MAE** | $5,434.43 |
| **Validation Set** | 50,000 hold-out records |

### Model Insights

- **Feature Importance**: Ridge Regression coefficient analysis showing feature impact
- **Grouped Contributions**: Aggregated feature influence by category (Job Title, Experience, Education, etc.)
- **Prediction Confidence**: Model confidence scoring for each prediction

---

## 🔌 API Documentation

### `GET /`
**Landing page** — Home screen with platform overview.

### `GET /predict`
**Prediction form** — Returns the HTML input form.

### `POST /predict`
**Submit prediction** — Processes form data and returns results.

**Request Parameters:**

```json
{
  "job_title": "Software Engineer",
  "experience_years": "5",
  "education_level": "Bachelor",
  "skills_count": "8",
  "certifications": "3",
  "industry": "Technology",
  "company_size": "Enterprise",
  "location": "San Francisco",
  "remote_work": "Hybrid"
}
```

**Response:**

```json
{
  "prediction": 125000,
  "industry_avg": 120000,
  "salary_diff": 5000,
  "percentile": 75,
  "confidence": 0.96,
  "report_id": "uuid"
}
```

### `GET /history`
**Prediction history** — View all saved predictions.

### `GET /about`
**Model information** — Model metrics and explainability details.

### `GET /api/salary-stats`
**Salary statistics** — JSON stats for industry/job combinations.

---

## 🌐 Deployment

### Platform: PythonAnywhere

The application is successfully deployed on **PythonAnywhere** and is publicly accessible.

| Property | Value |
|---|---|
| **Platform** | PythonAnywhere |
| **Live URL** | [https://Paliwal2209.pythonanywhere.com](https://Paliwal2209.pythonanywhere.com) |
| **Status** | ✅ Successfully deployed and publicly accessible |
| **Entry Point** | `wsgi.py` |

---

### Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run the application
python app.py
```

The app will start at `http://localhost:5000`.

---

### Railway Deployment (Alternative)

This project includes a `Procfile` and `runtime.txt` for Railway compatibility.

#### Quick Start
1. Create a new project on [Railway](https://railway.app/).
2. Select **Deploy from GitHub repo** and connect this repository.
3. Railway automatically detects the Python environment, installs dependencies, and starts the app using the `Procfile`.

#### SQLite Database Persistence (Important)

Since Railway containers use an ephemeral filesystem, the SQLite database (`history.db`) will reset on every restart or redeployment. To ensure data persistence:

1. In your Railway service settings, go to the **Volumes** tab.
2. Click **Add Volume** and set a mount path (e.g., `/data`).
3. Under the **Variables** tab, add:
   - **Key**: `DATABASE_PATH`
   - **Value**: `/data/history.db`
4. Deploy the application.

#### Environment Variables (Railway)

| Variable | Value | Description |
|---|---|---|
| `PORT` | Auto-assigned | Automatically set by Railway |
| `DATABASE_PATH` | `/data/history.db` | SQLite persistence path |
| `SECRET_KEY` | `<secure-random-string>` | Flask session secret |

---

### Render.com Deployment (Blueprint)

This project includes a `render.yaml` Blueprint specification for one-click deployment.

#### Option A: One-Click Blueprint Deploy
1. Log in to [Render](https://render.com/).
2. Click **New** → **Blueprint** and connect your GitHub repository.
3. Render automatically configures the web service, mounts a persistent disk at `/data`, sets `PYTHON_VERSION`, generates a `SECRET_KEY`, and enables auto-deploys.

#### Option B: Manual Service Setup

1. Click **New** → **Web Service** and connect your repository.
2. Configure the following:
   - **Runtime**: `Python`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
3. Under **Variables**, add:
   - `PYTHON_VERSION`: `3.13.5`
   - `DATABASE_PATH`: `/data/history.db`
4. Under **Disks**, add:
   - **Name**: `history-db`
   - **Mount Path**: `/data`
   - **Size**: `1 GiB`

---

### Heroku Deployment

```bash
# Install Heroku CLI (Windows)
choco install heroku-cli
# Or download from https://heroku.com

# Deploy
heroku create your-app-name
git push heroku main

# View logs
heroku logs --tail
```

---

### Production Configuration

```bash
FLASK_ENV=production
FLASK_DEBUG=0
SECRET_KEY=<your-secure-random-key>
DATABASE_PATH=/data/history.db  # Customizable path (defaults to project root)
```

---

## 🔮 Future Improvements

Potential enhancements for future versions:

### 🔐 User Authentication
- [ ] Create user accounts and save personal profiles
- [ ] Secure login and session management

### 📜 Prediction History Enhancements
- [ ] Advanced filtering and search of saved predictions
- [ ] Email notification when predictions are saved

### 📊 Better Data Visualization
- [ ] SHAP explainability with interactive feature contribution charts
- [ ] Comparison tool for multiple salary scenarios side-by-side

### 🤖 More Machine Learning Models
- [ ] **Ensemble Models** — Combine Ridge with Random Forest and XGBoost
- [ ] **Model Versioning** — Support and compare multiple model versions
- [ ] **Industry-specific Models** — Specialized models per industry vertical
- [ ] **Real-time Data Updates** — Continuously retrain with latest salary information

### 📤 Export Reports
- [ ] Export reports in Excel and CSV formats
- [ ] Shareable report links with unique URLs

### ☁️ Cloud Database Integration
- [ ] Replace SQLite with PostgreSQL or Firebase for scalable cloud persistence
- [ ] Real-time data syncing across sessions and devices

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**
   ```bash
   git clone https://github.com/paliwalpriyanjal-hash/salary-ai-platform.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Commit Your Changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

4. **Push to the Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**
   - Provide a clear description of the change
   - Link any relevant issues
   - Ensure all CI/CD checks pass

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

You are free to:
- ✅ Use for personal and commercial projects
- ✅ Modify and distribute
- ✅ Include in proprietary applications

With the condition:
- 📋 Include the original copyright notice

---

## 👤 Author

**Priyanjal Paliwal**

- 🐙 GitHub: [@paliwalpriyanjal-hash](https://github.com/paliwalpriyanjal-hash)
- 📧 Email: [paliwalpriyanjal876@gmail.com](mailto:paliwalpriyanjal876@gmail.com)
- 💼 LinkedIn: [Priyanjal Paliwal](https://www.linkedin.com/in/priyanjal-paliwal-806534331/)

---

## 🙏 Acknowledgments

- Salary dataset sources and contributors
- Flask and Python open-source communities
- Open-source ML libraries: [scikit-learn](https://scikit-learn.org/), [pandas](https://pandas.pydata.org/), [NumPy](https://numpy.org/)
- [Chart.js](https://www.chartjs.org/) and [Three.js](https://threejs.org/) communities
- [PythonAnywhere](https://www.pythonanywhere.com/) for reliable Python hosting

---

## 📞 Support

For issues, questions, or suggestions:

- 🐛 [GitHub Issues](https://github.com/paliwalpriyanjal-hash/salary-ai-platform/issues)
- 💬 [Discussions](https://github.com/paliwalpriyanjal-hash/salary-ai-platform/discussions)
- 📧 Email: [paliwalpriyanjal876@gmail.com](mailto:paliwalpriyanjal876@gmail.com)

---

## 🗺️ Next Steps

1. **Try It Live** — Visit [https://Paliwal2209.pythonanywhere.com](https://Paliwal2209.pythonanywhere.com)
2. **Run It Locally** — Follow the [Installation](#-installation) section to run the app
3. **Make a Prediction** — Test with your own professional profile
4. **Explore Features** — Check out the history dashboard and model details
5. **Read the Docs** — See [GITHUB_PUSH_GUIDE.md](GITHUB_PUSH_GUIDE.md) for deployment guidance

---

**Questions or Feedback?** Open an [issue](https://github.com/paliwalpriyanjal-hash/salary-ai-platform/issues) on GitHub.

Built with ❤️ using Python, Flask, and Machine Learning | MIT License
