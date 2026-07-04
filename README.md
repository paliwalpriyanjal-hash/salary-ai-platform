# 🧠 AI Salary Intelligence Platform

[![Python 3.11](https://img.shields.io/badge/python-3.11-blue.svg)](https://www.python.org/downloads/release/python-3110/)
[![Flask 2.3](https://img.shields.io/badge/flask-2.3-green.svg)](https://flask.palletsprojects.com/)
[![Scikit-Learn](https://img.shields.io/badge/scikit--learn-1.3.0-orange.svg)](https://scikit-learn.org/)
[![SQLite](https://img.shields.io/badge/database-SQLite-blue.svg)](https://www.sqlite.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **AI-Powered Salary Prediction Platform** — Predict salary expectations using machine learning trained on 250,000 real-world salary records. Analyze your professional profile and get instant predictions with detailed market insights.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Machine Learning Pipeline](#machine-learning-pipeline)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## 🎯 Overview

**AI Salary Intelligence Platform** is a machine learning-powered web application that predicts salary expectations based on professional profile information. The platform uses a Ridge regression model trained on 250,000 salary records to provide accurate predictions along with industry benchmarking.

### Who It's For
- **Job Seekers**: Understand fair market value for your skills and experience
- **Career Planners**: Get data-driven salary expectations before career moves
- **Professionals**: Benchmark your compensation against industry standards

### Key Benefits
- **Accurate Predictions** — Ridge regression model with 96.35% R² score
- **Fast Inference** — Get predictions in seconds with detailed analysis
- **Market Insights** — Compare your prediction against industry averages and percentiles
- **Prediction History** — Track all your salary predictions in a persistent database
- **Professional Reports** — Download comprehensive PDF reports with analysis and recommendations

---

## ✨ Features

### 🎯 Salary Prediction
- **Ridge Regression Model**: Trained on 250,000 salary records with 42 engineered features
- **Comprehensive Input Analysis**: Job title, experience, education, skills, industry, company size, location, remote work preference, and certifications
- **Accurate Predictions**: R² Score 0.9635 (96.35% variance explained) with MAE of $5,434

### 📊 Market Insights
- **Industry Benchmarking**: Compare your prediction against industry and job-title averages
- **Percentile Ranking**: See where you stand relative to peers (0-99 percentile)
- **Salary Ranges**: Low (10th percentile), Mid (50th percentile), and High (90th percentile) salary projections
- **Salary Differential**: Understand how your prediction compares to market average

### 📈 Prediction Analysis
- **Feature Contribution**: See which factors most influence the prediction
- **Confidence Scoring**: Model confidence level for each prediction
- **Experience Projections**: Estimated salary growth trends based on years of experience
- **Explainability Data**: Detailed breakdown of model decision factors

### 💾 Prediction History
- **SQLite Database**: Persistent storage of all predictions with timestamps
- **Prediction Management**: View, review, and delete past predictions
- **History Dashboard**: Browse all saved predictions with filtering
- **Report Generation**: Download professional PDF reports for each prediction

### 📄 Professional PDF Reports
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

---

## 🛠️ Technology Stack

### Frontend
- **HTML5 / CSS3 / JavaScript** — Semantic markup and modern styling
- **Three.js** — 3D animated visualizations
- **Chart.js** — Professional interactive charts
- **jsPDF** — Client-side PDF report generation
- **Responsive Design** — Mobile-first architecture

### Backend
- **Flask 2.3.3** — Lightweight Python web framework
- **Python 3.11** — Modern Python runtime
- **Gunicorn 21.2** — Production WSGI application server

### Machine Learning
- **Scikit-Learn 1.3.0** — Ridge regression model and preprocessing
- **Pandas 2.0.3** — Data manipulation and feature engineering
- **NumPy 1.24.3** — Numerical computations
- **Joblib 1.3.1** — Model and preprocessor serialization

### Database
- **SQLite 3** — Lightweight embedded database for prediction history
- **JSON** — Configuration and statistics storage

### Deployment
- **Gunicorn** — Production-ready WSGI server
- **Heroku/Render Ready** — Procfile for platform deployment

---

## 📁 Project Architecture

```
salary-ai-platform/
│
├── app.py                          # Flask application entry point
├── config.py                       # Configuration settings
├── requirements.txt                # Python dependencies
├── runtime.txt                     # Python version (Heroku)
├── Procfile                        # Deployment configuration
├── LICENSE                         # MIT License
├── README.md                       # This file
├── .gitignore                      # Git ignore rules
│
├── src/                            # Source code modules
│   ├── __init__.py
│   ├── predict.py                 # ML prediction pipeline
│   ├── database.py                # SQLite operations
│   ├── logger.py                  # Logging configuration
│   ├── exception.py               # Custom exception handling
│   ├── utils.py                   # Utility functions
│   └── generate_stats.py          # Statistics generation script
│
├── artifacts/                      # Pre-trained models & artifacts
│   ├── best_salary_model.pkl      # Trained ML model
│   ├── preprocessor.pkl           # Feature preprocessor
│   ├── scaler.pkl                 # Data scaler
│   ├── model_metrics.json         # Model performance metrics
│   └── summary_stats.json         # Pre-computed statistics
│
├── data/                          # Training & reference data
│   └── job_salary_prediction_dataset.csv
│
├── static/                        # Static assets
│   ├── css/
│   │   └── style.css             # Main stylesheet (premium design)
│   ├── js/
│   │   ├── script.js             # Main JavaScript (animations, globe)
│   │   ├── loading.js            # Loading screen handler
│   │   └── result.js             # Results page logic & charts
│   └── images/
│       └── (brand assets)
│
├── templates/                     # Jinja2 HTML templates
│   ├── base.html                 # Base template (if applicable)
│   ├── index.html                # Landing page
│   ├── predict.html              # Prediction form page
│   ├── result.html               # Results & PDF generation
│   ├── history.html              # Prediction history
│   ├── about.html                # Model information
│   └── error.html                # Error handling
│
├── logs/                         # Application logs
│   └── (generated at runtime)
│
├── database/                     # Database files
│   └── history.db               # SQLite database
│
└── docs/                         # Documentation (optional)
    └── (API docs, architecture diagrams)
```

---

## 🚀 Installation

### Prerequisites
- Python 3.11 or higher
- pip or conda package manager
- Virtual environment (recommended)

### Step 1: Clone Repository
```bash
git clone https://github.com/paliwalpriyanjal-hash/salary-ai-platform.git
cd salary-ai-platform
```

### Step 2: Create Virtual Environment
```bash
# Using venv
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Run Application
```bash
python app.py
```

The application will start at `http://localhost:5000`

### Step 5: Access the Platform
- **Home**: [http://localhost:5000/](http://localhost:5000/)
- **Predict**: [http://localhost:5000/predict](http://localhost:5000/predict)
- **History**: [http://localhost:5000/history](http://localhost:5000/history)
- **About Model**: [http://localhost:5000/about](http://localhost:5000/about)

---

## 📖 Usage

### Basic Salary Prediction

1. **Navigate to Predict Page** — Click "Predict Salary" on the homepage
2. **Fill Form** — Enter your professional details:
   - Job Title
   - Years of Experience
   - Education Level
   - Skills Count
   - Certifications
   - Industry
   - Company Size
   - Location
   - Remote Work Preference
3. **Get Results** — AI model processes and returns instant prediction
4. **View Analytics** — Explore:
   - Predicted salary
   - Industry benchmarks
   - Percentile ranking
   - Experience trend
   - Feature importance
5. **Generate Report** — Download professional PDF report
6. **View History** — All predictions automatically saved

### Advanced Features

#### Prediction History
```
/history — View all past predictions
/history/view/<report_id> — View specific prediction
/history/delete/<report_id> — Remove prediction
```

#### API Endpoints
```bash
GET /api/salary-stats
# Returns salary statistics for industry/job_title combinations
```

---

## 🤖 Machine Learning Pipeline

### Dataset
- **Size**: 250,000 salary records
- **Coverage**: Multiple industries and job roles
- **Training Data**: 200,000 records (80%)
- **Test Data**: 50,000 records (20%)
- **Features**: 42 engineered professional attributes
- **Time Period**: Historical salary data

### Preprocessing
1. **Data Cleaning**: Handle missing values, outliers, data validation
2. **Categorical Encoding**: OneHotEncoder for categorical features
3. **Feature Scaling**: StandardScaler for numerical features
4. **Train-Test Split**: 80-20 stratified split for model validation

### Feature Engineering
- **Job Title Features**: Categorical encoding with 42 total features
- **Experience Handling**: Years of experience as continuous variable
- **Education Mapping**: Categorical education level encoding
- **Skills & Certifications**: Count-based encoding
- **Industry Categorization**: Categorical encoding by industry
- **Company Size Factoring**: Categorical encoding (Small, Medium, Enterprise)
- **Location Encoding**: Categorical encoding by location
- **Remote Work Status**: Binary categorical encoding

### Model Training
- **Algorithm**: Ridge Regression with L2 regularization
- **Training Set**: 200,000 records (80%)
- **Test Set**: 50,000 records (20%)
- **Features**: 42 engineered features
- **Preprocessing**: OneHotEncoder + StandardScaler pipeline

### Model Performance
- **R² Score**: 0.9635 (96.35% variance explained)
- **RMSE**: $7,124.67
- **MAE**: $5,434.43 (average absolute error)
- **Test Performance**: Validated on 50,000 hold-out records

### Model Insights
- **Feature Importance**: Ridge regression coefficient analysis showing feature impact
- **Grouped Contributions**: Aggregated feature influence by category (Job Title, Experience, Education, etc.)
- **Prediction Confidence**: Model confidence scoring for each prediction

---

## 🔌 API Documentation

### GET /
**Landing page** — Home screen with platform overview

### GET /predict
**Prediction form** — Get HTML form for input

### POST /predict
**Submit prediction** — Process form data and return results

**Parameters:**
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

### GET /history
**Prediction history** — View all saved predictions

### GET /about
**Model information** — Model metrics and explainability

### GET /api/salary-stats
**Salary statistics** — JSON stats for industry/job combinations

---

## 🌐 Deployment

### Local Development
```bash
# Install dependencies
pip install -r requirements.txt

# Run the application
python app.py
```

The app will start at `http://localhost:5000`

### Heroku Deployment

1. **Install Heroku CLI**
   ```bash
   # Windows
   choco install heroku-cli
   # Or download from heroku.com
   ```

2. **Deploy**
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

3. **View Logs**
   ```bash
   heroku logs --tail
   ```

### Render.com Deployment

1. Connect GitHub repository
2. Set build command: `pip install -r requirements.txt`
3. Set start command: `gunicorn app:app`
4. Deploy

### Production Configuration
- Set `FLASK_ENV=production`
- Set `FLASK_DEBUG=0`
- Configure `SECRET_KEY` environment variable
- SQLite database persists locally
- Static files served via web server

---

## 🔮 Future Improvements

Potential enhancements for future versions:

### Model Improvements
- [ ] **Ensemble Models** — Combine Ridge with other algorithms (Random Forest, XGBoost)
- [ ] **SHAP Explainability** — Advanced feature interaction analysis
- [ ] **Model Versioning** — Support multiple model versions
- [ ] **Real-time Data Updates** — Update with latest salary information

### Features
- [ ] **User Authentication** — Create accounts and save profiles
- [ ] **Salary Negotiation Tips** — AI-generated negotiation guidance
- [ ] **Comparison Tool** — Compare multiple salary scenarios
- [ ] **Email Notifications** — Send reports via email

### Technical
- [ ] **REST API** — Public API for third-party integrations
- [ ] **Docker Containerization** — Simplified deployment
- [ ] **Job Market Analytics** — Trend analysis and market insights
- [ ] **Mobile Application** — Native iOS/Android apps

### Data
- [ ] **More Geographies** — Expand beyond current locations
- [ ] **Real-time Benchmarking** — Access to current market salaries
- [ ] **Industry-specific Models** — Specialized models per industry

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork Repository**
   ```bash
   git clone https://github.com/yourusername/salary-ai-platform.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Commit Changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

4. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open Pull Request**
   - Provide clear description
   - Link any relevant issues
   - Ensure CI/CD passes

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

You are free to:
- ✅ Use for personal and commercial projects
- ✅ Modify and distribute
- ✅ Include in proprietary applications

With the condition:
- 📋 Include original copyright notice

---

## 👤 Author

**Priyanjal Paliwal**
- 🐙 GitHub: [@paliwalpriyanjal-hash](https://github.com/paliwalpriyanjal-hash)
- 📧 Email: paliwalpriyanjal876@gmail.com
- 💼 LinkedIn: [[Your LinkedIn Profile](https://www.linkedin.com/in/priyanjal-paliwal-806534331/)](#)

---

## 🙏 Acknowledgments

- Salary dataset sources and contributors
- Flask and Python communities
- Open-source ML libraries (scikit-learn, pandas, numpy)
- Chart.js and Three.js communities

---

## 📞 Support

For issues, questions, or suggestions:
- 🐛 [GitHub Issues](https://github.com/yourusername/salary-ai-platform/issues)
- 💬 [Discussions](https://github.com/yourusername/salary-ai-platform/discussions)
- 📧 Email: paliwalpriyanjal876@gmail.com

---

## � Next Steps

1. **Try It Locally** — Follow the Installation section to run the app
2. **Make a Prediction** — Test with your own professional profile
3. **Explore Features** — Check out the history and model details
4. **Read the Docs** — See [GITHUB_PUSH_GUIDE.md](GITHUB_PUSH_GUIDE.md) for deployment

---

**Questions or Feedback?** Open an [issue](https://github.com/paliwalpriyanjal-hash/salary-ai-platform/issues) on GitHub.

Built with Python, Flask, and Machine Learning | MIT License
