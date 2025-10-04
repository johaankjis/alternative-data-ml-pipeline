# Alternative Data ML Pipeline

A comprehensive machine learning pipeline web application for predictive modeling using alternative data sources. Built with Next.js, TypeScript, and modern ML visualization components.

## 🚀 Features

### 1. Data Ingestion
- **CSV Upload**: Upload and manage datasets for machine learning
- **Data Preview**: Real-time preview of uploaded datasets with statistics
- **Column Analysis**: Automatic detection of column types (numeric, categorical, datetime, text)
- **Data Statistics**: View null counts, unique values, and basic statistics for each column

### 2. Model Training
- **Multiple Model Types**: Support for XGBoost, Random Forest, and Linear models
- **Hyperparameter Configuration**: Customize model hyperparameters
- **Real-time Training Progress**: Monitor training progress with live updates
- **Model Management**: Track multiple trained models with their configurations

### 3. Model Interpretability
- **Feature Importance**: Visualize which features contribute most to predictions
- **SHAP Waterfall Charts**: Understand individual prediction explanations
- **SHAP Summary Plots**: View feature impacts across all predictions
- **Partial Dependence Plots (PDP)**: Analyze how features affect predictions

### 4. Results & Analysis
- **Model Comparison**: Compare performance metrics across different models
- **Metrics Over Time**: Track training and testing metrics through epochs
- **Prediction Scatter Plots**: Visualize actual vs. predicted values
- **Residual Analysis**: Analyze prediction errors and model performance
- **Comprehensive Metrics**: RMSE, MAE, R², Accuracy, and training time

## 🛠️ Technology Stack

- **Framework**: [Next.js 15.2.4](https://nextjs.org/) with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI primitives
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Font**: Geist Sans & Geist Mono
- **Analytics**: Vercel Analytics

## 📦 Installation

### Prerequisites
- Node.js 18+ or later
- npm, yarn, or pnpm package manager

### Setup

1. Clone the repository:
```bash
git clone https://github.com/johaankjis/alternative-data-ml-pipeline.git
cd alternative-data-ml-pipeline
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
alternative-data-ml-pipeline/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Data Ingestion page
│   ├── training/page.tsx         # Model Training page
│   ├── interpretability/page.tsx # Model Interpretability page
│   ├── results/page.tsx          # Results & Analysis page
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── sidebar-nav.tsx           # Navigation sidebar
│   ├── data-upload.tsx           # File upload component
│   ├── data-preview.tsx          # Dataset preview component
│   ├── model-config.tsx          # Model configuration form
│   ├── training-progress.tsx    # Training progress indicator
│   ├── feature-importance-chart.tsx  # Feature importance visualization
│   ├── shap-waterfall.tsx        # SHAP waterfall chart
│   ├── shap-summary.tsx          # SHAP summary plot
│   ├── partial-dependence.tsx    # Partial dependence plot
│   ├── model-comparison.tsx      # Model comparison table
│   ├── metrics-over-time.tsx     # Metrics timeline chart
│   ├── prediction-scatter.tsx    # Prediction scatter plot
│   ├── residual-analysis.tsx     # Residual analysis chart
│   ├── metrics-summary.tsx       # Metrics summary cards
│   └── ui/                       # UI primitives (buttons, cards, etc.)
├── lib/                          # Utility functions and types
│   ├── types.ts                  # TypeScript type definitions
│   └── utils.ts                  # Helper functions
├── public/                       # Static assets
├── styles/                       # Additional styles
└── package.json                  # Project dependencies
```

## 📊 Data Types

### Dataset
- **Supported Formats**: CSV files
- **Column Types**: 
  - Numeric: Continuous numerical values
  - Categorical: Discrete categories
  - Datetime: Date and time values
  - Text: String values

### Model Types
- **XGBoost**: Gradient boosting framework
- **Random Forest**: Ensemble learning method
- **Linear**: Linear regression model

### Metrics
- **Accuracy**: Training and testing accuracy
- **RMSE**: Root Mean Square Error
- **MAE**: Mean Absolute Error
- **R² Score**: Coefficient of determination
- **Training Time**: Time taken to train the model

## 🎯 Usage

### 1. Upload Data
1. Navigate to the **Data Ingestion** page
2. Click "Upload Dataset" and select a CSV file
3. Provide a name and description
4. View the data preview and column statistics

### 2. Train Models
1. Go to the **Model Training** page
2. Select a dataset from the dropdown
3. Choose a model type (XGBoost, Random Forest, or Linear)
4. Configure hyperparameters
5. Select features and target variable
6. Click "Start Training" to begin
7. Monitor real-time training progress

### 3. Interpret Results
1. Visit the **Interpretability** page
2. Select a trained model
3. View feature importance rankings
4. Examine SHAP values for individual predictions
5. Analyze partial dependence plots for specific features

### 4. Compare Models
1. Navigate to the **Results** page
2. Compare metrics across different models
3. View training/testing loss over time
4. Analyze prediction accuracy with scatter plots
5. Review residual distributions

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Building for Production

```bash
npm run build
npm run start
```

## 🎨 UI Features

- **Dark/Light Mode Support**: Responsive theming
- **Interactive Charts**: Hover for detailed information
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Live training progress and metrics
- **Keyboard Navigation**: Accessible interface

## 📝 Type Definitions

Key TypeScript interfaces are defined in `lib/types.ts`:

- `Dataset`: Data structure for uploaded datasets
- `DataColumn`: Column metadata and statistics
- `Model`: Model configuration and status
- `ModelMetrics`: Performance metrics
- `FeatureImportance`: Feature importance data

## 🤝 Contributing

This project is currently in development. Contributions, issues, and feature requests are welcome!

## 📄 License

This project is private and proprietary.

## 🔗 Links

- Repository: [github.com/johaankjis/alternative-data-ml-pipeline](https://github.com/johaankjis/alternative-data-ml-pipeline)
- Built with [v0.app](https://v0.app)

## ⚡ Quick Start Example

```bash
# Clone and setup
git clone https://github.com/johaankjis/alternative-data-ml-pipeline.git
cd alternative-data-ml-pipeline
npm install --legacy-peer-deps

# Run development server
npm run dev

# Visit http://localhost:3000
```

---

**Version**: 1.0  
**Last Updated**: 2025  
**Built with**: Next.js, TypeScript, and Tailwind CSS
